'use strict';

import {LevelsEnum} from '../enums/levels.Enum.js';
import {isArray} from '../../../validators/isArray.js';
import Fecha from 'fecha';

/**
 * @class GetBaseError
 */
class LoggingEventService {
    /**
     * @typedef {Object} LoggingLocation
     * @property {String} methodName - The method where the log/event was issued
     * @property {String} fileName - The name of the file where the log/event was issued
     * @property {Number} lineNumber - At what line number in the file the log/event was issued
     * @property {Number} columnNumber - At what column number within the line the log/event was issued
     * @property {String[]} callStack - The classical call stack for errors
     * */

    /**
     * @typedef {Object} LoggingEvent
     * @property {Date|String} timestamp - When the log happened
     * @property {String} path - The path or property name that points to this particular value. NOTE: This is not mandatory
     * @property {*} value - The value that errored out. NOTE: This is not mandatory
     * @property {String[]} data - The reason / data will be showed as well. This can be either something like: "couldn't be analyzed" or some object that is related
     * @property {Object} context - Context that will help debug the circumstances in which the log happened. This needs to be manually populated by the implementer
     * @property {String} level - This is sort of mandatory. If this is not passed it will default to TRACE
     * @property {String[]} trackingIds - This is to overwrite the tracking ids from the logs collector, otherwise, the trackingIds will be populated with a snapshot of what's inside LogsCollector
     * @property {String[]} tags - Custom tags for further filtering in data visualization solutions
     * @property {String} methodName - The method where the log/event was issued
     * @property {String} fileName - The name of the file where the log/event was issued
     * @property {Number} lineNumber - At what line number in the file the log/event was issued
     * @property {Number} columnNumber - At what column number within the line the log/event was issued
     * @property {String[]} callStack - The classical call stack for errors
     * */

    /**
     * @typedef {BaseMessageOptions} BaseValidatorOptions
     * @property {*[]|undefined} values - This is for various comparision or operations.
     * @property {Number|undefined} specificity - This is a constant set in each interval, if you pass it via this argument, you will overwrite that constant. This determines how specific is an validator
     * @property {Boolean|undefined} returnResult - If this is set to true, instead of a Boolean or String value, a {@link BaseValidatorResult} will be returned
     * @property {Boolean|undefined} global - If the operation needs to happen globally, this will be checked
     * @property {Boolean|undefined} strict - If the operation needs to happen strictly, this will be checked, otherwise if the validator supports relaxed mode, that will happen in relaxed mode
     **/

    /**
     * @typedef {BaseMessageOptions} BaseExtractorOptions
     **/

    /**
     * @typedef {Object} BaseValidatorResult
     * @property {Array|String[]|undefined} messages
     * @property {Number|undefined} specificity
     * @property {*} result
     * */

    /**
     * @typedef {Object} BaseExtractorResult
     * @property {*} result
     * */

    /**
     * @typedef {Object} BaseConstants
     * @property {RegExp} regex
     * @property {RegExp} relaxedRegex
     * @property {RegExp} strictRegex
     * @property {RegExp} regex1
     * @property {RegExp} regex2
     * @property {Boolean} safe - Deems if the validator/extractor is safe or not
     * @property {Boolean} strict - If a {@link BaseConstants.relaxedRegex} and a {@link BaseConstants.strictRegex} are provided, based on this flag, it will be chosen what to respect
     * @property {Boolean} isDomainSpecific
     * @property {Boolean} dependant - If this is on true, it means that it depends on some other class(es)
     **/

    /**
     * @typedef {BaseConstants} BaseExtractorConstants
     * @property {String} extractorName
     **/

    /**
     * @typedef {BaseConstants} BaseTransformerConstants
     * @property {String} transformerName
     **/

    /**
     * @typedef {BaseConstants} BaseValidatorConstants
     * @property {String} validatorName
     * @property {Number} specificity  - Unless is overwritten by the validator options, this will be propagated to the {@link BaseValidatorResult.specificity}
     * @property {String} compositeType - If it succeeds validation, what is the composite type of the variable validated
     * @property {String} baseType - If it succeeds validation, what is the base type of the variable validated
     * @property {Array} values - Whatever default values make sense for validation
     * @property {String} reason - What is the reason behind failing the validation
     * @property {String} reason2 - What is the reason behind failing the validation. This is mainly for more complex validators that are verifying multiple things
     * @property {String} reason3 - What is the reason behind failing the validation. This is mainly for more complex validators that are verifying multiple things
     **/

    /**
     * @typedef {BaseValidatorConstants} PathValidatorConstants
     * @property {String} pathBaseType
     * @property {String} pathCompositeType
     **/

    /**
     * @param {BaseMessageOptions} options
     * @returns {String}
     */
    static get (options) {
    /** @type {BaseMessageOptions} */
        let defaultOptions = {
            showIssuer: true,
            showPath: true,
            showValue: false,
            showReason: true,
            reason: '',
            propertyName: 'property',
        };

        options = {...defaultOptions, ...options};

        let stringified;
        let valueStringified;
        if (
            (options[options.propertyName] !== null && typeof options[options.propertyName] === 'object' && !Array.isArray(options[options.propertyName])) // isObject
      || Array.isArray(options.property) // isArray
        ) {
            stringified = JSON.stringify(options[options.propertyName]);
        } else if (typeof options[options.propertyName] === 'string' || options[options.propertyName] instanceof String) {
            stringified = `"${options[options.propertyName]}"`;
        } else {
            stringified = options[options.propertyName];
        }

        if (options.hasOwnProperty('value') && options.showValue) {
            if (
                (options.value !== null && typeof options.value === 'object' && !Array.isArray(options.value)) // isObject
        || Array.isArray(options.value) // isArray
            ) {
                valueStringified = JSON.stringify(options.value);
            } else if (typeof options.value === 'string' || options.value instanceof String) {
                valueStringified = `"${options.value}"`;
            } else {
                valueStringified = options.value;
            }
        }

        let message;
        if (options.showIssuer && options.showPath) {
            message = `[${options.issuer}]: ${options.path} = ${stringified} {${typeof options[options.propertyName]}}`;
        } else if (options.showIssuer) {
            message = `[${options.issuer}]: ${stringified} {${typeof options[options.propertyName]}}`;
        } else if (options.showPath) {
            message = `${options.path} = ${stringified} {${typeof options[options.propertyName]}}`;
        } else {
            message = `${stringified} {${typeof options[options.propertyName]}}`;
        }

        if (options.hasOwnProperty('value') && options.showValue) {
            message += ' and ';
            if (options.showPath) {
                message += `value = ${valueStringified} {${typeof options.value}}`;
            } else {
                message += `${valueStringified} {${typeof options.value}}`;
            }
        }

        if (options.showReason && options.reason.length !== 0) {
            message = message + ' ' + options.reason;
        }

        return message;
    }

    static arrayIsPopulated(input) {
        return Array.isArray(input) && input.length !== 0;
    }

    static stringIsPopulated(input) {
        return (typeof input === 'string' || input instanceof String) && input.length > 0;
    }

    /**
     *
     * @param input
     * @returns {Boolean}
     */
    static isObject(input) {
        return input !== null &&
          typeof input === 'object' &&
          !Array.isArray(input)
    }

    /**
     *
     * @param input
     * @returns {Boolean}
     */
    static objectIsDate(input) {
        return LoggingEventService.isObject(input) &&
          Object.prototype.toString.call(input) === '[object Date]' &&
          !Number.isNaN(input);
    }

    /**
     * @param {String} input - The input that will be parsed
     * @returns {Date}
     */
    static parseStringDate(input) {
        let supportedFormats = ['YYYY-MM-DDTHH:mm:ss.SSSZ', 'isoDateTime', 'ddd, DD MMM YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss.SSS', 'YYYY-MM-DD HH:mm:ss', 'default', 'shortDate', 'mediumDate', 'longDate', 'fullDate', 'shortTime', 'mediumTime', 'longTime', 'isoDate', 'isoDateTime', 'DD/MM/YYYY', 'YYYY-MM-DD'];
        let parsed;
        try {
            for (let i = 0; i < supportedFormats.length; i++) {
                parsed = Fecha.parse(input, supportedFormats[i]);
                if (LoggingEventService.objectIsDate(parsed)) {
                    return parsed;
                }
            }

            /** If no valid string dates were found assign a new Date */
            return new Date();
        } catch (e) {
            return new Date();
        }
    }

    /**
     * @param {Object} object
     * @return {PropertyKey|*}
     */
    static getPropName (object) {
        return new Proxy(object, {
            get(_, key) {
                return key;
            },
        })
    }

    /**
     * @param {LoggingEvent} event
     * @param {LoggingLocation=} location
     * @returns {LoggingEvent}
     */
    static normalize (event, location) {
        /** @type {LoggingEvent} */
        let normalized = {};

        /** Normalize timestamp {@link LoggingEvent.timestamp} */
        if (event.hasOwnProperty('timestamp')) {
            /** If a timestamp is passed */
            if (LoggingEventService.objectIsDate(event.timestamp)) {
                /** If is an object, with prototype "[object Date]" and is not NaN (equivalent with "objectIsDate") */
                normalized.timestamp = event.timestamp;
            } else if (LoggingEventService.stringIsPopulated(event.timestamp)) {
                /** If is a populated string */
                normalized.timestamp = LoggingEventService.parseStringDate(event.timestamp);
            } else {
                /** If is none of the above (corrupt) then assign a new Date */
                normalized.timestamp = new Date();
            }
        } else {
            /** If is not passed, assign a new one */
            normalized.timestamp = new Date();
        }

        /** Normalize path {@link LoggingEvent.path} */
        if (event.hasOwnProperty('path') && LoggingEventService.stringIsPopulated(event.path)) {
            /** If a path is passed and is a populated string */
            normalized.path = event.path;
        }

        /** Normalize value {@link LoggingEvent.value} */
        if (event.hasOwnProperty('value')) {
            /** If a value is passed, then assign it */
            normalized.value = event.value;
        }

        /** Normalize data {@link LoggingEvent.data} */
        if (LoggingEventService.stringIsPopulated(event)) {
            normalized.data = [event]
        } else if (LoggingEventService.stringIsPopulated(event.data)) {
            normalized.data = [event.data]
        } else if (LoggingEventService.arrayIsPopulated(event.data)) {
            normalized.data = event.data
        }

        /** Normalize context {@link LoggingEvent.context} @TODO */

        /** Normalize level {@link LoggingEvent.level} */
        if (event.hasOwnProperty('level') && LoggingEventService.stringIsPopulated(event.level)) {
            /** If a level is passed and is a populated string */
            normalized.level = event.level.toLowerCase();
        } else {
            /** If not, assign the default which is TRACE */
            normalized.level = LoggingEventService.getPropName(LevelsEnum).trace.toLowerCase()
        }

        /** Normalize trackingIds {@link LoggingEvent.trackingIds} @TODO */
        /** Normalize tags {@link LoggingEvent.tags} @TODO */
        /** Normalize methodName {@link LoggingEvent.methodName} @TODO */
        /** Normalize fileName {@link LoggingEvent.fileName} @TODO */
        /** Normalize lineNumber {@link LoggingEvent.lineNumber} @TODO */
        /** Normalize columnNumber {@link LoggingEvent.columnNumber} @TODO */
        /** Normalize callStack {@link LoggingEvent.callStack} @TODO */

        return normalized;
    }
}


export {LoggingEventService};