# Three.js Earth Playground: Solid vs. Particles

This project is a 3D visualization playground comparing two different rendering techniques using **Three.js**. It creates a side-by-side comparison of a standard solid 3D model versus a high-density particle system (simulating a "Spark" or Gaussian Splat aesthetic).

## Demo

https://github.com/user-attachments/assets/f37ab6ea-7d33-4a74-83a2-0f3617a99b58

## 🚀 Quick Start

Because this project loads textures (`.jpg` images) from the web, browsers will block the request due to CORS security policies if you simply open the `index.html` file. You must run it via a local server.

### using `npx` (Node.js)

1.  Open your terminal/command prompt.
2.  Navigate to the project folder.
3.  Run the following command:

```bash
npx http-server .
```

4.  The terminal will show a local address (usually `http://127.0.0.1:8080`).
5.  Open that link in your browser.

---

## 🆚 The Comparison

### Left Side: Standard Mesh (Solid)

- **Visuals:** A realistic, solid sphere. The surface is continuous.
- **Lighting:** Reacts dynamically to the light source (sun), creating smooth shadows and highlights.
- **Best for:** Standard games, realistic simulations, and solid objects.

### Right Side: Particle System ("Spark" Style)

- **Visuals:** A stylized, "holographic" or "digitized" look. The planet is made of thousands of individual floating points.
- **Lighting:** Reacts differently; often looks like a cloud of data.
- **Best for:** Sci-fi effects, visualizing raw scan data (LiDAR), or artistic "hologram" effects.

---

## 🛠 How It Works (Technical Breakdown)

Both models use the exact same mathematical skeleton (`SphereGeometry`) and the same image texture, but they render them differently.

### 1\. The Solid Earth (`THREE.Mesh`)

This uses the "Connect the Dots" method.

- **Logic:** Three.js takes the vertices (points) of the sphere and connects them with triangles (faces).
- **Texture:** The image is stretched like a skin over these triangles.
- **Code:**
  ```javascript
  const earth = new THREE.Mesh(geometry, material);
  ```

### 2\. The Particle Earth (`THREE.Points`)

This uses the "Raw Data" method.

- **Logic:** Three.js takes the same vertices but **does not connect them**. Instead, it draws a 2D square (billboard) at the location of every single vertex facing the camera.
- **Texture:** The system samples the color of the texture at that specific coordinate and colors the dot.
- **Density:** To avoid gaps (holes), we increased the geometry segments to high values (e.g., `320x320`), resulting in over 100,000 individual particles.
- **Code:**
  ```javascript
  const sparkEarth = new THREE.Points(geometry, material);
  ```

---

## ⚙️ Customization

You can adjust the density of the particle planet in the script:

```javascript
// 1. Adjust Density (Segments)
// (Width, Height) - Higher numbers = more points (heavier on CPU)
const sparkGeometry = new THREE.SphereGeometry(1, 320, 320);

// 2. Adjust Point Size
// Smaller size = cleaner look
// Larger size = fills gaps (looks more solid)
const sparkMaterial = new THREE.PointsMaterial({
  size: 0.015,
  // ...
});
```

## 📚 Stack

- **HTML5 / CSS3**
- **Three.js** (via ES Modules)
- **OrbitControls** (for camera interaction)
