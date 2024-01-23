import { dirname, join } from "node:path";
import { mkdir, readdir, copyFile } from "node:fs/promises";

const copy = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const sourcePath = join(currentDir, "files");
  const destinationPath = join(currentDir, "files_copy");
  
  try {
    const files = await readdir(sourcePath);
    await mkdir(destinationPath, { recursive: false });

    for (const file of files) {
      const sourceFile = join(sourcePath, file);
      const destinationFile = join(destinationPath, file);
      await copyFile(sourceFile, destinationFile);
    }

  } catch(err) {
    throw new Error("FS operation failed");
  }
};

await copy();
