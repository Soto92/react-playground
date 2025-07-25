/* eslint-disable react/jsx-no-undef */
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="Content">
        <h1>MultiLang JS Executor</h1>
        <ul>
          <li>
            Rust Output: <Rust src="./rust/hello.rs" />
          </li>
          <li>
            Zig Output: <Zig src="./zig/hello.zig" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
