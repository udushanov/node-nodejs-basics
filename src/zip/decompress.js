import { dirname, join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";

const decompress = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const sourceFilePath = join(currentDir, "files", "archive.gz");
  const destinationFilePath = join(currentDir, "files", "fileToCompress.txt");

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);
  const gunzipStream = createGunzip();

  try {
    await pipeline(readStream, gunzipStream, writeStream);
    console.log("File uncompressed successfully");
  } catch (err) {
    console.error("Error compressing file: ", err);
  }
};

await decompress();
