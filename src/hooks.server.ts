import { auth } from '$lib/server/lucia';
import { protectRoutes } from '$lib/server/utils/protectRoutes';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// populate auth object in locals
	event.locals.auth = auth.handleRequest(event);

	// validate session
	const session = await event.locals.auth.validate();

	// for routes protection
	protectRoutes(session, event.url);

	return await resolve(event);
};
