export const effectiveParams=(patch,current)=>({...current,...patch});
const ID='01-L1-0255:';
export function construct(p){const parts=[],w=p.width,d=p.depth,h=p.height,pw=p.post_width,edge=p.edge_bevel;
 const cube=(name,center,dimensions,bevel=edge)=>parts.push({name:ID+name,template:ID+name,center,dimensions,bevel});
 for(const[sx,side]of[[-1,'left'],[1,'right']])for(const[sy,front]of[[-1,'front'],[1,'rear']]){
  const name=ID+side+'_'+front+'_perforated_angle_post',x=sx*(w/2-pw/2),y=sy*(d/2-pw/2),thickness=.0028,slot=.0065,pitch=.038,count=Math.floor((h-.055)/pitch),start=(h-(count-1)*pitch)/2,frontY=y-pw*.28,boxes=[],tags=[],sideWidth=(pw-slot)/2;
  const push=(center,dimensions,kind,row)=>{boxes.push({center,dimensions});tags.push({kind,row});};
  for(const side of[-1,1])push([x+side*(slot+sideWidth)/2,frontY,h/2],[sideWidth,thickness,h],'frontRail',side===-1?0:1);
  let last=0;
  for(let i=0;i<count;i++){const end=start+i*pitch-.009;if(end>last)push([x,frontY,(last+end)/2],[slot,thickness,end-last],'frontBridge',i);last=start+i*pitch+.009;}
  if(last<h)push([x,frontY,(last+h)/2],[slot,thickness,h-last],'frontBridge',count);
  const sideX=x+sx*(pw/2-thickness/2),sideY=y+sy*pw*.30,span=pw*.85,rail=(span-slot)/2;
  for(const side of[-1,1])push([sideX,sideY+side*(slot+rail)/2,h/2],[thickness,rail,h],'sideRail',side===-1?0:1);
  last=0;for(let i=0;i<count;i++){const end=start+i*pitch-.009;if(end>last)push([sideX,sideY,(last+end)/2],[thickness,slot,end-last],'sideBridge',i);last=start+i*pitch+.009;}
  if(last<h)push([sideX,sideY,(last+h)/2],[thickness,slot,h-last],'sideBridge',count);
  parts.push({name,template:name,generatedGeometry:true,boxes,tags,count,bevel:Math.min(edge,.0006)});
 }
 for(let level=1;level<=5;level++){
  const z=p.bottom_height+(h-.080-p.bottom_height)*(level-1)/4,sideX=w/2-pw*.65,sideY=d/2-pw*.65,zring=z-p.board_thickness/2-p.shelf_lip/2+.001,base='tier_'+level+'_';
  cube(base+'front_steel_apron',[0,-sideY,zring],[w-.018,.009,p.shelf_lip]);cube(base+'rear_steel_apron',[0,sideY,zring],[w-.018,.009,p.shelf_lip]);
  for(const[sign,name]of[[-1,'left'],[1,'right']])cube(base+name+'_steel_apron',[sign*sideX,0,zring],[.009,d-.018,p.shelf_lip]);
  const innerW=w-2*pw-.025,innerD=d-2*pw-.024,seam=.0035,boardDepth=(innerD-2*seam)/3;
  for(let i=0;i<3;i++)cube(base+'wood_plank_'+(i+1),[0,(i-1)*(boardDepth+seam),z-p.board_thickness/2],[innerW,boardDepth,p.board_thickness],Math.min(edge*1.4,p.board_thickness*.15));
  for(const[sign,name]of[[-1,'left'],[1,'right']])cube(base+name+'_underrail',[sign*(innerW/2-.035),0,z-p.board_thickness-.007],[.014,innerD,.010]);
  for(const[sx,side]of[[-1,'left'],[1,'right']])for(const[sy,facing]of[[-1,'front'],[1,'rear']]){const name=ID+base+side+'_'+facing+'_bolt';parts.push({name,template:name,center:[sx*sideX,sy*(sideY-.0015),zring]});}
 }
 for(const[sx,side]of[[-1,'left'],[1,'right']])for(const[sy,front]of[[-1,'front'],[1,'rear']])cube(side+'_'+front+'_foot_shoe',[sx*(w/2-pw/2),sy*(d/2-pw/2),.004],[pw*1.08,pw*1.08,.008]);
 for(const[name,location]of[['floor',[0,0,0]],['top',[0,0,h]],['shelf',[0,0,p.bottom_height]],['grip',[0,-d/2,h*.52]]])parts.push({name:'socket:'+name,socket:true,location});return parts;
}
function boxVertices(before,ref,part,oldRadius,newRadius){const out=new Float32Array(before.length);for(let i=0;i<out.length;i++){const axis=i%3,x=before[i]-ref.center[axis],sign=Math.sign(x),unit=(x-sign*(ref.dimensions[axis]/2-oldRadius))/oldRadius;out[i]=part.center[axis]+sign*(part.dimensions[axis]/2-newRadius)+unit*newRadius;}return out;}
export function evaluatePart(THREE,part,ref){if(ref.kind==='bolt')return Float32Array.from(ref.positions,(v,i)=>v-ref.center[i%3]+part.center[i%3]);return boxVertices(ref.positions,ref,part,ref.bevel,part.bevel);}
export function createGeometry(THREE,part,ref){const positions=[],normals=[],uv=[],index=[];
 for(let bi=0;bi<part.boxes.length;bi++){const tag=part.tags[bi],row=Math.round(tag.row*ref.slots/part.count);let ti;
  if(tag.kind==='frontRail')ti=tag.row;else if(tag.kind==='frontBridge')ti=2+row;else if(tag.kind==='sideRail')ti=ref.slots+3+tag.row;else ti=ref.slots+5+row;
  const t=ref.components[ti],offset=positions.length/3,v=boxVertices(t.positions,t,part.boxes[bi],ref.bevel,part.bevel);positions.push(...v);normals.push(...t.normals);uv.push(...t.uv);index.push(...t.index.map(i=>i+offset));
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));if(uv.length)g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(index);g.addGroup(0,index.length,0);g.userData.slotsPerFlange=part.count;g.userData.cuboids=part.boxes.length;return g;
}
