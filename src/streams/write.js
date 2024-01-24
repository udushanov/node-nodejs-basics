import { dirname, join } from "node:path";
import { createWriteStream } from "node:fs";

const write = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const filePath = join(currentDir, "files", "fileToWrite.txt");

  const writeStream = createWriteStream(filePath);

  console.log("Enter text to write to the file (Ctrl + D (or + C) to end):");

  process.stdin.on("data", (chunk) => {
    writeStream.write(chunk);
  });

  process.stdin.on("end", () => {
    console.log("Data written to the file");
  });
};

await write();
