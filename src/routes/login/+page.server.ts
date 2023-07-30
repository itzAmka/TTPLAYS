import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { authFormSchema } from '$lib/zod/authForm';
import { superValidate, message } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia';

type TMessage = { status: 'error' | 'success' | 'warning'; text: string };

export const load = (async () => {
	const loginForm = await superValidate(authFormSchema, {
		id: 'loginForm'
	});

	return {
		loginForm
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals, url }) => {
		const loginForm = await superValidate<typeof authFormSchema, TMessage>(request, authFormSchema);

		if (!loginForm.valid) {
			return fail(400, { loginForm });
		}

		const { username, password } = loginForm.data;

		try {
			const user = await auth.useKey('username', username.toLowerCase(), password);

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (error: unknown) {
			// please make sure to handle errors properly, according to your needs
			console.log(error);

			if (
				error instanceof Error ||
				(error instanceof LuciaError &&
					(error.message === 'AUTH_INVALID_PASSWORD' || error.message === 'AUTH_INVALID_KEY_ID'))
			) {
				// inform user of invalid username or password
				// for more info about message(), see: https://superforms.rocks/concepts/messages#the-message-helper
				return message(loginForm, {
					status: 'error',
					text: 'Invalid username or password'
				});
			}

			// for other errors, inform user of a server error
			// for more info, see: https://lucia-auth.com/basics/error-handling
			return message(loginForm, {
				status: 'error',
				text: 'Something went wrong, please try again later.'
			});
		}

		const redirectTo = url.searchParams.get('redirectTo');

		throw redirect(307, redirectTo ? redirectTo : '/');
	}
} satisfies Actions;
