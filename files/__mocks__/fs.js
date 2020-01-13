'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if (file.includes('!')) {
    cb('Invalid Directory');
  }

  if(file.match(/bad/i) || !file.includes('person.json')) {
    cb('Invalid File');
  }
  
  else {
    const obj = {'firstName':'Edward','lastName':'Scissorhands','hair':{'type':'wavy','color':'brown'},'favoriteFoods':['pizza','cupcakes','children'],'married':false,'kids':0};
    cb(undefined, obj);
  }
};

exports.writeFile = (file, string, cb) => {
  if (file.includes('!')) {
    cb('Invalid Directory');
  }

  if(file.match(/bad/i) || !file.includes('person.json')) {
    cb('Invalid File');
  }

  else {
    cb(undefined, JSON.parse(string));
  }
};