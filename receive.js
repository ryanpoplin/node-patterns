'use strict';
// get the amqplib module from npm and utilize it's callback_api
const amqp = require('amqplib/callback_api');
// connect to the RabbitMQ server
amqp.connect('amqp://localhost', (err, conn) => {
    // create a channel for communications if one does not exist
    conn.createChannel((err, ch) => {
        // name of the queue we're wanting to get messages from
        const q = 'hello';
        // ...
        ch.assertQueue(q, {durable: false});
        console.log('[*] Waiting for messages in %s. To exit pres CTRL+C', q);
        // ask the RabbitMQ server to async push us messages
        ch.consume(q, (msg) => {
            console.log('[x] Received %s', msg.content.toString());
        }, {
            noAck: true // ...
        });
    });
});
