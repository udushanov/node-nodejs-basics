import { dirname, join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

const compress = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const sourceFilePath = join(currentDir, "files", "fileToCompress.txt");
  const destinationFilePath = join(currentDir, "files", "archive.gz");

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);
  const gzipStream = createGzip();

  try {
    await pipeline(readStream, gzipStream, writeStream);
    console.log("File compressed successfully");
  } catch (err) {
    console.error("Error compressing file: ", err);
  }
};

await compress();
