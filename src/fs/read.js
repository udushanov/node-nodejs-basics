import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";

const read = async () => {
  const currentPath = dirname(import.meta.url).substring(8);
  const filePath = join(currentPath, "files", "fileToRead.txt");

  try {
    const content = await readFile(filePath);
    console.log("The content from the file fileToRead.txt: \n" + content);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
