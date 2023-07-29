import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma as client } from './prisma';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prismaAdapter(client),
	csrfProtection: true
	/** TODO: @contributers add necessary configs to make dev EX easier. */
});

export type Auth = typeof auth;
