var assert = require('assert');
const plunder = require('../plunder');
const fs = require('fs');
const example = fs.readFileSync(__dirname + '/example_data/uber.json');
const j = JSON.parse(example);

describe('Api', function(){
  
  describe('#tags()', function(){
    it('Should return the components of the tags object.', function(){
      assert.deepEqual([], plunder.api.tags(j)); 
    });  
  });  

  describe('#paths()', function(){
    it('Should return the components of the paths object.', function(){
      assert.deepEqual([{key: "/products", value: j.paths["/products"]}, {key: "/estimates/price", value: j.paths["/estimates/price"]}, {key: "/estimates/time", value: j.paths["/estimates/time"]}, {key: "/me", value: j.paths["/me"]}, {key: "/history", value: j.paths["/history"]}], plunder.api.paths(j));  
    });  
  });

  describe('#definitions()', function(){
    it('Should return the components of the definitions object.', function(){
      assert.deepEqual([{key: "Product", value: j.definitions.Product}, {key: "PriceEstimate", value: j.definitions.PriceEstimate}, {key: "Profile", value: j.definitions.Profile}, {key: "Activity", value: j.definitions.Activity}, {key: "Activities", value: j.definitions.Activities}, {key: "Error", value: j.definitions.Error}], plunder.api.definitions(j));  
    });  
  });



});
