'use strict';

/**
 * @typedef {Object} LoggingLevel
 * @property {Number} weight
 * @property {String} color
 * */

/**
 *
 * @classdesc Wrapper class that offers a collection of Logging levels for the logging services library {@link LoggingLevel}.
 * @author Robert Dumitrescu (LinkedIn: https://www.linkedin.com/in/robertdumitrescu/) (Github: https://github.com/robertdumitrescu)
 * @date 2020-04-07
 * @class LevelsEnum
 */
class LevelsEnum {
  /**
   * @description If this is passed, all the logging messages will be tracked
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static all = {weight: Number.MIN_VALUE, color: 'grey'};

  /**
   * @description If this is passed, a full path signature will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static trace = {weight: 5000, color: 'blue'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static debug = {weight: 10000, color: 'cyan'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static info = {weight: 20000, color: 'green'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static warn = {weight: 30000, color: 'yellow'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static error = {weight: 40000, color: 'red'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static fatal = {weight: 50000, color: 'magenta'};

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LoggingLevel}
   * @memberof LevelsEnum
   */
  static off = {weight: Number.MAX_VALUE, color: 'grey'};
}

export {LevelsEnum};