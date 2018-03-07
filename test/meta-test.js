var assert = require('assert');
const plunder = require('../plunder');
const fs = require('fs');
const example = fs.readFileSync(__dirname + '/example_data/uber.json');
const j = JSON.parse(example);

describe('Meta', function(){
  
  describe('#keys()', function(){
    it('Should return the keys of the json object.', function(){
      assert.deepEqual(Object.keys(j), plunder.meta.keys(j)); 
    }); 
  });

  describe('#values()', function(){
    it('Should return the values of the json object in an array.', function(){
      assert.deepEqual(Object.keys(j).map(x => j[x]), plunder.meta.values(j))  
    });  
  });

  describe('#parts()', function(){
    it('Should return an array of parts of a json object corresponding to keys that satisfy a given predicate.', function(){
      assert.deepEqual([{key: "info", value: j['info']}], plunder.meta.parts(j, x => x === 'info'));
    }); 
  });

  describe('#components()', function(){
    it('Should return the parts of the json that are structures.', function(){
      assert.deepEqual([{key: 'info', value: j.info},{key: 'schemes', value: j.schemes}, {key: 'produces', value: j.produces}, {key: 'paths', value: j.paths}, {key: 'definitions', value: j.definitions}], plunder.meta.components(j));  
    });   
  });

  describe('#objects()', function(){
    it('Should return only the objects of the json object.', function(){
      assert.deepEqual([{key: 'info', value: j.info}, {key: 'paths', value: j.paths}, {key: 'definitions', value: j.definitions}], plunder.meta.objects(j));
    });  
  });

  describe('#simples()', function(){
    it('Should return only primitives of the json object.', function(){
      assert.deepEqual([{key: "swagger", value: "2.0"}, {key: 'host', value: 'api.uber.com'}, {key: 'basePath', value: '/v1'}], plunder.meta.simples(j)); 
    });  
  });

  describe('#info()', function(){
    it('Should return metadata about the json object.', function(){
      assert.deepEqual({keys: Object.keys(j), count: Object.keys(j).length, components: {count: [{key: 'info', value: j.info},{key: 'schemes', value: j.schemes}, {key: 'produces', value: j.produces}, {key: 'paths', value: j.paths}, {key: 'definitions', value: j.definitions}].length, contents: [{key: 'info', value: j.info},{key: 'schemes', value: j.schemes}, {key: 'produces', value: j.produces}, {key: 'paths', value: j.paths}, {key: 'definitions', value: j.definitions}]}, simples: {count: [{key: "swagger", value: "2.0"}, {key: 'host', value: 'api.uber.com'}, {key: 'basePath', value: '/v1'}].length, contents: [{key: "swagger", value: "2.0"}, {key: 'host', value: 'api.uber.com'}, {key: 'basePath', value: '/v1'}]}}, plunder.meta.info(j))  
    }); 
  });

});
