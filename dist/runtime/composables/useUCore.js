import fs from "fs";
import path from "path";
const pageList = (resolver, baseDir = "runtime/pages", prefix = "", dir) => {
  const results = [];
  const _dir = resolver.resolve(dir || baseDir);
  const list = fs.readdirSync(_dir, { withFileTypes: true });
  for (const entry of list) {
    const filePath = path.join(_dir, entry.name);
    if (entry.isDirectory()) {
      const subPrefix = prefix ? `${prefix}/${entry.name}` : entry.name;
      results.push(
        ...pageList(resolver, baseDir, subPrefix, path.join(_dir, entry.name))
      );
    } else {
      const relPath = path.relative(resolver.resolve(baseDir), filePath);
      results.push({
        path: `/${prefix}/${entry.name}`.replace(/\\/g, "/").replaceAll("_", ":").replaceAll(".vue", ""),
        name: relPath.replace(/\\/g, "-").replace(/\.vue$/, "").replaceAll("_", ""),
        file: resolver.resolve(`runtime/pages/${relPath}`)
      });
    }
  }
  return results;
};
export default () => ({
  pageLoader: pageList
});
