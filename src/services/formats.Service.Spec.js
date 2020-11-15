'use strict';

import chai from 'chai';

import {FormatsService} from './formats.Service.js';
let expect = chai.expect;

describe('FormatsService', () => {
    describe('-> layout', () => {
        it('should layout a simple message', () => {

            /** @type {BaseMessageOptions} */
            let initial = {
                data: ['nonsense', 'bla'],
                startTime: new Date(2010, 11, 5, 14, 18, 30, 45),
                categoryName: 'cheese',
                level: {
                    toString() {
                        return 'ERROR';
                    },
                    colour: 'red',
                },
            };

            let expected = '[isSomething]: somePath = 3 {number}';

            let actual = FormatsService.layout('basic')(initial);
      
            expect(actual).to.be.equal(expected);
        });
    });
});