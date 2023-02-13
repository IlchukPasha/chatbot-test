# chatbot-test

## Installation

```bash
$ cp .env.example .env
```

AWS keys attached in the email, please paste them in your .env file to the corresponding keys:
AWS_ACCESS_KEY_ID
SECRET_ACCESS_KEY

I know that it is better to store them in a more secure environment, but for simplicity I take them through environment variables

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
$ To exit the program simply type 'exit'
```

## Stop app

```bash
$ To exit the program simply type 'exit'
```

## What to ask?
```bash
$ You can ask questions about Alexa (AWS service). I have configured Lex to answer some questions about Alexa.
$ If Lex doesn`t know the answer, Kendra starts work.
$ In Kendra, i have added this data source: https://aws.amazon.com/alexaforbusiness/faqs/
$ questions examples: 
  what is Alexa? 
  how alexa business works? 
  what can you build with Alexa?
  What is a shared device?
```

## implementation details
```bash
$ I did not use the lambda function in order not to waste time setting up the serverless framework and its deployment settings.
$ I wrote pure logic and made settings for AWS services Lex and Kendra.
$ In real conditions for the frontend application, I would create a lambda function that processes input from the client and talk to Lex. Also would make a lambda function that is executed on 'Lex FallbackIntent fulfillment' and inside talks to Kendra. It will be better architecture.
```
