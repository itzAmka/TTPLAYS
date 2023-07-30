import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { authFormSchema } from '$lib/zod/authForm';
import { superValidate, message } from 'sveltekit-superforms/server';

type TMessage = { status: 'error' | 'success' | 'warning'; text: string };

export const load = (async () => {
	const registerForm = await superValidate(authFormSchema, {
		id: 'registerForm'
	});

	return {
		registerForm
	};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, locals, url }) => {
		const registerForm = await superValidate<typeof authFormSchema, TMessage>(
			request,
			authFormSchema
		);

		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		const { username, password } = registerForm.data;

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toLowerCase(),
					password
				},
				attributes: {
					username
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (error: unknown) {
			console.log(error);

			// please make sure to handle errors properly, according to your needs

			return message(registerForm, {
				status: 'error',
				text: 'Something went wrong, please try again later.'
			});
		}

		const redirectTo = url.searchParams.get('redirectTo');

		throw redirect(307, redirectTo ? redirectTo : '/');
	}
} satisfies Actions;
