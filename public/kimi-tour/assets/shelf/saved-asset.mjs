import {orientation} from './orientation.mjs';
export {orientation};
import {openAsset} from './loader.mjs';
// Runtime bundled into every asset.mjs. The application supplies its installed THREE.
// Compressed resources are relative files; serve this entire directory over HTTP(S).
export const metadata = Object.freeze({orientation,"schema":"asset-web-module/1","itemId":"01-L1-0255","name":"Five-Tier Steel and Wood Storage Shelf","defaultState":"default","sourceUpAxis":"Z","units":"metres","geometryEncoding":"float32-le-base64","textureEncoding":"lossless-png","profile":"MESH","unifiedMaterials":{"9a4644fa4dc258ce9cfb33b6a254b16e58029d590850472a3c85ee1a76d7a95b":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"b1cbf8e9176f52c6c8aebeac38874b6b1f0ca7ffc7713f33c78553e7a1f2c568":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"b64cc87e32c531f62a62b1683c72f61ad7b1724ba3f341f217729a0c21884ff0":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"ecfa3c3101116f90e71e11b1bedaa436cdefd5d0790eb3a35d46646713bb5dc1":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"6db1bf891e6b64008920a90e7655b92b7e441746b1d1f454f7833125472ac7f0":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"e1bd098320b64d7536978f8ed5c37b16a3753382533ffcd3c2478a1ded806782":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"916ba6c24171d61787e1988b5f4b75e19e3b8405963c03356723c179f8d17340":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"6bc4fb170ca9b2c948ca694992b053b02d2bc33fdcb3bb6c40a050164436e348":{"finish_id":"metal.unspecified.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.unspecified.satin","canonical_recipe_sha256":"e32b1ab687c7318041590bc7784849259a0b4a2b3dceb6cfea7e6c6055982313","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"d5310114a927dc64ea3a1508ba9f12578913efb6340efc57a988bfece52638dc":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"b57728291763761f26966bddce0c75bef8d7834e926dbd4bfcfd86d433715dfd":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"1857a28f3d85cb910a4f77f75d6b61916dabee54b83d08269d6d7f17b565934e":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"e3b90dd08dad1460d627ac34fd595472caea02d9cac67cac9477d364af1e9eb4":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"d8920563868d11f31ed040ab8006b777a13841750a0a1a114001f8f5c5ddc037":{"finish_id":"metal.steel.satin","family":"metal","recipe_version":"1.0.0","canonical_material_id":"metal.steel.satin","canonical_recipe_sha256":"fcd72807aed16995656a4e5330c9b2a00d3213822695a833d15f78f870d46120","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"f9696d204f88a6b237a0079a645f5bba7353eb64830d8754112f929968e365de":{"finish_id":"wood.generic.warm_brown","family":"wood","recipe_version":"1.0.0","canonical_material_id":"wood.generic.warm_brown","canonical_recipe_sha256":"96fb8f1dab5fd8c8cab32c21ac8e1eee4685fd6b6b7776e04fd390ccc01890ad","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"8368f2fc88a32c19dae02d9b9a5225b4e100e6e76f25bdd06eeaa1bd60cbfee8":{"finish_id":"wood.generic.warm_brown","family":"wood","recipe_version":"1.0.0","canonical_material_id":"wood.generic.warm_brown","canonical_recipe_sha256":"96fb8f1dab5fd8c8cab32c21ac8e1eee4685fd6b6b7776e04fd390ccc01890ad","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"e57103cf4f6a820c5fe61cf61bfd079d589c483687eef4b823037afa355475b7":{"finish_id":"wood.generic.dark_brown","family":"wood","recipe_version":"1.0.0","canonical_material_id":"wood.generic.dark_brown","canonical_recipe_sha256":"f6008ae443a261c4064c0df2add36075e961a503978004b38d56b352c10a696e","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."},"fdffd02458a7244db68ac6a00162795379a86b75d6e504b57af5028d0949b558":{"finish_id":"wood.generic.dark_brown","family":"wood","recipe_version":"1.0.0","canonical_material_id":"wood.generic.dark_brown","canonical_recipe_sha256":"f6008ae443a261c4064c0df2add36075e961a503978004b38d56b352c10a696e","mode":"standard","material_source":"Actual final saved native shader; freshly baked PBR channels."}},"styleV2":{"revision":"deadline-v2-e4c32d610c6ea0e3942c","registry":{"path":null,"sha256":"34ab34e175c99f6ed3d6481b12aac4587d5693161e3452fbc6278dea61d5f985"},"mappingSha256":"4b5e6120dadefc1cf8913438bc6070e8bf8ba75ff8f173723d1e13d6ad8723ad","mode":"standard","sourceStateBlendSha256":{"default":"d5197e7afe197107474fc1bbae648194e0c614dd4ff5010b55e8999a72119dcc"}},"limitations":["Saved states exposed in Web; public parametric generation remains in source/build.py.","Final native PBR channels are finite-resolution UV textures; Cycles and three.js lighting are not pixel-identical.","The native shared library is hash-bound at the registry workspace path."]});
export const availableStates = Object.freeze(["default"]);

export async function createAsset(THREE, options = {}) {
  if (!THREE?.Group || !THREE?.BufferGeometry || !THREE?.MeshPhysicalMaterial)
    throw new TypeError('Pass the three.js namespace to createAsset(THREE, options)');
  const requested = options.state ?? metadata.defaultState;
  const session = await openAsset(THREE, new URL('./', import.meta.url), options);
  const DATA = session.data;
  try {
  if (!DATA.states[requested]) throw new RangeError(`Unknown asset state: ${requested}`);
  const geometries = session.geometries, materials = new Map(), textures = session.textures;
  const floats = session.array;
  const root = new THREE.Group();
  root.name = metadata.name;
  root.userData.asset = metadata;
  root.userData.availableStates = [...availableStates];
  if ((options.upAxis ?? 'Y') === 'Y') root.rotation.x = -Math.PI / 2;
  else if (options.upAxis !== 'Z') throw new RangeError('upAxis must be Y or Z');
  const loadTexture = options.loadTexture ?? ((uri) => new THREE.TextureLoader().loadAsync(uri));
  async function texture(id, color) {
    const key = `${id}:${color}`;
    if (!textures.has(key)) textures.set(key, (async () => {
      const t = await session.loadTexture(session.uri(id), loadTexture);
      t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      t.flipY = true; // native Blender UVs, unlike the glTF convention
      t.wrapS = THREE.ClampToEdgeWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
      // Continuous coverage proof bounds the exact level-zero bilinear footprint.
      t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
      t.needsUpdate = true;
      return t;
    })());
    return textures.get(key);
  }
  async function material(id) {
    if(id===null)return null;
    if (!materials.has(id)) materials.set(id, (async () => {
      const d = DATA.materials[id], p = d.properties;
      const m = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(...p.color), metalness: p.metalness,
        roughness: p.roughness, opacity: p.opacity, transparent: p.transparent,
        ior: p.ior, transmission: p.transmission, clearcoat: p.clearcoat,
        clearcoatRoughness: p.clearcoatRoughness,
        emissive: new THREE.Color(...p.emissive), emissiveIntensity: p.emissiveIntensity,
        specularIntensity: p.specularIntensity, specularColor: new THREE.Color(...p.specularColor),
        sheen: p.sheen ?? 0, sheenColor: new THREE.Color(...(p.sheenColor ?? [1,1,1])),
        sheenRoughness: p.sheenRoughness ?? .5,
        anisotropy: p.anisotropy ?? 0, anisotropyRotation: p.anisotropyRotation ?? 0,
        side: THREE.DoubleSide,
        vertexColors: Boolean(d.vertexColor),
      });
      m.name = d.name; m.userData.blenderMaterial = d.name;
      Object.assign(m.userData, DATA.metadata.unifiedMaterials[id]);
      if (d.vertexColor) m.userData.vertexColorContract = d.vertexColor;
      if (d.vertexColor?.emission_vertex_multiplier) {
        // Three's ordinary vertex color path affects diffuse/alpha only.
        // The native source feeds the same interpolated RGB to emission too.
        m.onBeforeCompile = shader => {
          const token = '#include <emissivemap_fragment>';
          if (shader.fragmentShader.split(token).length !== 2) throw new Error('Unsupported Three emission shader boundary');
          shader.fragmentShader = shader.fragmentShader.replace(token, token + '\n#if defined(USE_COLOR) || defined(USE_COLOR_ALPHA)\n totalEmissiveRadiance *= vColor.rgb;\n#endif\n');
        };
        m.customProgramCacheKey = () => 'native-vertex-rgb-emission-v1';
      }
      for (const [prop, tex] of Object.entries(d.maps))
        m[prop] = await texture(tex, prop === 'map' || prop === 'emissiveMap' || prop === 'specularColorMap');
      return m;
    })());
    return materials.get(id);
  }
  function geometry(id) {
    if (!geometries.has(id)) {
      const d = DATA.geometries[id], g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(floats(d.position), 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(floats(d.normal), 3));
      if (d.color) g.setAttribute('color', new THREE.Float32BufferAttribute(floats(d.color), 4));
      const uv = floats(d.uv);
      if (uv.length) g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      if (d.index) g.setIndex(new THREE.BufferAttribute(floats(d.index), 1));
      for (const [start, count, slot] of d.groups) g.addGroup(start, count, slot);
      g.computeBoundingBox(); g.computeBoundingSphere();
      geometries.set(id, g);
    }
    return geometries.get(id);
  }
  // States are actual saved Blender scenes. Swapping states does not pretend that
  // arbitrary procedural Python parameters are available as JavaScript parameters.
  const stateGroups = new Map();
  const building = new Map();
  let disposed = false;
  async function buildState(name) {
    if (disposed) throw new Error('Asset has been disposed');
    if (stateGroups.has(name)) return;
    await session.prepare(name);
    const state = DATA.states[name];
    await Promise.all([...new Set(state.nodes.flatMap(n => n.materials || []).filter(id => id !== null))].map(material));
    const container = new THREE.Group(); container.name = `state:${name}`;
    const nodes = new Map();
    for (const d of state.nodes) {
      const o = d.geometry
        ? new THREE.Mesh(geometry(d.geometry), await Promise.all(d.materials.map(material)))
        : new THREE.Group();
      o.name = d.name; o.visible = d.visible;
      o.matrix.fromArray(d.matrix); o.matrix.decompose(o.position, o.quaternion, o.scale);
      o.matrixAutoUpdate = false;
      o.userData = {...d.properties, blenderType: d.type, assetNode: d.name};
      o.castShadow = true; o.receiveShadow = true; nodes.set(d.name, o);
    }
    for (const d of state.nodes) (nodes.get(d.parent) ?? container).add(nodes.get(d.name));
    container.visible = name === requested;
    root.add(container); stateGroups.set(name, container);
  }
  async function prepareState(name) {
    if (disposed) throw new Error('Asset has been disposed');
    if (!DATA.states[name]) throw new RangeError(`Unknown asset state: ${name}`);
    if (!building.has(name)) building.set(name, buildState(name).catch(e => {building.delete(name);throw e;}));
    await building.get(name);
    return root;
  }
  for (const name of (options.states === 'lazy' ? [requested] : availableStates)) await prepareState(name);
  root.prepareState = prepareState;
  let switchRequest = 0;
  root.setState = (name) => {
    if (disposed) throw new Error('Asset has been disposed');
    const token = ++switchRequest;
    if (!stateGroups.has(name) && DATA.states[name]) return prepareState(name).then(() => token === switchRequest ? root.setState(name) : root);
    if (!stateGroups.has(name)) throw new RangeError(`Unknown asset state: ${name}`);
    for (const [state, group] of stateGroups) group.visible = state === name;
    root.userData.state = name;
    return root;
  };
  root.getStateObject = (name) => stateGroups.get(root.userData.state).getObjectByName(name);
  root.dispose = async () => {
    if (disposed) return; disposed = true;
    await Promise.allSettled(building.values());
    for (const m of materials.values()) (await m).dispose();
    await session.release();
  };
  root.setState(requested); root.updateMatrixWorld(true);
  return root;
  } catch (error) { await session.release(); throw error; }
}

export default createAsset;
