'use strict';

const mockFs = require('../files/__mocks__/fs.js');
const fs = require('fs');
const Validator = require('../lib/validator.js');
const valObj = new Validator();

const writerWithCallback = (file, obj, rules, callback) => {
    if (!valObj.isValid(obj, rules)) { callback('Invalid Object'); }
    obj.married =  obj.married ? false : true;
    const jsonString = JSON.stringify(obj);
    fs.writeFile(file, jsonString, (err, data) => {
        if (err) { callback(err); }
        else { 
            data = obj;
            callback(undefined, data);
        }
    });
};

module.exports = { writerWithCallback };