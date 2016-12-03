'use strict';
// get the amqplib module from npm and utilize it's callback_api
const amqp = require('amqplib/callback_api'),
    config = require('../config'); // our nconf
// connect to the RabbitMQ server
amqp.connect(`amqp://${config.get('HOST')}`, (err, conn) => {
    // create a channel
    conn.createChannel((err, ch) => {
        // declare a queue to send data into
        const q = 'hello';
        // assert the queue (settings)
        ch.assertQueue(q, {durable: false});
        // send data into the queue
        ch.sendToQueue(q, new Buffer('Hello World!'));
        // log it out
        console.log('[x] Sent "Hello World!"');
        // NOTE: queue's will only be created if it does not already exist
    });
    setTimeout(() => {
        // kill the connection to the RabbitMQ server
        conn.close();
        // kill the Node.js env
        process.exit(0);
    }, 500); // we've got 1/2 second to send to possibly create and send some data into our queue
});
