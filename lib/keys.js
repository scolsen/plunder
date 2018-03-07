/* Plunder Keys */

function info (json, ...keys){
  let ks = flatOf(keys);

  return ks.map(x => {
    if(json[x] === undefined) return {};
    return {key: x, type: typeof(json[x]), value: json[x]};
  });
}

function filtered (json, ...predicates){
  let ks = Object.keys(json);
  group(ks, predicates);
}


