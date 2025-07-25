const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");

module.exports = function RustRunPlugin() {
  return {
    visitor: {
      JSXElement(pathNode, state) {
        const tag = pathNode.node.openingElement.name.name;
        if (tag !== "Rust") return;

        const srcAttr = pathNode.node.openingElement.attributes.find(
          (attr) => attr.name.name === "src"
        );

        if (!srcAttr || srcAttr.value.type !== "StringLiteral") return;

        const filename = srcAttr.value.value;
        const rustFilePath = path.resolve(
          path.dirname(state.file.opts.filename),
          filename
        );

        const ext = process.platform === "win32" ? ".exe" : "";
        const outputFile = path.join(os.tmpdir(), "babel_rust_temp" + ext);

        try {
          execSync(`rustc "${rustFilePath}" -o "${outputFile}"`);

          const output = execSync(`"${outputFile}"`, {
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
          })
            .toString()
            .trim();

          pathNode.replaceWithSourceString(`"${output}"`);
        } catch (err) {
          throw pathNode.buildCodeFrameError(
            `Error to run Rust: ${err.message}`
          );
        } finally {
          try {
            fs.unlinkSync(outputFile);
          } catch (_) {}
        }
      },
    },
  };
};
