import { transform as lightningCssTransform } from "lightningcss";
import replace from "@rollup/plugin-replace";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

function lightningCssTransformer(code) {
    const { code: output, warnings } = lightningCssTransform({ code: Buffer.from(code, "utf8"), minify: true });
    if (warnings.length > 0) {
        console.log(warnings);
    }
    return Buffer.from(output).toString("utf8");
}

/** @type {import("rollup").RollupOptions} */
const config ={
    input: "src/index.jsx",
    output: {
        file: "dist-rollup/index.js",
    },
    jsx: "react-jsx",
    plugins: [
        replace({
            preventAssignment: true,
            values: {
                "process.env.NODE_ENV": JSON.stringify("production"),
            },
        }),
        nodeResolve(),
        css({
            transform: lightningCssTransformer,
        }),
        commonjs(),
        terser(),
    ],
};

export default config;
