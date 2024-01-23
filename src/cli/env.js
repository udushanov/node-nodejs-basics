const parseEnv = () => {
  const entries = Object.entries(process.env);

  const filteredEntries = entries.filter((entry) =>
    entry[0].startsWith("RSS_")
  );

  for (const result of filteredEntries) {
    console.log(result[0] + "=" + result[1]);
  }
};

parseEnv();
