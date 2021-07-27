const dotenv = require("dotenv");
const speech = require("@google-cloud/speech");
const { Telegraf } = require("telegraf");

const { onVoiceMessage } = require("./telegram");

const fs = require("fs");
const path = require("path");

dotenv.config();

// Read google credentials from file

const creds = JSON.parse(
  fs.readFileSync(`${path.resolve(__dirname, "creds.json")}`).toString("utf-8")
);

// Create Google Speech Client

const speechClient = new speech.SpeechClient({ credentials: creds });

// Create Telegram Bot

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    "Добро пожаловать! Отправь боту голосовое сообщение и получи распознанный текст в подарок :)"
  )
);

bot.on("voice", async (ctx) => onVoiceMessage(ctx, speechClient));

bot.launch();
