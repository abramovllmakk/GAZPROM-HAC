import {createAsset as createSavedAsset,metadata as savedMetadata} from './saved-asset.mjs';
import {attachProcedural} from './procedural.mjs';
import * as program from './steel-shelf.mjs';
import {specification,parameterSchema} from './parameters.mjs';
export {orientation,availableStates} from './saved-asset.mjs';export {parameterSchema};
export const metadata=Object.freeze({...savedMetadata,parameterAPI:'updateParams',parameterSchema,runtime:'threejs-browser',parametricMethod:'Original shelf layout, bounded cuboid bevels and height-dependent slots in both flanges of four angle posts',capabilities:[...(savedMetadata.capabilities??[]),'browser_parameters'],limitations:['Existing UV/PBR maps are retained; Blender procedural materials are not regenerated.']});
export async function createAsset(THREE,options={}){const root=await createSavedAsset(THREE,{...options,states:'lazy'});try{await attachProcedural(THREE,root,specification,new URL('./',import.meta.url),program,options.params??{});root.userData.asset=metadata;return root;}catch(e){await root.dispose();throw e;}}
export default createAsset;
