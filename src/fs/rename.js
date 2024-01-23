import { dirname, join } from "node:path";
import { rename as changeName } from "node:fs/promises";

const rename = async () => {
  const currentPath = dirname(import.meta.url).substring(8);
  const oldPath = join(currentPath, "files", "wrongFilename.txt");
  const newPath = join(currentPath, "files", "properFilename.md");

  try {
    await changeName(oldPath, newPath);
    console.log("File renamed successfully");
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await rename();
