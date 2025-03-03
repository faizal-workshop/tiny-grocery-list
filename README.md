# Tiny Grocery List
<a href="https://opensource.org/license/mit"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" height="24" /></a>
<a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Package-PNPM-orange?style=flat-square" height="24" /></a>
<img src="https://img.shields.io/badge/Module-ECMAScript-yellow?style=flat-square" height="24" />

A grocery list built to demonstrate a simple microservices architecture

![image](https://github.com/user-attachments/assets/5100ff89-d6e8-4f11-88d1-2273120cc051)

## Features
- Create, update, edit, and delete grocery items
- Informative feedback for every user action
- Lightweight, the database is just a simple array

## Stack Used
- [SvelteKit](https://svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [Fastify](https://fastify.dev/)

## Local Preview
1. Clone this repository to your local computer
2. Copy the default environment file and ensure all variables are correctly filled
   ```sh
   cd apps/backend
   cp .env.example .env
   ```
   ```sh
   cd apps/frontend
   cp .env.example .env
   ```
3. Install all required dependencies
   ```sh
   pnpm i
   ```
4. Run the application in development mode
   ```sh
   pnpm run dev
   ```
