var assert = require('assert');
const plunder = require('../plunder');
const fs = require('fs');
const example = fs.readFileSync(__dirname + "/example_data/uber.json");
const j = JSON.parse(example);

describe("Keys", function(){
  
  describe('#info()', function(){
    it('Should return information about select keys in the proivded json.', function(){
        assert.deepEqual([{key: "info", type: "object", value: j.info}], plunder.keys.info(j, "info")); 
    }); 
    it('Should return information about all keys in the provided json.', function(){
      assert.deepEqual([{key: "swagger", type: "string", value: j.swagger},{key: "info", type: "object", value: j.info},{key: "host", type: "string", value: j.host},{key: "schemes", type: "object", value: j.schemes},{key: "basePath", type: "string", value: j.basePath},{key: "produces", type: "object", value: j.produces}, {key: "paths", type: "object", value: j.paths}, {key: "definitions", type: "object", value: j.definitions}], plunder.keys.info(j));  
    })
  });

  describe('#group()', function(){
    it('Should group keys based on predicates', function(){
      assert.deepEqual([["info", "schemes", "produces", "paths", "definitions"],["swagger", "host", "basePath", ]], plunder.keys.group(j, x => typeof j[x] === "object", x => typeof j[x] !== "object")); 
    });  
  });

  describe('#search()', function(){
    it('Should search the json top level for provided keys and return a partition of labeled results.', function(){
      assert.deepEqual({found: ["info", "paths"], not_found: ["boo"]}, plunder.keys.search(j, "info", "paths", "boo"));  
    });  
  });

  describe('#expunge()', function(){
    it('Should return an object with keys found in the original json removed.', function(){
      assert.deepEqual({"swagger": "2.0"}, plunder.keys.expunge(j, "info", "host", "schemes", "basePath", "produces", "paths", "definitions"));  
    }); 
  });

});
