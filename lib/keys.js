/* Plunder Keys */

const tarski = require('tarski');

function info(json, ...keys){
  let ks = tarski.reducer.flat(keys);
  if(keys.length === 0) return Object.keys(json).map(x => {
      return {key: x, type: typeof(json[x]), value: json[x]};  
    }); 

  return ks.map(x => {
    if(json[x] === undefined) return {};
    return {key: x, type: typeof(json[x]), value: json[x]};
  });
}

function group(json, ...predicates){
  let ks = Object.keys(json);
  return tarski.list.group(ks, predicates);
}

exports.info = info;
exports.group = group;
