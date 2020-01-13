'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( file.match(/bad/i) ) {
    cb('Invalid File');
  }
  else {
    const obj = {"firstName":"Edward","lastName":"Scissorhands","hair":{"type":"wavy","color":"brown"},"favoriteFoods":["pizza","cupcakes","children"],"married":false,"kids":0};
    cb(undefined, obj);
  }
};

exports.writeFile = (object, cb) => {
  
}