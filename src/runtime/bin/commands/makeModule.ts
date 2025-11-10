import fs from "fs";
import path from "path";

export default async function (name?: string) {
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
    path.join(runtimePath, "pages"),
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
    console.log(`📝 فایل ساخته شد: ${path.relative(root, coreFile)}`);
  }

  console.log(`${name} module created`);
}
