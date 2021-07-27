const https = require("https");

const getFileBuffer = (fileURL, callback) => {
  if (!fileURL) {
    return console.error("File url is required");
  }

  https.get(fileURL, (response) => {
    const data = [];
    response.on("data", (chunk) => {
      data.push(chunk);
    });

    response.on("close", () => {
      callback(Buffer.concat(data));
    });
  });
};

const mapResultsToString = (results) => {
  if (!Array.isArray(results)) {
    return console.error("Results must be array");
  }

  const messages = [];

  results.forEach((result) => {
    const transcriptions = result.alternatives
      .map(({ transcript }) => transcript)
      .join(" ");

    messages.push(transcriptions);
  });

  return messages.join(" ");
};

module.exports = { mapResultsToString, getFileBuffer };
