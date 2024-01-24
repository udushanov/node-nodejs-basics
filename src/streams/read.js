import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";

const read = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const filePath = join(currentDir, "files", "fileToRead.txt");
  const readableStream = createReadStream(filePath);

  readableStream.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  readableStream.on("end", () => {
    console.log("Stream ended");
  });
};

await read();
