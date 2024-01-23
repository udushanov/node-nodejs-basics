import { dirname, join } from "node:path";
import { readdir } from "node:fs/promises";

const list = async () => {
  const currentPath = dirname(import.meta.url).substring(8);
  const filePath = join(currentPath, "files");

  try {
    const fileNames = await readdir(filePath);
    console.log('An array of filenames from files directory:')
    console.log(fileNames)
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await list();
