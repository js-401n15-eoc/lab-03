'use strict';

const Validator = require('../lib/validator.js');
const valObj = new Validator();
const reader = require('../lib/reader.js');
var lolex = require('lolex');
var clock = lolex.createClock();

describe('reader', () => {
  const personRules = {
    fields: {
      firstName: { typing: 'string', required: true },
      lastName: { typing: 'string', required: true },
      hair: {
        typing: 'object', required: true,
        type: { typing: 'string', required: true },
        color: { typing: 'string', required: true },
      },
      favoriteFoods: { typing: 'array', valueType: 'string' },
      married: { typing: 'boolean', required: true },
      kids: { typing: 'number', required: true },
    },
  };

  const goodPath = `${__dirname}/files/data/person.json`;
  const badFile = `${__dirname}/files/data/person.exe`;
  const badPath = `abcd!`;

  it('can return a valid JSON object when given a proper file path and type', () => {
    reader.mockReaderWithCallback(goodPath, (err, data) => {
      if (err) { throw err; }
      expect(valObj.isValid(data, personRules)).toBeTruthy();
    });
  });

  it('throws an error for an invalid file path', () => {
    reader.mockReaderWithCallback(badPath, (err, data) => {
      clock.setTimeout(() => {
        expect(err).toBeTruthy();
        expect(err).toEqual('Invalid Directory');
        expect(data).toBeFalsy();
      }, 1000);
    });
  });

  it('throws an error for an invalid file type', () => {
    reader.mockReaderWithCallback(badFile, (err, data) => {
      expect(err).toBeTruthy();
      expect(err).toEqual('Invalid File');
      expect(data).toBeFalsy();
    });
  });
});
