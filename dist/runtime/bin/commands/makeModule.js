import fs from "fs";
import path from "path";
export default async function(name) {
  if (!name) {
    console.error("please set name for module");
    process.exit(1);
  }
  const root = process.cwd();
  const modulePath = path.join(root, "modules", name);
  const runtimePath = path.join(modulePath, "runtime");
  const folders = [
    modulePath,
    runtimePath,
    path.join(runtimePath, "components"),
    path.join(runtimePath, "composables"),
    path.join(runtimePath, "assets"),
    path.join(runtimePath, "pages")
  ];
  for (const dir of folders) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  const coreFile = path.join(modulePath, "core.ts");
  if (!fs.existsSync(coreFile)) {
    const content = `
import { defineNuxtModule } from 'nuxt/kit'
export default defineNuxtModule({
  meta: {
    name: '${name}',
    configKey: '${name}'
  },
  setup(_, nuxt) {

  }
});
`;
    fs.writeFileSync(coreFile, content.trimStart());
    console.log(`\u{1F4DD} \u0641\u0627\u06CC\u0644 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F: ${path.relative(root, coreFile)}`);
  }
  console.log(`${name} module created`);
}
