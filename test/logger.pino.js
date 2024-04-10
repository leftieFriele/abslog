'use strict';

const pino = require('pino');
const tap = require('tap');
const helpers = require('./helpers');
const log = require('../lib/log');

tap.test('pino() - set pino as logger - should return pino', (t) => {
    const pinoLogger = pino(helpers.testStream());
    const logger = log(pinoLogger);
    t.equal(logger, pinoLogger);
    t.end();
});

tap.test('pino() - log message - pino should log message', (t) => {
    const out = helpers.testStream((chunk) => {
        const msg = JSON.parse(chunk.toString());
        t.equal(msg.msg, 'hello');
        t.end();
    });

    const pinoLogger = pino(out);

    const logger = log(pinoLogger);
    logger.info('hello');
});
