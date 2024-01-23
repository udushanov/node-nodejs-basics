import { access, constants, writeFile } from "node:fs/promises";
import {dirname, join} from 'node:path'

const create = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const filePath = join(currentDir, 'files', 'fresh.txt');
  const message = "I am fresh and young";

  try {
    await access(filePath, constants.F_OK);
    throw new Error("File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(filePath, message);
      console.log("File created and text written successfully");
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await create();
