<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// destructure form data
	const { registerForm } = data;

	$: errorMsg = '';
	$: usernameError = '';
	$: passwordError = '';

	const {
		form: formData,
		errors: formErrors,
		enhance
	} = superForm(registerForm, {
		onUpdate: ({ cancel, form }) => {
			// this code runs before the form is submitted to the server

			const { errors } = form;

			if (!form.valid) {
				const { username, password } = errors;

				if ((username && username[0]) || (password && password[0])) {
					usernameError = `${username && username[0]}`;
					passwordError = `${password && password[0]}`;
					errorMsg = 'Please make sure all fields are filled in correctly';
				} else {
					errorMsg = 'Please fill in all fields';
				}

				// `cancel` prevents the form from being submitted
				cancel();

				return;
			}

			errorMsg = '';

			return;
		},
		onUpdated: ({ form }) => {
			// this code runs after the form is submitted to the server

			const { message } = form;

			if (message && message.status === 'error') {
				errorMsg = message.text || 'Something went wrong';
				return;
			}

			errorMsg = '';
		}
	});
</script>

<!-- register form -->
<div class="max-w-lg mx-auto mt-8">
	<div class="prose px-6">
		<h1>Register Form</h1>
	</div>
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		method="post"
		action="?/register"
		use:enhance
	>
		<!-- username field -->
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
			<input
				class="input focus:shadow-outline"
				id="username"
				type="text"
				name="username"
				bind:value={$formData.username}
				autocomplete="username"
				placeholder="Enter your username"
			/>
		</div>
		{#if $formErrors.username}
			<p class="input-error">{$formErrors.username}</p>
		{/if}

		<!-- password field -->
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
			<input
				class="input focus:shadow-outline"
				id="password"
				type="password"
				name="password"
				bind:value={$formData.password}
				autocomplete="current-password"
				placeholder="******************"
			/>

			{#if $formErrors.password}
				<p class="input-error">{$formErrors.password}</p>
			{/if}
		</div>

		{#if errorMsg}
			<p class="input-error !text-base pb-4">{errorMsg}</p>
		{/if}

		<div class="flex items-center justify-between">
			<!-- register button -->
			<button class="button hover:bg-blue-700" type="submit">Register</button>

			<!-- login link -->
			<a
				class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				href="login"
			>
				Already have an account?
			</a>
		</div>
	</form>
</div>

<style lang="postcss">
	.input {
		@apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
	}

	.input-error {
		@apply text-red-500 text-xs italic;
	}

	.button {
		@apply bg-blue-500  text-white font-bold py-2 px-4 rounded;
	}
</style>
