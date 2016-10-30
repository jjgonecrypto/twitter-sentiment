'use strict'

const Readable = require('stream').Readable

const sentiment = require('sentiment')
const Twitter = require('twitter')

// For more information on track usage, checkout https://dev.twitter.com/streaming/overview/request-parameters#track
module.exports = ({ track, minFollowers = 0 }) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    const readable = new Readable({
        objectMode: true,
        read() {}
    })

    client.stream('statuses/filter', { track }, emitter => {
        emitter.on('data', data => {
            if (minFollowers && data.user && data.user.followers_count < minFollowers) return
            const dataWithSentiment = Object.assign(data, { sentiment: sentiment(data.text) })
            readable.push(dataWithSentiment)
        })

        emitter.on('error', err => readable.emit('error', err))

        emitter.on('end', () => readable.push(null))
    })

    return readable
}

