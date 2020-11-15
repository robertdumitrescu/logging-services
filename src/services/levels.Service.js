'use strict';

/**
 * @typedef {Object} LoggerOptions
 * @property {String} propertyName - The property name under which the value is found. By default this is "property"
 * @property {String|undefined} path
 * @property {*} value
 * @property {Boolean|undefined} issuer - The issuer (Validator/Extractor/etc) will be shown if is available
 * @property {Boolean|undefined} path - The path will be shown if is available
 * @property {Boolean|undefined} data - The reason / data will be showed as well
 * */


/**
 * @class Logger
 */
class LevelsService {
  static validColors = ['white', 'grey', 'black', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow'];

  /**
   * converts given String to corresponding Level
   *
   * @param {(Level | String)} sArg -- String value of Level OR Log4js.Level
   * @param {Level} [defaultLevel] -- default Level, if no String representation
   * @return {Level}
   */
  static getLevel(sArg, defaultLevel) {
      if (!sArg) {
          return defaultLevel;
      }

      if (sArg instanceof Level) {
          return sArg;
      }

      // a json-serialised level won't be an instance of Level (see issue #768)
      if (sArg instanceof Object && sArg.levelStr) {
          sArg = sArg.levelStr;
      }

      return Level[sArg.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels) {
      if (customLevels) {
          const levels = Object.keys(customLevels);
          levels.forEach((l) => {
              const levelStr = l.toUpperCase();
              Level[levelStr] = new Level(
                  customLevels[l].value,
                  levelStr,
                  customLevels[l].colour,
              );
              const existingLevelIndex = Level.levels.findIndex(lvl => {return lvl.levelStr === levelStr});
              if (existingLevelIndex > -1) {
                  Level.levels[existingLevelIndex] = Level[levelStr];
              } else {
                  Level.levels.push(Level[levelStr]);
              }
          });
          Level.levels.sort((a, b) => {return a.level - b.level});
      }
  }
}

export {LevelsService};