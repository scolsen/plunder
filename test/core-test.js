var assert = require('assert');
const plunder = require('../plunder');
const fs = require('fs');
const thisdir = __dirname;
const example = thisdir + '/example_data/uber.json'

describe('Core', function(){
  
  describe('#jsonfiles()', function(){
    it('Should return an array of only files with extension json.', function(){
      assert.deepEqual(["one.json", "two.json", "three.json"], plunder.core.jsonfiles(["one.json", "one.html", "two.json", "three.json", "one.php"]));
      assert.deepEqual(["one.json", "two.json", "three.json"], plunder.core.jsonfiles("one.json", "one.html", "two.json", "three.json", "one.php"));  
    });  
  });
 
  describe('#getjson()', function(){
    it('Should return parsed json content from a file.', function(){
      assert.deepEqual(JSON.parse(fs.readFileSync(example)), plunder.core.getjson(example));  
    }); 
  });

});
