const RECOGNITION_CLIENT_CONFIG = {
  encoding: "OGG_OPUS",
  sampleRateHertz: 16000,
  languageCode: "ru-RU",
};

const recognize = async (client, data) => {
  const [response] = await client.recognize({
    config: RECOGNITION_CLIENT_CONFIG,
    audio: { content: data },
  });

  return response;
};

module.exports = { recognize };
