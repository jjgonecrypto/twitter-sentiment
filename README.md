# twitter-sentiment
Node readable stream to track twitter sentiment via the streaming endpoint

![](https://media.giphy.com/media/z6OjrU9wRXNXW/giphy.gif)

##Installation

`npm i twitter-sentiment`

Set environment variables for your twitter app ([create on Twitter](https://apps.twitter.com/)):

```sh
export TWITTER_CONSUMER_KEY="..."
export TWITTER_CONSUMER_SECRET="..."
export TWITTER_CONSUMER_ACCESS_TOKEN="..."
export TWITTER_CONSUMER_ACCESS_KEY="..."
```

##Usage

```javascript
const twitterSentiment = require('twitter-sentiment')

const Writable = require('stream').Writable

const readable = twitterSentiment({ track: 'clinton', minFollowers: 10000 }) 
readable.pipe(new Writable({ 
    objectMode: true,
    write(chunk, enc, next) {
        console.log(chunk.text)
        console.log(chunk.sentiment.score)
        next(null)
     }
}))

// to end the twitter stream connect, emit destroy
readable.emit('destroy')
```
