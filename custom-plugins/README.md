# ⚙️ Custom Babel Plugins

This project demonstrates how to create **custom Babel plugins** to dynamically transform JSX code.

## 📂 Project Structure

```
custom-plugins/
├── config/
│   └── myPlugins/
│       ├── babel-plugin-zig-run.js
│       └── babel-plugin-rust-run.js
├── src/
│   ├── App.js
│   ├── zig/
│   │   └── hello.zig
│   └── rust/
│       └── hello.rs
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
> `Zig Output: Hello from Zig!`

---

## 🦀 Plugin: `babel-plugin-rust-run` (Experimental)

Similarly, you can run Rust code at build time and inject the output using a `<Rust />` tag.

### How it works:

```jsx
<h2>
  Rust Output: <Rust src="./rust/hello.rs" />
</h2>
```

During the build process:

1. The plugin compiles the Rust source file with `rustc` to a temporary executable.
2. Executes the compiled binary.
3. Replaces the JSX element with the output string.

**Note:** On Windows, the plugin automatically appends `.exe` to the compiled binary and wraps the path with quotes to ensure execution.

---

## 🔣 Example Files

### `hello.zig`

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Hello from Zig!", .{});
}
```

### `hello.rs`

```rust
fn main() {
    println!("Hello from Rust!");
}
```

---

## ⚙️ Setup Instructions

1. Add the Babel plugins to your Webpack or Babel config (after ejecting Create React App):

```js
plugins: [
  require.resolve("./config/myPlugins/babel-plugin-zig-run"),
  require.resolve("./config/myPlugins/babel-plugin-rust-run"),
];
```

2. Disable ESLint warnings for custom JSX tags:

```js
/* eslint-disable react/jsx-no-undef */
```

3. Use the components in your React code as shown above.

---

## 📌 Requirements

- Node.js
- [Zig](https://ziglang.org/download/) installed on your system
- [Rust](https://www.rust-lang.org/tools/install) installed on your system
- A React project with customizable Babel config (e.g., ejected CRA)

---

## 🔭 Future Ideas

- Add support for other languages:

  - C, Go, etc.

- Smart caching of output to speed up builds
- Async component support for SSR
- Publish these plugins as independent NPM packages

## Why Rust and Zig in the frontend?

✅ **Rust & Zig**

- Compiled to machine code → **much faster execution**
- No garbage collector → **full control over memory**
- Perfect for speeding up **critical parts of your build or app**

❌ **JavaScript**

- Single-threaded
- Interpreted or JIT → **less predictable performance**
- Slow for **heavy computational tasks**

## 🧠 Examples of Complex Services Built with Rust

### 1. **Image Converter (resize, compression, filters)**

- Resize large images with high performance.
- Apply filters and compression with minimal quality loss.
- JavaScript struggles with large images — Rust handles them in milliseconds.

---

### 2. **File or Folder Indexer (like a mini Google Desktop)**

- Scan thousands of files on disk.
- Index content (text, names, timestamps).
- JavaScript has limited filesystem access and poor multithreading support.

---

### 3. **Large XML/JSON Validator**

- Validate and transform 100MB+ files.
- Apply complex validation rules and generate reports.
- JavaScript chokes on large or deeply nested data structures.

---

### 4. **Hash / Cryptography / Checksum Generator**

- Compute SHA256, MD5, BLAKE3, etc.
- Ideal for file integrity checks or secure operations.
- JavaScript is slow and insecure for these low-level memory tasks.

---

### 5. **DSL Parser or Compiler (Custom Language)**

- Create a mini-language or transformer (e.g., Markdown → HTML).
- Rust excels at parsing, AST handling, and real-time performance.

---

### 6. **Full-Text Search Engine**

- Build a lightweight search engine (like Elasticsearch).
- Index and search through thousands of entries.
- Rust has libraries like [`tantivy`](https://github.com/quickwit-oss/tantivy) — JavaScript can’t even come close.

---

## 🧪 Notes

- Code runs at **build time** via `execSync` (not in the browser).
- Plugins replace JSX with static string output injected into your bundle.
- Make sure your code executes quickly to avoid blocking builds.
- Windows paths are handled correctly for Rust plugin by appending `.exe` and quoting the binary path.

---

## 👤 Author

Prototyped by \[Mauricio Soto].
Contributions and suggestions are welcome!
