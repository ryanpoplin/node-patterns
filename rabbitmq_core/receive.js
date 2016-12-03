'use strict';
// get the amqplib module from npm and utilize it's callback_api
const amqp = require('amqplib/callback_api'),
    config = require('./config'); // our nconf
// connect to the RabbitMQ server
amqp.connect(`amqp://${config.get('HOST')}`, (error, conn) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    // create a channel for communications if one does not exist
    conn.createChannel((err, ch) => {
        // const exchangeName = '';
        // ch.assertExchange(q, 'topic', {durable: true});
        // name of the queue we're wanting to get messages from
        const q = 'hello';
        // ...
        ch.assertQueue(q, {durable: true}, (error, queueName) => {
            if (error) {
                console.log(error);
                process.exit(1);
            }
            // const routingKeys = [
            //     '...'
            // ];
            // routingKeys.forEach((routingKey) => {
            //     ch.bindQueue(queueName.name, exchangeName, routingKey);
            // });
            // ch.prefetch(1);
        });
        console.log('[*] Waiting for messages in %s. To exit pres CTRL+C', q);
        // ask the RabbitMQ server to async push us messages
        ch.consume(q, (msg) => {
            console.log(msg.fields.routingKey);
            console.log('[x] Received %s', msg.content.toString());
        }, {
            noAck: false,
            exclusive: true
        });
    });
});
