# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

### Creating the project:

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# 🚀 Introduction to Astro

**Astro** is a modern web framework built for creating **fast, content-focused websites**.  
It emphasizes performance by sending **less JavaScript** to the browser and generating **static HTML** by default.

---

## 🌌 What Is Astro?

Astro describes itself as _“The web framework for content-driven websites.”_  
It’s perfect for blogs, marketing sites, documentation, portfolios, and e-commerce frontends — anywhere where content and speed matter.

Unlike traditional SPA frameworks like React or Vue, Astro ships **zero JavaScript by default**, unless you explicitly opt into it. This design approach dramatically improves **performance and SEO**.

---

## 🧱 Key Features

### 1. **Component Islands Architecture**

Astro introduces the concept of **Islands Architecture**, where your page is mostly static HTML, but small “islands” of interactivity (like buttons, sliders, or carousels) are hydrated on demand.

Example:

```astro
---
import MyButton from "../components/MyButton.jsx";
---

<html>
  <body>
    <h1>Hello from Astro!</h1>
    <MyButton client:load />
  </body>
</html>
```

Only `MyButton` loads JavaScript on the client, keeping the rest static.

---

### 2. **Multi-Framework Support**

Astro supports popular UI frameworks through official integrations:

- React
- Vue
- Svelte
- SolidJS
- Preact
- Lit

This means you can mix and match frameworks in the same project — something unique to Astro.

---

### 3. **Zero JS by Default**

If your page doesn’t need interactivity, Astro will send pure HTML to the browser — **no JavaScript at all**.
This makes Astro sites extremely fast and lightweight.

---

### 4. **Markdown & MDX Integration**

Astro has first-class support for Markdown and MDX.
This makes it ideal for **content-heavy websites** like blogs or documentation.

---

title: "Hello World"
date: "2025-10-29"

---

# Welcome to Astro

Astro makes building content websites a joy!

---

### 5. **File-Based Routing**

Pages in Astro are created simply by adding files inside `src/pages/`.
For example:

```
src/
 ├── pages/
 │   ├── index.astro       → /
 │   ├── about.astro       → /about
 │   └── blog/
 │       └── [slug].astro  → /blog/:slug
```

---

### 6. **Partial Hydration**

Astro gives you full control over when and how components load on the client.

Hydration directives:

- `client:load` → Load when the page loads
- `client:idle` → Load when the browser is idle
- `client:visible` → Load when visible in the viewport
- `client:media="(min-width: 600px)"` → Load based on media queries

---

### 7. **Integration Ecosystem**

Astro provides a simple CLI to add official integrations:

```bash
npx astro add react tailwind mdx sitemap
```

This makes setup for frameworks, styling, and tooling effortless.

---

## ⚡ Performance Benefits

- 🚫 **Zero JS by default**
- 💨 **Fast Time to First Byte (TTFB)**
- 🔍 **SEO friendly** (static HTML, metadata support)
- 🧩 **Hybrid rendering** (SSG + SSR + Islands)
- 🌐 **Edge-ready deployment** (Vercel, Netlify, Cloudflare, etc.)

---

## 🧭 Migrating from Create React App

If you’re coming from **Create React App (CRA)**, migrating to Astro can give you:

- Better performance
- Built-in routing
- SEO-ready pages
- No need for heavy client-side bundles

Steps to migrate:

1. Create a new Astro project:

   ```bash
   npm create astro@latest
   ```

2. Add React integration:

   ```bash
   npx astro add react
   ```

3. Move your CRA components into `src/components/`.
4. Create pages in `src/pages/` and import your React components.
5. Use hydration when needed:

   ```astro
   <App client:load />
   ```

---

## 🔧 When to Use Astro

Use Astro if you want:

- A **static or content-heavy** website
- Excellent **Core Web Vitals** scores
- Easy **SEO optimization**
- A blend of static HTML and modern UI components

Avoid Astro if you need:

- A **fully dynamic web app** (like dashboards or heavy SPAs)
- Extensive **client-side state management**

---

## React vs Astro

```
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Component = () => {
const [stars, setStars] = useState(0);
const [message, setMessage] = useState('');

useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('https://api.github.com/repos/withastro/astro');
        const json = await res.json();

        setStars(json.stargazers_count || 0);
        setMessage(json.message);
    };

    fetchData();
}, []);

return (
    <>
        <Header />
        <p style={{
            backgroundColor: `#f4f4f4`,
            padding: `1em 1.5em`,
            textAlign: `center`,
            marginBottom: `1em`
        }}>Astro has {stars} 🧑‍🚀</p>
        <Footer />
    </>
)
};

export default Component;
```

```
---
import Header from './Header.astro';
import Footer from './Footer.astro';
import './layout.css';
const res = await fetch('https://api.github.com/repos/withastro/astro')
const json = await res.json();
const message = json.message;
const stars = json.stargazers_count || 0;
---
<Header />
<p class="banner">Astro has {stars} 🧑‍🚀</p>
<Footer />
<style>
  .banner {
    background-color: #f4f4f4;
    padding: 1em 1.5em;
    text-align: center;
    margin-bottom: 1em;
  }
</style>
```

## 🪐 Conclusion

Astro represents a shift in web development philosophy — focusing on **delivering less JavaScript** and **more performance**.
It bridges the best of modern UI frameworks with the simplicity and speed of static sites.

If you’re building a fast, content-focused website, **Astro might be the perfect fit**.

---

### 🔗 Official Links

- 🌍 [Astro Website](https://astro.build)
- 📘 [Documentation](https://docs.astro.build)
- 💬 [Discord Community](https://astro.build/chat)
- 🧰 [GitHub Repository](https://github.com/withastro/astro)
