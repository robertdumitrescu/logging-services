'use strict';

import chai from 'chai';

import {LoggingEventService} from './loggingEvent.Service.js';
let expect = chai.expect;

describe('LoggingEventService', () => {
    describe('normalize', () => {
        describe('only timestamp', () => {
            it('should normalize when the event has a date object passed as timestamp', () => {
            /** @type {LoggingEvent} */
                let initial = {
                    timestamp: new Date(2010, 11, 5, 14, 18, 30, 45),
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 11, 5, 14, 18, 30, 45),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (minimal)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 0, 0, 0, 0),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (full)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05T08:03:45.392Z',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 8, 3, 45, 392),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (full with timezone)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05T08:03:45.392+02:00',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 6, 3, 45, 392),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (human friendly minimal)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: 'Nov 5, 2010',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 0, 0, 0, 0),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (human friendly full)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: 'Wed, 05 Nov 2010 08:03:45',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 8, 3, 45, 0),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });

            it('should normalize when the event has a date string passed as timestamp (sql date time)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 0),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a date string passed as timestamp (sql date time with milliseconds)', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
        });
        describe('only timestamp and path', () => {
            it('should normalize when the event has a invalid path passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    path: null,
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a property name path passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    path: '.lorem',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    path: '.lorem',
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an empty path passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    path: '',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an populated path passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    path: '.a[2].b.c[3]',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    path: '.a[2].b.c[3]',
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
        });
        describe('only timestamp and value', () => {
            it('should normalize when the event has a null value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: null,
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: null,
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a undefined value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: undefined,
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: undefined,
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has a populated string value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: '.lorem',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: '.lorem',
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an empty string value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: '',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: '',
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an object value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: {a: 2},
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: {a: 2},
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an array value passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    value: [1, 2, true],
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    value: [1, 2, true],
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
        });
        describe('only timestamp and data', () => {
            it('should normalize when the event is an empty string', () => {
                /** @type {LoggingEvent} */
                let initial = '';

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual.timestamp).to.be.a('Date');
                expect(actual.data).to.deep.equal(undefined);
            });
            it('should normalize when the event is a populated string', () => {
                /** @type {LoggingEvent} */
                let initial = 'is not valid';

                /** @type {LoggingEvent} */
                let expected = {
                    data: ['is not valid'],
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual.timestamp).to.be.a('Date');
                expect(actual.data).to.deep.equal(expected.data);
                expect(actual.level).to.deep.equal('trace');
            });
            it('should normalize when the event has an empty string data passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    data: '',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an populated string data passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    data: 'is not valid',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    data: ['is not valid'],
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an empty array data passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    data: [],
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an populated array data passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    data: ['is not valid'],
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    data: ['is not valid'],
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
        });
        describe('only timestamp and level', () => {
            it('should normalize when the event has an empty string level passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    level: '',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'trace',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an populated string level passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    level: 'error',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'error',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
            it('should normalize when the event has an populated string level with capital letters passed', () => {
                /** @type {LoggingEvent} */
                let initial = {
                    timestamp: '2010-11-05 14:56:59.456',
                    level: 'erROr',
                };

                /** @type {LoggingEvent} */
                let expected = {
                    timestamp: new Date(2010, 10, 5, 14, 56, 59, 456),
                    level: 'error',
                };

                /** @type {LoggingEvent} */
                let actual = LoggingEventService.normalize(initial);

                expect(actual).to.deep.equal(expected);
            });
        });
    });
});