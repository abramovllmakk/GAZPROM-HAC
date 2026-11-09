import {deformNormals} from './parametric.mjs';
export async function attachProcedural(THREE,root,spec,base,program,initial={}){
 const response=await fetch(new URL('construction.json.gz',base));if(!response.ok)throw new Error(`Construction resource ${response.status}`);
 const data=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
 const schema=spec.parameterSchema,defaults=Object.fromEntries(Object.entries(schema).map(([k,d])=>[k,d.default]));
 const savedDispose=root.dispose.bind(root),savedGroups=[...root.children],templates=new Map();root.updateMatrixWorld(true);const inv=root.matrixWorld.clone().invert();
 for(const g of savedGroups)g.traverse(o=>{if(o.isMesh)templates.set(o.name,{object:o,matrix:new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld)});});
 let live,committed,desired,state=root.userData.state,disposed=false,token=0;const pending=new Set();
 function validate(patch,current){
  for(const[k,v]of Object.entries(patch)){
   const d=schema[k];if(!d)throw new RangeError(`Unknown parameter: ${k}`);
   if(d.enum?!d.enum.includes(v):typeof v!=='number'||!Number.isFinite(v)||v<d.min-1e-10||v>d.max+1e-10||(d.type==='integer'&&!Number.isInteger(v)))throw new RangeError(`Invalid ${k}: ${v}`);
  }
  const p=program.effectiveParams(patch,current);
  for(const[k,d]of Object.entries(schema))if(!d.enum&&(p[k]<d.min-1e-9||p[k]>d.max+1e-9||!Number.isFinite(p[k])))throw new RangeError(`Infeasible parameter combination: ${k}`);
  return p;
 }
 function free(g){if(!g)return;g.traverse(o=>{if(o.isMesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m?.dispose();}});g.removeFromParent();}
 function build(p){
  const group=new THREE.Group();group.name=`parameters:${state}`;const groups=new Map();
  try{
   for(const part of program.construct(p)){
    if(part.group){const node=new THREE.Group();node.name=part.name;if(part.location)node.position.fromArray(part.location);if(part.rotation)node.rotation.set(...part.rotation,'ZYX');group.add(node);groups.set(part.name,node);continue;}
    if(part.socket){const o=new THREE.Group();o.name=part.name;o.position.fromArray(part.location);if(part.rotation)o.rotation.set(...part.rotation);group.add(o);continue;}
    const t=templates.get(part.template),ref=data.parts[part.template];if(!t||!ref)throw new Error(`Missing construction template ${part.template}`);
    const old=t.object;let g;
    if(part.generatedGeometry){g=program.createGeometry(THREE,part,ref,data);g.computeBoundingBox();g.computeBoundingSphere();}
    else{
    g=old.geometry.clone();g.applyMatrix4(t.matrix);const before=g.attributes.position.array.slice(),positions=program.evaluatePart(THREE,part,ref,data);
    if(positions.length!==before.length)throw new Error(`Geometry topology mismatch ${part.name}`);
    g.attributes.position.array.set(positions);g.attributes.position.needsUpdate=true;deformNormals(THREE,g,before);const indices=program.triangles?.(THREE,part,ref,positions);if(indices){g.setIndex(indices);g.clearGroups();if(Array.isArray(old.material)){if(old.material.length!==1)throw new Error("Retriangulation needs explicit material groups");g.addGroup(0,indices.length,0);}}g.computeBoundingBox();g.computeBoundingSphere();
    }
    const material=Array.isArray(old.material)?old.material.map(m=>m?.clone()):old.material.clone();program.updateMaterial?.(material,part,p);const mesh=new THREE.Mesh(g,material);mesh.name=part.name;mesh.userData={...old.userData,assetNode:part.name};mesh.castShadow=old.castShadow;mesh.receiveShadow=old.receiveShadow;(part.parent?groups.get(part.parent):group).add(mesh);
   }
   return group;
  }catch(e){free(group);throw e;}
 }
 function submit(p){
  if(disposed)throw new Error('Asset has been disposed');desired={...p};const request=++token;
  const job=(async()=>{await Promise.resolve();if(disposed||request!==token)return root;const next=build(p);if(disposed||request!==token){free(next);return root;}for(const g of savedGroups)g.visible=false;free(live);live=next;root.add(next);committed={...p};root.userData.params={...p};root.updateMatrixWorld(true);return root;})().catch(e=>{if(request===token)desired={...committed};throw e;});pending.add(job);job.finally(()=>pending.delete(job)).catch(()=>{});return job;
 }
 root.getParameterRanges=()=>program.ranges?program.ranges(committed):{};root.parameterSchema=schema;root.getParams=()=>({...committed});root.updateParams=patch=>submit(validate(patch,desired));root.resetParams=()=>submit(validate({},defaults));
 root.setState=name=>{if(!spec.availableStates.includes(name))throw new RangeError(`Unknown state: ${name}`);state=name;root.userData.state=name;return submit(desired);};
 root.getStateObject=name=>live?.getObjectByName(name);root.dispose=async()=>{if(disposed)return;disposed=true;++token;await Promise.allSettled([...pending]);free(live);await savedDispose();};
 await submit(validate(initial,defaults));return root;
}
