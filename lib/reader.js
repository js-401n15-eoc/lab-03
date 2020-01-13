'use strict';

const mockFs = require('../files/__mocks__/fs.js');
const fs = require('fs');

const readerWithCallback = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      callback(err);
    } else {
      const jsonObj = JSON.parse(data);
      callback(undefined, jsonObj);
    }
  });
};

const mockReaderWithCallback = (file, callback) => {
  mockFs.readFile(file, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(undefined, data);
    }
  });
};

module.exports = { readerWithCallback, mockReaderWithCallback };