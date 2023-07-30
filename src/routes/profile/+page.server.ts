import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals }) => {
	// get the session
	const session = await locals.auth.validate();

	// if there is no session, redirect to login page
	if (!session) {
		throw redirect(307, '/login?redirectTo=/profile');
	}

	// get all user sessions
	const sessions = await auth.getAllUserSessions(session.user.userId);

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.userId
		}
		// or include session when getting user data
		// include: {
		// 	auth_session: true
		// }
	});

	return {
		user,
		currentSessionId: session.sessionId /** current sessionId */,
		sessions /** all user sessions */
	};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ locals }) => {
		// get the session
		const session = await locals.auth.validate();

		// check if there is a session
		if (!session) return fail(401, { message: 'Unauthorized' });

		// invalidate the session
		await auth.invalidateSession(session.sessionId);

		// set the session to null
		locals.auth.setSession(null);

		return { success: true };
	},
	deleteSession: async ({ request, locals }) => {
		// get the session id
		const sessionId = (await request.formData()).get('sessionId') as string;

		// check if there is a session id
		if (!sessionId) return fail(400, { message: 'Missing sessionId' });

		// get the session
		const session = await locals.auth.validate();

		// check if there is a session
		if (!session) return fail(401, { message: 'Unauthorized' });

		// check if the session id is the same as the current session id
		if (sessionId === session.sessionId)
			return fail(400, { message: 'Cannot delete current session' });

		try {
			// invalidate the session
			await auth.invalidateSession(sessionId);
		} catch (error: unknown) {
			console.log(error);

			return fail(500, { message: 'Something went wrong while deleting session.' });
		}

		return { success: true };
	}
} satisfies Actions;
