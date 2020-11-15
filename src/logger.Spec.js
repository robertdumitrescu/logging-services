'use strict';

import chai from 'chai';

import {Logger} from './logger.js';
import Telejson from 'telejson';
import configs from 'configs';
import rfdc from 'rfdc';

const clone = rfdc();
const stringify = Telejson.stringify;
const teleJsonConfig = configs.teleJsonConfig;

let expect = chai.expect;

describe('Logger', () => {
    /** @type {LogsCollector} */
    let emptyLogs = {};
    beforeEach(() => {
        emptyLogs = clone({
            layout: 'pass',
            level: 'error',
            minLevelWeight: 40000,
            levelsDefinitions: {
                error: {
                    weight: 40000,
                    color: 'red',
                },
                fatal: {
                    weight: 50000,
                    color: 'magenta',
                },
                off: {
                    weight: 1.7976931348623157e+308,
                    color: 'grey',
                },
            },
            logs: [],
            levelsCollector: {
                error: [],
                fatal: [],
                off: [],
            },
            tagsCollector: {},
            trackingIdsCollector: {},
            trackingIds: [],
            getLocation: true,
        })
    });
    describe('initialize', () => {
        it('should initialize empty', () => {
            /** @type {LoggerOptions} */
            let initial = {};

            /** @type {LogsCollector} */
            let expected = emptyLogs;

            /** @type {LogsCollector} */
            let actual = Logger.initialize(initial);

            expect(stringify(actual, teleJsonConfig)).to.deep.equal(stringify(expected, teleJsonConfig));
        });
    });

    describe('add', () => {
        describe('a simple message', () => {
            it('should initialize empty', () => {
                /** @type {LogsCollector} */
                let expected = {
                    layout: 'pass',
                    level: 'error',
                    minLevelWeight: 40000,
                    levelsDefinitions: {
                        error: {
                            weight: 40000,
                            color: 'red',
                        },
                        fatal: {
                            weight: 50000,
                            color: 'magenta',
                        },
                        off: {
                            weight: 1.7976931348623157e+308,
                            color: 'grey',
                        },
                    },
                    logs: [],
                    levelsCollector: {
                        error: [],
                        fatal: [],
                        off: [],
                    },
                    tagsCollector: {},
                    trackingIdsCollector: {},
                    trackingIds: [],
                    getLocation: true,
                };

                /** @type {LogsCollector} */
                let actual = Logger.add(emptyLogs, {timestamp: 'Nov 5, 2010', data: 'is corrupt'});

                expect(stringify(actual, teleJsonConfig)).to.deep.equal(stringify(expected, teleJsonConfig));
            });
        });
    });
});