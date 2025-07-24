# ⚙️ Custom Babel Plugins

This project demonstrates how to create **custom Babel plugins** to dynamically transform JSX code.

## 📂 Project Structure

```
custom-plugins/
├── config/
│ └── myPlugins/
│ └── babel-plugin-zig-run.js
├── src/
│ ├── App.js
│ └── zig/
│ └── hello.zig
└── ...
```

## 🧩 Plugin: `babel-plugin-zig-run`

The first example integrates the **Zig programming language** by running Zig code at build time and injecting its output directly into the React app.
This custom Babel plugin lets you include `.zig` files inside JSX using a special `<Zig />` tag.

### How it works:

```jsx
<h2>
  Zig Output: <Zig src="./zig/hello.zig" />
</h2>
```

During the build process:

1. The plugin looks for all `<Zig src="..." />` JSX elements.
2. It reads the specified `.zig` file.
3. Runs it using `zig run`.
4. Replaces the JSX element with the string output.

> Example rendered output:
> `Zig Output: 42`

---

## 🔣 Example: `hello.zig`

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Hi from Zig", .{});
}
```

---

## ⚙️ Setup Instructions

1. Add the Babel plugin to Webpack (after ejecting Create React App):

   ```js
   plugins: [require.resolve("./config/myPlugins/babel-plugin-zig-run")];
   ```

2. Disable ESLint warning for the custom JSX tag:

   ```js
   /* eslint-disable react/jsx-no-undef */
   ```

3. Use the component in your React code like shown above.

---

## 📌 Requirements

- Node.js
- [Zig](https://ziglang.org/download/) installed on your system
- A React project with customizable Babel config (e.g., ejected CRA)

---

## 🔭 Future Ideas

- Add support for other runtimes:

  - Rust (`<Rust src="./hello.rs" />`)
  - C
  - Go

- Smart caching of outputs
- Async component support (SSR-ready)
- Publish plugins to NPM

---

## 🧪 Notes

- The Zig code runs at **build time** using `execSync`, not in the browser.
- The plugin replaces JSX with static string output.
- Make sure your Zig code is fast and doesn’t block the build process.

## 👤 Author

Prototyped by \[Mauricio Soto].
Contributions and suggestions are welcome!
