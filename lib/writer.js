'use strict';

//const fs = require('../files/__mocks__/fs.js');
const fs = require('fs');

const writerWithCallback = (file, obj, callback) => {
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