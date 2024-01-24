import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
const { createHmac } = await import("node:crypto");

const calculateHash = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const filePath = join(currentDir, "files", "fileToCalculateHashFor.txt");
  const buffer = await readFile(filePath);
  const text = buffer.toString();

  const hmac = createHmac('sha256', 'secret');

  hmac.on('readable', () => {
    const data = hmac.read();
    
    if (data) {
      console.log(data.toString('hex'));
    }
  })
  
  hmac.write(text);
  hmac.end();
};

await calculateHash();
