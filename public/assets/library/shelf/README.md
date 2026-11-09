# 01-L1-0255 — browser parametric steel and wood shelf

Import source/asset.mjs, inspect parameterSchema and expose all eight controls.
Call await asset.updateParams(patch), then refresh asset.getParams(). The runtime
rebuilds five shelf levels, three wood planks per level, steel aprons, underrails,
bolts, protective shoes and four placement sockets. Height automatically changes
the actual slots in both flanges of all four L-angle posts:
slotsPerFlange = floor((height - 0.055) / 0.038), giving 38–52 slots in range.
Each aperture remains an opening; this is not texture repetition or root scaling.
Post edge radius stays 0.0006 m under the native clamp; other edges follow
edge_bevel, and wood edges obey min(edge_bevel * 1.4, board_thickness * 0.15).

Original saved PBR textures, split normals and per-component UV regions are
retained. Added post bridges reuse corresponding original atlas regions. Blender
procedural materials are not rebaked. All geometry and material resources belong
to the asset instance. source/controls.mjs supplies a ready-made control panel;
examples/index.html runs over HTTP(S) with bundled Three.js. getParams,
updateParams, resetParams, setState, getStateObject and dispose are supported.
The original source is unchanged at source/native/build.py. Finite-sample
acceptance is 0.5 mm maximum, with a 0.3 mm baseline gate; see verification.json.
