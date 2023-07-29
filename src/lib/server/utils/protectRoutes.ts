import { redirect } from '@sveltejs/kit';
import type { Session } from 'lucia';

/**
 * @description Protects routes from unauthorized access.
 * @param {Session} session - lucia session
 * @param {URL} url - the url object
 * @returns {void}
 */
export const protectRoutes = (session: Session | null, url: URL) => {
	// add your private routes here, e.g. ['/admin', '/dashboard']
	const privateRoutes = ['/admin'];

	// add your auth routes here, e.g. ['/login', '/register'] or ['/signin', '/signup']
	const authRoutes = ['/login', '/register'];

	// a url query param to redirect to after login
	const redirectTo = url.searchParams.get('redirectTo');

	// if not logged in and trying to access a private route, redirect to login page
	if (!session && privateRoutes.includes(url.pathname)) {
		throw redirect(307, `/login?redirectTo=${url.pathname}`);
	}

	// if logged in and trying to access an auth routes, redirect to home page or required page especific to your app.
	if (session && authRoutes.includes(url.pathname)) {
		throw redirect(307, redirectTo || '/');
	}
};
