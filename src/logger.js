'use strict';

/**
 * @typedef {Object} LoggerOptions
 * @property {LogFormat} format - This format will apply to all the logs. Some other format may be used down the line for filtering and sending logs to other systems
 * @property {String} level - This is the level that will drive how aggressive the logging will be
 * @property {Object} levels - If this is populated, then the usual levels will be completely replaced @TODO
 * @property {Object} customLevels - If this is populated, then on top of the usual levels, the new levels passed here, will be appended to the existing ones @TODO
 * @property {Boolean} getLocation - If this is on true, when the event is being normalized, the framework will try to get the location where the log was issues (method name, file name, line number, column number, call stack)
 * */

/**
 * @typedef {Object} LevelsDefinitions - Those are the relevant definitions for the given scenario
 * @property {LoggingLevel} trace
 * @property {LoggingLevel} debug
 * @property {LoggingLevel} info
 * @property {LoggingLevel} warn
 * @property {LoggingLevel} error
 * @property {LoggingLevel} fatal
 **/

/**
 * @typedef {Object} LevelsCollector - This will keep track of what messages/logs/events are in which level
 * @property {Number[]} trace
 * @property {Number[]} debug
 * @property {Number[]} info
 * @property {Number[]} warn
 * @property {Number[]} error
 * @property {Number[]} fatal
 **/

/**
 * @typedef {Object} TagsCollector
 * @property {Number[]} custom1
 * @property {Number[]} custom2
 **/

/**
 * @typedef {Object} TrackingIdsCollector
 * @property {Number[]} custom1
 * @property {Number[]} custom2
 **/

/**
 * @typedef {Object} LogsCollector
 * @property {LogFormat} format - The la
 * @property {LoggingLevel} level
 * @property {Number} minLevelWeight
 * @property {LevelsDefinitions} levelsDefinitions
 * @property {LoggingEvent[]|String[]} logs
 * @property {String[]} formatted
 * @property {LevelsCollector} levelsCollector
 * @property {TagsCollector} tagsCollector
 * @property {TrackingIdsCollector} trackingIdsCollector
 * @property {String[]} trackingIds
 * @property {Boolean} getLocation - If this is on true, when the event is being normalized, the framework will try to get the location where the log was issues (method name, file name, line number, column number, call stack)
 **/


import {FormatsEnum} from './enums/formats.Enum.js';
import {LevelsEnum} from './enums/levels.Enum.js';
import {LoggingEventService} from './services/loggingEvent.Service.js';

/**
 * @class Logger
 */
class Logger {
    /** @type {LoggerOptions} */
    static defaultOptions = {
        format: FormatsEnum.pass,
        level: LoggingEventService.getPropName(LevelsEnum).error.toLowerCase(),
        getLocation: true,
    }

    /**
     * @param {LoggingLevel} level - Passing the level, will tell which levels should be kept and which levels should be discarded
     * @returns {{levelsDefinitions: {}, levelsCollector: {}}}
     */
    static initializeLevels (level) {
        let levelsDef = {
            levelsDefinitions: {},
            levelsCollector: {},
        };


        for (const [key] of Object.entries(LevelsEnum)) {
            if (level.weight <= LevelsEnum[key].weight) {
                levelsDef.levelsDefinitions[key] = LevelsEnum[key]
                levelsDef.levelsCollector[key] = []
            }
        }

        return levelsDef;
    }


    /**
     * @param {LoggerOptions} options - The options that will drive the initialization of the Log Collector
     * @returns {LogsCollector}
     */
    static initialize (options) {
        /** @type {LoggerOptions} */
        options = {...Logger.defaultOptions, ...options};

        let initializedLevels = Logger.initializeLevels(LevelsEnum[options.level]);

        /** @type {LogsCollector} */
        let collector = {
            format: options.format,
            level: options.level,
            minLevelWeight: LevelsEnum[options.level].weight,
            levelsDefinitions: initializedLevels.levelsDefinitions,
            logs: [],
            levelsCollector: initializedLevels.levelsCollector,
            tagsCollector: {},
            trackingIdsCollector: {},
            trackingIds: [],
            getLocation: options.getLocation,
        };

        return collector;
    }

    /**
     * @param {LogsCollector} logs - The Logs collector to which the new tracking id will be added to
     * @param {LogsCollector} id - The new id that will be added
     * @returns {LogsCollector}
     */
    static addTrackingId (logs, id) {
        return collector;
    }

    /**
     * @param {LogsCollector} logs - The Logs collector to which the new log/event will be added
     * @param {LoggingEvent} event - The event that will be added to the collector
     * @returns {LogsCollector}
     */
    static add (logs, event) {
        /**
         * Normalize the event
         *
         * @type {LoggingEvent}
         * */
        let normalized = LoggingEventService.normalize(event);

        /** Add what we can add on the logsCollector {@link LogsCollector} before the formatting */

        /** Format the event */

        /** Add the event to the logs array {@link LogsCollector.logs} */

        return logs;
    }
}

export {Logger};