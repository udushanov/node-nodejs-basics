import { dirname, join } from "node:path";
import { rm } from "node:fs/promises";

const remove = async () => {
  const currentPath = dirname(import.meta.url).substring(8);
  const filePath = join(currentPath, "files", "fileToRemove.txt");

  try {
    await rm(filePath);
    console.log("File removed successfully");
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
