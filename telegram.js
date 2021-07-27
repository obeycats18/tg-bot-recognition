const { recognize } = require("./recognition");
const { getFileBuffer, mapResultsToString } = require("./utils");

const onVoiceMessage = async (ctx, recognitionClient) => {
  const fileId = ctx.message.voice.file_id;
  const fileLink = await ctx.telegram.getFileLink(fileId);

  getFileBuffer(fileLink.href, async (buffer) => {
    const response = await recognize(recognitionClient, buffer);
    const message = mapResultsToString(response.results);

    console.log(response.results);

    ctx.reply(message);
  });
};

module.exports = { onVoiceMessage };

/**
 * TODO
 *  - Babel, Webpack
 *  - Logs response
 *  - Yandex Client
 *  - VPN
 *  */
