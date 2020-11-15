'use strict';

/** @typedef {String} LogFormat */

/**
 *
 * @classdesc Wrapper class that offers a collection of Logging message formats {@link LogFormat}.
 * @author Robert Dumitrescu (LinkedIn: https://www.linkedin.com/in/robertdumitrescu/) (Github: https://github.com/robertdumitrescu)
 * @date 2020-04-07
 * @class FormatsEnum
 */
class FormatsEnum {
  /**
   * @description If this is passed, the logs will not be serialized or altered and it will be pushed directly into the logs array
   * @static
   * @type {LogFormat}
   * @memberof FormatsEnum
   */
  static pass = 'pass';

  /**
   * @description If this is passed, a full path signature will be returned
   * @static
   * @type {LogFormat}
   * @memberof FormatsEnum
   */
  static basic = 'basic';

  /**
   * @description If this is passed, an exploded path will be returned
   * @static
   * @type {LogFormat}
   * @memberof FormatsEnum
   */
  static colored = 'colored';
}

export {FormatsEnum};