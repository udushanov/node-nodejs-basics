import { Transform } from "node:stream";

const reverseTransform = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split("").reverse().join("");
      this.push(reversedText);
      callback();
    },
  });
};

const transform = async () => {
  const reverseStream = reverseTransform();

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
