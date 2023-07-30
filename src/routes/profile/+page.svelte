<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import dayjs from 'dayjs';

	export let data;

	const { user, currentSessionId, sessions } = data;

	const handleSubmit: SubmitFunction = async () => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				console.log(result);
				return;
			}

			window.location.reload();

			return await update({ reset: true });
		};
	};
</script>

<section class="h-screen overflow-auto bg-gray-900 break-words">
	<div class="flex mt-8 px-4">
		<div class="flex flex-col gap-8 w-full max-w-lg mx-auto">
			<div class="prose">
				<h1 class="text-gray-100">Profile</h1>
				<p class="text-gray-400">Here is your profile detials</p>
			</div>
			<div class="flex flex-col mt-5">
				<!-- username -->
				<div class="prose flex flex-col border p-4 rounded-md">
					<h4 class="text-gray-200">Username</h4>
					<p class="text-gray-300">{user?.username}</p>

					<!-- logout -->
					<form method="post" action="?/logout" use:enhance>
						<button class="btn text-xs btn-logout">Logout</button>
					</form>
				</div>

				<!-- sessions -->
				<div class="prose flex flex-col mt-8 gap-4">
					<h2 class="text-gray-200">Sessions</h2>
					<!-- <p>To create mulitiple session</p> -->
					{#each sessions as session}
						<div class="border p-4 rounded-md">
							{#if session.sessionId === currentSessionId}
								<h4 class="text-gray-200">
									SessionId <span class="text-green-500">(current session)</span>
								</h4>
							{:else}
								<h4 class="text-gray-200">SessionId</h4>
							{/if}
							<p class="text-gray-300 whitespace-normal">{session.sessionId}</p>

							<div>
								<h4 class="text-gray-200">State</h4>
								<p class="text-gray-300">
									{session.state}
								</p>
							</div>

							<div>
								<h4 class="text-gray-200">Active Expires At</h4>
								<p class="text-gray-300">
									{dayjs(session.activePeriodExpiresAt).format('MM/DD/YYYY HH:mm:ss A')}
								</p>
							</div>

							<div>
								<h4 class="text-gray-200">Idle Expires At</h4>
								<p class="text-gray-300">
									{dayjs(session.idlePeriodExpiresAt).format('MM/DD/YYYY HH:mm:ss')}
								</p>
							</div>

							{#if session.sessionId !== currentSessionId}
								<form method="post" action="?/deleteSession" use:enhance={handleSubmit}>
									<input type="hidden" name="sessionId" value={session.sessionId} />
									<button class="btn text-xs btn-delete">Delete Session</button>
								</form>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.btn {
		@apply text-white px-4 py-2 rounded-md border-none cursor-pointer;
	}

	.btn-delete {
		@apply bg-[#ad0725];
	}

	.btn-logout {
		@apply bg-[#05ae7e];
	}
</style>
