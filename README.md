<div align="center">
<img src="./apps/frontend/static/favicon.svg" width="80"/>

# Tiny Grocery List

**A grocery list built to demonstrate a simple microservices architecture**

<a href="https://opensource.org/license/mit"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" height="24" /></a>
<a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Package-PNPM-orange?style=flat-square" height="24" /></a>
<img src="https://img.shields.io/badge/Module-ECMAScript-yellow?style=flat-square" height="24" />
</div>

![Preview](https://github.com/user-attachments/assets/8040806d-8c03-40fa-a7c6-c3af7ec2d3b2)

## Features
- Create, update, edit, and delete grocery items
- Informative feedback for every user action
- Lightweight, the database is just a simple array

## Stack Used
- [Turborepo](https://turbo.build/)
- Microservices [Fastify](https://fastify.dev/) and [SvelteKit](https://svelte.dev/)
- [Tailwind](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)

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
