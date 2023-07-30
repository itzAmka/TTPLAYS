# TTPLAYS - A starter project for TTPLAYS Stack

## What is TTPLAYS?

TTPLAYS stands for TypeScript, TailwindCSS, Prisma, Lucia Auth, Your Database, and Superforms. It is a Sveltekit-Stack that uses these technologies to create a full-stack web application.

## What is included?

- T - [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- T - [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- P - [Prisma](https://www.prisma.io/) - A database toolkit for Typescript and Node.js.
- LA - [Lucia Auth](https://lucia-auth.com/) - Lucia is an auth library for TypeScript that abstracts away the complexity of handling users and sessions. It works alongside your database to provide an API that's easy to use, understand, and extend.
- Y - [Your Database](https://lucia-auth.com/basics/database) - A database of your choice.
- S - [Superforms](https://superforms.rocks/) - Superforms is a SvelteKit library that gives you a comprehensive solution for server and client validation, and client-side display of forms.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) - You need to have Node.js installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/itzAmka/TTPLAYS.git
   ```
2. Install NPM packages

   ```sh
    npm install

    # OR
    yarn

    # OR
    pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```.env
   DATABASE_URL="YOUR_DATA_BASE_URL"
   ```

4. Run the Prisma commands to generate the Prisma client and migrate the database

   ```sh
   npx prisma generate
   ```

5. Run the development server

   ```sh
   npm run dev

   # OR
   yarn dev

   # OR
   pnpm dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

7. That's it! You're ready to start building your app. Enjoy your time with TTPLAYS Stack 😊🎉

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

## Acknowledgements

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Lucia Auth](https://lucia-auth.com/)
- [Superforms](https://superforms.rocks/)
- [Vite](https://vitejs.dev/)

## Authors

- itzAmka (Amin) - [Twitter](https://twitter.com/itzAmka) - [GitHub](https://github.com/itzAmka) - [Website](https://amka.vercel.app)

## Contributing

Contributions, issues, and feature requests are welcome!
Thank you for contributing to this project.

Feel free to check the [issues page](https://github.com/itzAmka/TTPLAYS/issues).

## Show your support

Give a ⭐️ if you like this project!
Thank you for your support!
