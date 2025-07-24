const path = require("path");
const { execSync } = require("child_process");

module.exports = function ZigRunPlugin() {
  return {
    visitor: {
      JSXElement(pathNode, state) {
        const tag = pathNode.node.openingElement.name.name;
        if (tag !== "Zig") return;
        const srcAttr = pathNode?.node?.openingElement?.attributes.find(
          (attr) => attr.name.name === "src"
        );

        if (!srcAttr || srcAttr?.value?.type !== "StringLiteral") return;

        const filename = srcAttr.value.value;
        const zigFilePath = path.resolve(
          path.dirname(state.file.opts.filename),
          filename
        );

        try {
          const output = execSync(`zig run "${zigFilePath}" 2>&1`, {
            encoding: "utf8",
          });
          pathNode.replaceWithSourceString(`"${output.trim()}"`);
        } catch (err) {
          throw pathNode.buildCodeFrameError(
            `Error to run Zig: ${err.message}`
          );
        }
      },
    },
  };
};
