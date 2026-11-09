"""Five-tier open wood-and-steel storage shelf, modeled from the supplied reference."""
import argparse
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

ASSET_ID = "01-L1-0255"
OWNER = "_steel_wood_shelf_owner"
STUDIO = "_steel_wood_shelf_studio"
STATES = []
PARAMS = {
    "width": (1.10, 0.88, 1.30, "overall shelf width in metres"),
    "depth": (0.46, 0.36, 0.55, "overall shelf depth in metres"),
    "height": (1.78, 1.50, 2.05, "overall rack height in metres"),
    "post_width": (0.027, 0.022, 0.034, "width of each slotted angle-steel upright"),
    "shelf_lip": (0.029, 0.023, 0.037, "depth of steel apron below each shelf"),
    "board_thickness": (0.016, 0.012, 0.023, "thickness of the wood decking"),
    "bottom_height": (0.105, 0.075, 0.145, "height of the bottom wood shelf"),
    "edge_bevel": (0.0014, 0.0007, 0.0025, "small manufactured edge break"),
}


def own(block):
    block[OWNER] = ASSET_ID
    return block


def clear_owned():
    for obj in list(bpy.data.objects):
        if obj.get(OWNER) == ASSET_ID or obj.get(STUDIO) == ASSET_ID:
            bpy.data.objects.remove(obj, do_unlink=True)
    for data in list(bpy.data.meshes):
        if data.get(OWNER) == ASSET_ID and data.users == 0:
            bpy.data.meshes.remove(data)
    for data in list(bpy.data.materials):
        if data.get(OWNER) == ASSET_ID and data.users == 0:
            bpy.data.materials.remove(data)


def material(slot, color, metallic, roughness):
    mat = own(bpy.data.materials.new("slot:" + slot))
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    return mat


def box_mesh_part(vertices, faces, cx, cy, cz, sx, sy, sz):
    """Append one closed cuboid to a single purpose-made part mesh."""
    x0, x1 = cx-sx/2, cx+sx/2
    y0, y1 = cy-sy/2, cy+sy/2
    z0, z1 = cz-sz/2, cz+sz/2
    base = len(vertices)
    vertices.extend(((x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),
                     (x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)))
    faces.extend(tuple(base+i for i in face) for face in
                 ((0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),
                  (2,3,7,6),(3,0,4,7)))


def mesh_part(root, name, boxes, mat, bevel=0):
    vertices, faces = [], []
    for spec in boxes:
        box_mesh_part(vertices, faces, *spec)
    mesh = own(bpy.data.meshes.new(ASSET_ID + ":" + name + ":mesh"))
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    mesh.materials.append(mat)
    obj = own(bpy.data.objects.new(ASSET_ID + ":" + name, mesh))
    bpy.context.scene.collection.objects.link(obj)
    obj.parent = root
    if bevel:
        mod = obj.modifiers.new("Manufactured edge radius", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        normal = obj.modifiers.new("Face normals", "WEIGHTED_NORMAL")
        normal.keep_sharp = True
    return obj


def cube(root, name, location, dimensions, mat, bevel=0.001):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = own(bpy.context.object)
    obj.name = ASSET_ID + ":" + name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    own(obj.data)
    obj.parent = root
    obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new("Manufactured edge radius", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        normal = obj.modifiers.new("Face normals", "WEIGHTED_NORMAL")
        normal.keep_sharp = True
    return obj


def upright(root, label, x, y, sign_x, sign_y, width, depth, height, steel, bevel):
    """Angle post with real rectangular slots through its front flange."""
    profile = width
    thickness = 0.0028
    slot_width = 0.0065
    slot_height = 0.018
    pitch = 0.038
    # Front flange faces the viewer (-Y). Its narrow central opening repeats
    # over the full height, while the return flange gives a credible L section.
    front_y = y - profile * 0.28
    boxes = []
    side_width = (profile-slot_width)/2
    for side in (-1, 1):
        boxes.append((x + side*(slot_width+side_width)/2, front_y, height/2,
                      side_width, thickness, height))
    nslots = int((height-0.055)/pitch)
    start_z = (height-(nslots-1)*pitch)/2
    last_top = 0.0
    for i in range(nslots):
        hole_z = start_z + i*pitch
        bridge_end = hole_z-slot_height/2
        if bridge_end > last_top:
            boxes.append((x, front_y, (last_top+bridge_end)/2,
                          slot_width, thickness, bridge_end-last_top))
        last_top = hole_z+slot_height/2
    if last_top < height:
        boxes.append((x, front_y, (last_top+height)/2,
                      slot_width, thickness, height-last_top))
    # The return flange is punched too: its outer face is what the angled hero
    # view sees on the near-right upright. Both faces remain real openings.
    side_x = x + sign_x*(profile/2-thickness/2)
    side_y = y + sign_y*profile*0.30
    side_span = profile*0.85
    side_rail = (side_span-slot_width)/2
    for side in (-1, 1):
        boxes.append((side_x, side_y+side*(slot_width+side_rail)/2, height/2,
                      thickness, side_rail, height))
    last_top = 0.0
    for i in range(nslots):
        hole_z = start_z+i*pitch
        bridge_end = hole_z-slot_height/2
        if bridge_end > last_top:
            boxes.append((side_x, side_y, (last_top+bridge_end)/2,
                          thickness, slot_width, bridge_end-last_top))
        last_top = hole_z+slot_height/2
    if last_top < height:
        boxes.append((side_x, side_y, (last_top+height)/2,
                      thickness, slot_width, height-last_top))
    mesh_part(root, label+"_perforated_angle_post", boxes, steel, min(bevel, 0.0006))


def shelf(root, level, z, w, d, p, steel, wood, fastener):
    pw = p["post_width"]
    lip = p["shelf_lip"]
    edge = p["edge_bevel"]
    # Continuous four-sided steel support ring, plus inset rails beneath the wood.
    side_x, side_y = w/2-pw*0.65, d/2-pw*0.65
    ring_thick = 0.009
    zring = z - p["board_thickness"]/2 - lip/2 + 0.001
    cube(root, f"tier_{level}_front_steel_apron", (0,-side_y,zring),
         (w-0.018,ring_thick,lip), steel, edge)
    cube(root, f"tier_{level}_rear_steel_apron", (0,side_y,zring),
         (w-0.018,ring_thick,lip), steel, edge)
    for sign, name in ((-1,"left"),(1,"right")):
        cube(root, f"tier_{level}_{name}_steel_apron", (sign*side_x,0,zring),
             (ring_thick,d-0.018,lip), steel, edge)
    # Three long wood boards provide the visible warm surface and real seams.
    inner_w = w-2*pw-0.025
    inner_d = d-2*pw-0.024
    seam = 0.0035
    board_depth = (inner_d-2*seam)/3
    for idx in range(3):
        y = (idx-1)*(board_depth+seam)
        board = cube(root, f"tier_{level}_wood_plank_{idx+1}",
                     (0,y,z-p["board_thickness"]/2),
                     (inner_w,board_depth,p["board_thickness"]), wood,
                     min(edge*1.4,p["board_thickness"]*0.15))
        board["construction"] = "independent timber shelf board"
    # The shelf bears on cross-members; visible bolt heads anchor its corners.
    for sign, name in ((-1,"left"),(1,"right")):
        cube(root, f"tier_{level}_{name}_underrail",
             (sign*(inner_w/2-0.035),0,z-p["board_thickness"]-0.007),
             (0.014,inner_d,0.010), steel, edge)
    for sx, side in ((-1,"left"),(1,"right")):
        for sy, facing in ((-1,"front"),(1,"rear")):
            # Hexagonal bolt head is a real six-sided fastening detail.
            bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=0.0065,
                                                depth=0.0028,
                                                location=(sx*side_x,sy*(side_y-0.0015),zring))
            bolt = own(bpy.context.object)
            bolt.name = ASSET_ID + f":tier_{level}_{side}_{facing}_bolt"
            bolt.rotation_euler[0] = math.pi/2
            bolt.parent = root
            own(bolt.data)
            bolt.data.materials.append(fastener)


def build(params=None):
    p = {key: spec[0] for key, spec in PARAMS.items()}
    for key, value in (params or {}).items():
        if key not in PARAMS or not math.isfinite(float(value)):
            raise ValueError("Unknown or nonfinite parameter: " + str(key))
        value = float(value)
        if not PARAMS[key][1] <= value <= PARAMS[key][2]:
            raise ValueError("Out-of-range parameter: " + key)
        p[key] = value
    clear_owned()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1
    root = own(bpy.data.objects.new(ASSET_ID, None))
    scene.collection.objects.link(root)
    root["asset_id"] = ASSET_ID
    root["origin_note"] = "floor centre, Z up; -Y is the front"
    steel = material("metal", (0.038,0.042,0.047), 0.72, 0.38)
    wood = material("wood", (0.34,0.16,0.065), 0.0, 0.67)
    dark_wood = material("body", (0.075,0.053,0.037), 0.0, 0.60)
    fastener = material("trim", (0.19,0.20,0.21), 0.66, 0.30)
    w,d,h = p["width"],p["depth"],p["height"]
    pw = p["post_width"]
    for sx, side in ((-1,"left"),(1,"right")):
        for sy, front in ((-1,"front"),(1,"rear")):
            upright(root, side+"_"+front, sx*(w/2-pw/2), sy*(d/2-pw/2),
                    sx,sy,pw,d,h,steel,p["edge_bevel"])
    bottom = p["bottom_height"]
    top = h-0.080
    for level in range(5):
        z = bottom+(top-bottom)*level/4
        shelf(root, level+1, z, w, d, p, steel,
              wood if level <= 1 else dark_wood, fastener)
    # Small square protective shoes visibly terminate the four posts at floor.
    for sx, side in ((-1,"left"),(1,"right")):
        for sy, front in ((-1,"front"),(1,"rear")):
            cube(root, side+"_"+front+"_foot_shoe",
                 (sx*(w/2-pw/2),sy*(d/2-pw/2),0.004),
                 (pw*1.08,pw*1.08,0.008), steel, p["edge_bevel"])
    for name, loc in (("floor",(0,0,0)),("top",(0,0,h)),
                      ("shelf",(0,0,bottom)),("grip",(0,-d/2,h*0.52))):
        socket = own(bpy.data.objects.new("socket:"+name,None))
        scene.collection.objects.link(socket)
        socket.parent = root
        socket.location = loc
        socket.empty_display_size = 0.055
    return root


def apply_material(root, slot, mat):
    target = slot if slot.startswith("slot:") else "slot:"+slot
    for obj in root.children_recursive:
        if obj.type == "MESH":
            for i, old in enumerate(obj.data.materials):
                if old and old.name.split(".")[0] == target:
                    obj.data.materials[i] = mat


def render(root, path):
    scene = bpy.context.scene
    owned = {root, *root.children_recursive}
    hidden = [(obj,obj.hide_render) for obj in scene.objects
              if obj not in owned and obj.get(STUDIO) != ASSET_ID]
    try:
        for obj,_ in hidden:
            obj.hide_render = True
        target = Vector((0,0,0.92))
        cam_data = bpy.data.cameras.new(STUDIO+".camera")
        camera = own(bpy.data.objects.new(STUDIO+".camera",cam_data))
        camera[STUDIO] = ASSET_ID
        scene.collection.objects.link(camera)
        camera.location = (2.15,-2.65,2.02)
        camera.rotation_euler = (target-camera.location).to_track_quat("-Z","Y").to_euler()
        cam_data.type = "ORTHO"
        cam_data.ortho_scale = 2.34
        scene.camera = camera
        for name, loc, power, size in (("key",(-2,-2.1,3.5),450,2.0),
                                       ("fill",(2.2,-0.3,2.4),260,2.2),
                                       ("rim",(0.8,2.0,3.2),420,1.5)):
            data = bpy.data.lights.new(STUDIO+"."+name,"AREA")
            light = own(bpy.data.objects.new(STUDIO+"."+name,data))
            light[STUDIO] = ASSET_ID
            scene.collection.objects.link(light)
            light.location = loc
            light.rotation_euler = (target-light.location).to_track_quat("-Z","Y").to_euler()
            data.energy = power
            data.size = size
        bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-0.001))
        ground = own(bpy.context.object)
        ground.name = STUDIO+".ground"
        ground[STUDIO] = ASSET_ID
        ground.data.materials.append(material("studio",(0.70,0.71,0.70),0,0.9))
        scene.world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
        scene.world.use_nodes = True
        scene.world.node_tree.nodes["Background"].inputs[0].default_value = (0.55,0.56,0.56,1)
        scene.world.node_tree.nodes["Background"].inputs[1].default_value = 0.42
        scene.render.engine = "CYCLES"
        scene.cycles.samples = 48
        scene.cycles.use_denoising = True
        scene.render.resolution_x = 900
        scene.render.resolution_y = 900
        scene.render.resolution_percentage = 100
        scene.render.image_settings.file_format = "PNG"
        scene.render.filepath = str(Path(path).resolve())
        bpy.ops.render.render(write_still=True)
    finally:
        for obj,value in hidden:
            obj.hide_render = value


def main():
    argv = sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--output")
    parser.add_argument("--preview")
    for key in PARAMS:
        parser.add_argument("--"+key,type=float)
    args = parser.parse_args(argv)
    values = {key:getattr(args,key) for key in PARAMS if getattr(args,key) is not None}
    root = build(values)
    if args.preview:
        Path(args.preview).parent.mkdir(parents=True,exist_ok=True)
        render(root,args.preview)
    if args.output:
        Path(args.output).parent.mkdir(parents=True,exist_ok=True)
        bpy.ops.wm.save_as_mainfile(filepath=str(Path(args.output).resolve()),compress=True)


if __name__ == "__main__":
    main()
