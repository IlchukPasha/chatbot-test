const prompts = require('prompts');
require('dotenv').config()
const { LexRuntimeV2Client, RecognizeTextCommand } = require('@aws-sdk/client-lex-runtime-v2');
const { KendraClient, QueryCommand } = require("@aws-sdk/client-kendra");

const lexClient = new LexRuntimeV2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
});

const kendraClient = new KendraClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
});

const queryKendra = async (question) => {
  try {
    const data = await kendraClient.send(new QueryCommand({
      IndexId: process.env.KENDRA_INDEX_ID,
      PageSize: 100,
      QueryText: question
    }));

    if (data.TotalNumberOfResults === 0) {
      console.log('Can\'t find an answer to that');
    } else {
      console.log(data.ResultItems[0].DocumentExcerpt?.Text);
    }
  } catch (error) {
    console.log("Some Kendra error occur. ", error);
  }
}

(async () => {
  while (true) {
    const userData = await prompts({
      type: 'text',
      name: 'question',
      message: 'Enter your question: ',
      validate: value => value === 'exit' ? process.exit() : true
    });

    const lexParams = {
      botId: process.env.BOT_ID,
      botAliasId: process.env.BOT_ALIAS_ID,
      text: userData.question,
      sessionId: "chatbot-demo",
      localeId: process.env.BOT_LOCALE_ID
    };

    try {
      const data = await lexClient.send(new RecognizeTextCommand(lexParams));
      if (data.sessionState.intent.name === 'FallbackIntent') {
        await queryKendra(userData.question);
      } else {
        console.log(data.messages[0].content);
      }
    } catch (err) {
      console.log("Some Lex error occur. ", err);
    }
  }
})();
