import fs from 'node:fs/promises';

export async function loadExports(filePath, exportNames) {
  const raw = await fs.readFile(filePath, 'utf8');
  const section = raw.split('// 数据获取函数')[0];

  const cleaned = section
    .replace(/^import .*$/gm, '')
    .replace(/export const /g, 'const ')
    .replace(/const (\w+)\s*:[^=]+=/g, 'const $1 =')
    .trim();

  const wrapper = `"use strict";\n${cleaned}\nreturn { ${exportNames.join(', ')} };`;
  // eslint-disable-next-line no-new-func
  return Function(wrapper)();
}
