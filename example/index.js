'use strict'

const Writable = require('stream').Writable

const twitterSentiment = require('../')

const readable = twitterSentiment({ track: 'clinton', minFollowers: 10000 })
readable.pipe(new Writable({
    objectMode: true,
    write(chunk, enc, next) {
        console.log(chunk.text)
        console.log(chunk.sentiment.score, chunk.sentiment.comparative)
        next(null)
    }
}))
