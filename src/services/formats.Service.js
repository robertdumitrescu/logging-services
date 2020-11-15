'use strict';

import dateFormat from 'date-format';
import os from 'os';
import path from 'path';
import util from 'util';

/**
 * Heavily inspired by https://github.com/log4js-node/log4js-node/blob/f8d46a939279c0ab4efc8bb5f0478c4b0949a4cf/lib/layouts.js
 *
 * @class FormatsService
 */
class FormatsService {
  static styles = {
      // styles
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      // grayscale
      white: [37, 39],
      grey: [90, 39],
      black: [90, 39],
      // colors
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [91, 39],
      yellow: [33, 39],
  };

  /**
   * @param style
   * @returns {String}
   */
  static colorizeStart(style) {
      return style ? `\x1B[${FormatsService.styles[style][0]}m` : '';
  }

  /**
   * @param style
   * @returns {String}
   */
  static colorizeEnd(style) {
      return style ? `\x1B[${FormatsService.styles[style][1]}m` : '';
  }

  /**
   * Taken from masylum's fork (https://github.com/masylum/log4js-node)
   *
   * @param str
   * @param style
   */
  static colorize(str, style) {
      return FormatsService.colorizeStart(style) + str + FormatsService.colorizeEnd(style);
  }

  static timestampLevelAndCategory(loggingEvent, colour) {
      return FormatsService.colorize(
          util.format(
              '[%s] [%s] %s - ',
              dateFormat.asString(loggingEvent.startTime),
              loggingEvent.level.toString(),
              loggingEvent.categoryName,
          ),
          colour,
      );
  }

  /**
   * BasicLayout is a simple layout for storing the logs. The logs are stored
   * in following format:
   * <pre>
   * [startTime] [logLevel] categoryName - message\n
   * </pre>
   *
   * @param loggingEvent
   * @author Stephan Strittmatter
   */
  static basicLayout(loggingEvent) {
      return FormatsService.timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data);
  }

  /**
   * colouredLayout - taken from masylum's fork.
   * same as basicLayout, but with colours.
   *
   * @param loggingEvent
   */
  static colouredLayout(loggingEvent) {
      return FormatsService.timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util.format(...loggingEvent.data);
  }

  /**
   * @param loggingEvent
   * @returns {* | String}
   */
  static messagePassThroughLayout(loggingEvent) {
      return util.format(...loggingEvent.data);
  }

  /**
   * @param loggingEvent
   * @returns {*}
   */
  static dummyLayout(loggingEvent) {
      return loggingEvent.data[0];
  }

  /**
   * PatternLayout
   * Format for specifiers is %[padding].[truncation][field]{[format]}
   * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
   * both padding and truncation can be negative.
   * Negative truncation = trunc from end of string
   * Positive truncation = trunc from start of string
   * Negative padding = pad right
   * Positive padding = pad left
   *
   * Fields can be any of:
   *  - %r time in toLocaleTimeString format
   *  - %p log level
   *  - %c log category
   *  - %h hostname
   *  - %m log data
   *  - %d date in constious formats
   *  - %% %
   *  - %n newline
   *  - %z pid
   *  - %f filename
   *  - %l line number
   *  - %o column postion
   *  - %s call stack
   *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
   *  - %X{<tokenname>} add dynamic tokens to your log. Tokens are specified in logger context
   * You can use %[ and %] to define a colored block.
   *
   * Tokens are specified as simple key:value objects.
   * The key represents the token name whereas the value can be a string or function
   * which is called to extract the value to put in the log message. If token is not
   * found, it doesn't replace the field.
   *
   * A sample token would be: { 'pid' : function() { return process.pid; } }
   *
   * Takes a pattern string, array of tokens and returns a layout function.
   *
   * @return {Function}
   * @param pattern
   * @param tokens
   * @param timezoneOffset
   *
   * @authors ['Stephan Strittmatter', 'Jan Schmidle']
   */
  static patternLayout(pattern, tokens) {
      const TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n';
      const regex = /%(-?\d+)?(\.?-?\d+)?([%X[\]cdfhl-prsx-z])({([^}]+)})?|([^%]+)/;

      pattern = pattern || TTCC_CONVERSION_PATTERN;

      /**
       * @param loggingEvent
       * @param specifier
       */
      function categoryName(loggingEvent, specifier) {
          let loggerName = loggingEvent.categoryName;
          if (specifier) {
              const precision = parseInt(specifier, 10);
              const loggerNameBits = loggerName.split('.');
              if (precision < loggerNameBits.length) {
                  loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join('.');
              }
          }
          return loggerName;
      }

      /**
       * @param loggingEvent
       * @param specifier
       */
      function formatAsDate(loggingEvent, specifier) {
          let format = dateFormat.ISO8601_FORMAT;
          if (specifier) {
              format = specifier;
              // Pick up special cases
              if (format === 'ISO8601') {
                  format = dateFormat.ISO8601_FORMAT;
              } else if (format === 'ISO8601_WITH_TZ_OFFSET') {
                  format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
              } else if (format === 'ABSOLUTE') {
                  format = dateFormat.ABSOLUTETIME_FORMAT;
              } else if (format === 'DATE') {
                  format = dateFormat.DATETIME_FORMAT;
              }
          }
          // Format the date
          return dateFormat.asString(format, loggingEvent.startTime);
      }

      /**
       *
       */
      function hostname() {
          return os.hostname().toString();
      }

      /**
       * @param loggingEvent
       */
      function formatMessage(loggingEvent) {
          return util.format(...loggingEvent.data);
      }

      /**
       *
       */
      function endOfLine() {
          return os.EOL;
      }

      /**
       * @param loggingEvent
       */
      function logLevel(loggingEvent) {
          return loggingEvent.level.toString();
      }

      /**
       * @param loggingEvent
       */
      function startTime(loggingEvent) {
          return dateFormat.asString('hh:mm:ss', loggingEvent.startTime);
      }

      /**
       * @param loggingEvent
       */
      function startColour(loggingEvent) {
          return colorizeStart(loggingEvent.level.colour);
      }

      /**
       * @param loggingEvent
       */
      function endColour(loggingEvent) {
          return colorizeEnd(loggingEvent.level.colour);
      }

      /**
       *
       */
      function percent() {
          return '%';
      }

      /**
       * @param loggingEvent
       */
      function pid(loggingEvent) {
          return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
      }

      /**
       *
       */
      function clusterInfo() {
      // this used to try to return the master and worker pids,
      // but it would never have worked because master pid is not available to workers
      // leaving this here to maintain compatibility for patterns
          return pid();
      }

      /**
       * @param loggingEvent
       * @param specifier
       */
      function userDefined(loggingEvent, specifier) {
          if (typeof tokens[specifier] !== 'undefined') {
              return typeof tokens[specifier] === 'function' ? tokens[specifier](loggingEvent) : tokens[specifier];
          }

          return null;
      }

      /**
       * @param loggingEvent
       * @param specifier
       */
      function contextDefined(loggingEvent, specifier) {
          const resolver = loggingEvent.context[specifier];

          if (typeof resolver !== 'undefined') {
              return typeof resolver === 'function' ? resolver(loggingEvent) : resolver;
          }

          return null;
      }

      /**
       * @param loggingEvent
       * @param specifier
       */
      function fileName(loggingEvent, specifier) {
          let filename = loggingEvent.fileName || '';
          if (specifier) {
              const fileDepth = parseInt(specifier, 10);
              const fileList = filename.split(path.sep);
              if (fileList.length > fileDepth) {
                  filename = fileList.slice(-fileDepth).join(path.sep);
              }
          }

          return filename;
      }

      /**
       * @param loggingEvent
       */
      function lineNumber(loggingEvent) {
          return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : '';
      }

      /**
       * @param loggingEvent
       */
      function columnNumber(loggingEvent) {
          return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : '';
      }

      /**
       * @param loggingEvent
       */
      function callStack(loggingEvent) {
          return loggingEvent.callStack || '';
      }

      /* eslint quote-props:0 */
      const replacers = {
          c: categoryName,
          d: formatAsDate,
          h: hostname,
          m: formatMessage,
          n: endOfLine,
          p: logLevel,
          r: startTime,
          '[': startColour,
          ']': endColour,
          y: clusterInfo,
          z: pid,
          '%': percent,
          x: userDefined,
          X: contextDefined,
          f: fileName,
          l: lineNumber,
          o: columnNumber,
          s: callStack,
      };

      /**
       * @param conversionCharacter
       * @param loggingEvent
       * @param specifier
       */
      function replaceToken(conversionCharacter, loggingEvent, specifier) {
          return replacers[conversionCharacter](loggingEvent, specifier);
      }

      /**
       * @param truncation
       * @param toTruncate
       */
      function truncate(truncation, toTruncate) {
          let len;
          if (truncation) {
              len = parseInt(truncation.substr(1), 10);
              // negative truncate length means truncate from end of string
              return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
          }

          return toTruncate;
      }

      /**
       * @param padding
       * @param toPad
       */
      function pad(padding, toPad) {
          let len;
          if (padding) {
              if (padding.charAt(0) === '-') {
                  len = parseInt(padding.substr(1), 10);
                  // Right pad with spaces
                  while (toPad.length < len) {
                      toPad += ' ';
                  }
              } else {
                  len = parseInt(padding, 10);
                  // Left pad with spaces
                  while (toPad.length < len) {
                      toPad = ` ${toPad}`;
                  }
              }
          }
          return toPad;
      }

      /**
       * @param toTruncAndPad
       * @param truncation
       * @param padding
       */
      function truncateAndPad(toTruncAndPad, truncation, padding) {
          let replacement = toTruncAndPad;
          replacement = truncate(truncation, replacement);
          replacement = pad(padding, replacement);
          return replacement;
      }

      return function (loggingEvent) {
          let formattedString = '';
          let result;
          let searchString = pattern;

          /* eslint no-cond-assign:0 */
          while ((result = regex.exec(searchString)) !== null) {
              // const matchedString = result[0];
              const padding = result[1];
              const truncation = result[2];
              const conversionCharacter = result[3];
              const specifier = result[5];
              const text = result[6];

              // Check if the pattern matched was just normal text
              if (text) {
                  formattedString += text.toString();
              } else {
                  // Create a raw replacement string based on the conversion
                  // character and specifier
                  const replacement = replaceToken(conversionCharacter, loggingEvent, specifier);
                  formattedString += truncateAndPad(replacement, truncation, padding);
              }
              searchString = searchString.substr(result.index + result[0].length);
          }
          return formattedString;
      };
  }

  static layoutMakers = {
      messagePassThrough () {
          return FormatsService.messagePassThroughLayout;
      },
      basic () {
          return FormatsService.basicLayout;
      },
      colored () {
          return FormatsService.colouredLayout;
      },
      coloured () {
          return FormatsService.colouredLayout;
      },
      pattern (config) {
          return FormatsService.patternLayout(config && config.pattern, config && config.tokens);
      },
      dummy () {
          return FormatsService.dummyLayout;
      },
  };

  /**
   * @param name
   * @param serializerGenerator
   */
  static addLayout (name, serializerGenerator) {
      FormatsService.layoutMakers[name] = serializerGenerator;
  }
  
  /**
   * @param name
   * @param config
   * @returns {*}
   */
  static layout (name, config) {
      return FormatsService.layoutMakers[name] && FormatsService.layoutMakers[name](config);
  }
}


export {FormatsService};