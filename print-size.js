import * as glob from "glob";
import { gzipSizeFromFile } from "gzip-size";

async function dirSize(dir) {
  return Promise.all(
    glob.sync(dir + "/**", { nodir: true }).map(async (file) => ({
      file,
      size: await gzipSizeFromFile(file),
    })),
  );
}

console.table([
  ...(await dirSize("dist-esbuild")),
  ...(await dirSize("dist-rollup")),
]);
