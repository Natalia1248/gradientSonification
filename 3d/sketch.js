

let img;
function preload(){
  //https://upload.wikimedia.org/wikipedia/commons/5/50/Eyetracking_heat_map_Wikipedia.jpg
  //https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png
  //
  //https://upload.wikimedia.org/wikipedia/commons/5/50/Eyetracking_heat_map_Wikipedia.jpg
  //https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Moon_worldwind.jpg/1024px-Moon_worldwind.jpg
  img=loadImage('assets/ljlj');

}

let m;
let scale=0.5;

function setup() {
    
    img.copy(
      img,
      50,50,900,620,
      0,0, 1000, 772
    );
    
    const model = new p5.Geometry();
    
    createCanvas(800, 600, WEBGL);
    
    let vertices = new Array(0), caras = new Array(0), texturas = new Array(0);

    //cantidad de lineas de vertices, de texturas
    let vs=0, ts=0;

    //variable para alturas
    let h=0;

    //la "unidad"
    let uno=10;
    
    let lancho = img.width, lalto = img.height;

    //i sera y; j sera como x.
    for(let i=0; i<(lalto-uno); i+=uno){
      for (let j=0; j<(lancho-uno); j+=uno){

        h=-0.65 * getHue(img.get(j,i)) * scale;
        let v1='v '+(j*scale)+' '+(i*scale)+' '+h+'\n';

        h=-0.65 * getHue(img.get(j+uno,i)) * scale;
        let v2='v '+(j+uno)*scale+' '+(i)*scale+' '+h+'\n';

        h=-0.65 * getHue(img.get(j+uno,i+uno)) * scale;
        let v3='v '+(j+uno)*scale+' '+(i+uno)*scale+' '+h+'\n';

        h=-0.65 * getHue(img.get(j,i+uno)) * scale;
        let v4='v '+(j)*scale+' '+(i+uno)*scale+' '+h+'\n';

        let t1='vt '+ j/lancho + ' ' + i/lalto;
        let t2='vt '+ (j+uno)/lancho + ' ' + i/lalto;
        let t3='vt '+ (j+uno)/lancho + ' ' + (i+uno)/lalto;
        let t4='vt '+ j/lancho + ' ' + (i+uno)/lalto;

        vertices.push(v1, v2, v3, v4);
        vs+=4;
        texturas.push(t1, t2, t3, t4);
        ts+=4;
        
      }
    }
    
    for(let i=0; i<vs; i+=4){
      caras.push(
        'f '+ ' ' +
        (i+1) + '/' + (i+1) + ' ' +
        (i+2) + '/' + (i+2) + ' ' +
        (i+3) + '/' + (i+3) + ' ' +
        (i+4) + '/' + (i+4)
      )
    }

    let lineas = vertices.concat(texturas.concat(caras));

    console.log(lineas)
    m=parseObj(model, lineas);
    //m.normalize();
    
}

let Xrotation=0;

function draw() {
    background (2,1,46);
    //rotateX(radians(90));
    rotateX(Xrotation);
    translate(-img.width*scale/2, -150, 00);
    translate(0,0,100);
    //camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

    texture (img);
    model(m);
    //orbitControl();
    //plane (img.width*0.75,img.height*0.75);
    
    //bolita
    //si hay que hacer mas cosas despues, englobar en un bloque push-pop
    let c=img.get(
      map((constrain(mouseX-(width/2)+(img.width*scale/2), 0, img.width*scale)),0, img.width*scale, 0, img.width),
      constrain(map(mouseY,0,height,0,img.height), 0, img.height)
    );
    translate(
      constrain(mouseX-(width/2)+(img.width*scale/2), 0, img.width*scale),
      constrain(map(mouseY,0,height,0,img.height*scale), 0, img.height*scale),
      -0.8 * getHue(c) * scale
    );
    fill(255, 0, 255);
    sphere (10);

    let rh=c[0].toString(16);
    let gh=c[1].toString(16);
    let bh=c[2].toString(16);
    document.body.style.backgroundColor='#'+rh+gh+bh;

    if(empezo)
      setFrequency(map(getHue(c), 0, 255, -24000, 24000));
}

let rxi=null, ryi=null;
let nyr, nxr;
let myi, mxi;
let xd=false, yd=false;
function mouseDragged(){

    if(!yd){
        yd=true;
        rxi=Xrotation;
        myi=mouseY;
    }

    nxr=map(myi-mouseY, -height, height, -PI, PI);
    Xrotation=rxi+nxr;
}
function mouseReleased(){
    yd=false;
}

function getHue(cl){
  
  let r=norm(cl[0], 0, 255);
  let g=norm(cl[1], 0, 255);
  let b=norm(cl[2], 0, 255);

  let xmax= max(r,g,b);
  let v=xmax;
  let xmin= min(r,g,b);
  let c= xmax-xmin;
    
  let hue;
  if(c==0) hue=0;
  else if(v==r) hue = (60)*((g-b)/c);
  else if(v==g) hue = (60)*(2+((b-r)/c));
  else if(v==b) hue = (60)*(4+((r-g)/c));

  //hue=map(hue, 0, 1, 0, 255);
  //HUE ENTRE 0 Y 1
  return hue;
}

  /**
   * Parse OBJ lines into model. For reference, this is what a simple model of a
   * square might look like:
   *
   * v -0.5 -0.5 0.5
   * v -0.5 -0.5 -0.5
   * v -0.5 0.5 -0.5
   * v -0.5 0.5 0.5
   *
   * f 4 3 2 1
   */
function parseObj(model, lines) {
    // OBJ allows a face to specify an index for a vertex (in the above example),
    // but it also allows you to specify a custom combination of vertex, UV
    // coordinate, and vertex normal. So, "3/4/3" would mean, "use vertex 3 with
    // UV coordinate 4 and vertex normal 3". In WebGL, every vertex with different
    // parameters must be a different vertex, so loadedVerts is used to
    // temporarily store the parsed vertices, normals, etc., and indexedVerts is
    // used to map a specific combination (keyed on, for example, the string
    // "3/4/3"), to the actual index of the newly created vertex in the final
    // object.
    const loadedVerts = {
      v: [],
      vt: [],
      vn: []
    };
    const indexedVerts = {};
  
    for (let line = 0; line < lines.length; ++line) {
      // Each line is a separate object (vertex, face, vertex normal, etc)
      // For each line, split it into tokens on whitespace. The first token
      // describes the type.
      const tokens = lines[line].trim().split(/\b\s+/);
  
      if (tokens.length > 0) {
        if (tokens[0] === 'v' || tokens[0] === 'vn') {
          // Check if this line describes a vertex or vertex normal.
          // It will have three numeric parameters.
          const vertex = new p5.Vector(
            parseFloat(tokens[1]),
            parseFloat(tokens[2]),
            parseFloat(tokens[3])
          );
          loadedVerts[tokens[0]].push(vertex);
        } else if (tokens[0] === 'vt') {
          // Check if this line describes a texture coordinate.
          // It will have two numeric parameters.
          const texVertex = [parseFloat(tokens[1]), parseFloat(tokens[2])];
          loadedVerts[tokens[0]].push(texVertex);
        } else if (tokens[0] === 'f') {
          // Check if this line describes a face.
          // OBJ faces can have more than three points. Triangulate points.
          for (let tri = 3; tri < tokens.length; ++tri) {
            const face = [];
  
            const vertexTokens = [1, tri - 1, tri];
  
            for (let tokenInd = 0; tokenInd < vertexTokens.length; ++tokenInd) {
              // Now, convert the given token into an index
              const vertString = tokens[vertexTokens[tokenInd]];
              let vertIndex = 0;
  
              // TODO: Faces can technically use negative numbers to refer to the
              // previous nth vertex. I haven't seen this used in practice, but
              // it might be good to implement this in the future.
  
              if (indexedVerts[vertString] !== undefined) {
                vertIndex = indexedVerts[vertString];
              } else {
                const vertParts = vertString.split('/');
                for (let i = 0; i < vertParts.length; i++) {
                  vertParts[i] = parseInt(vertParts[i]) - 1;
                }
  
                vertIndex = indexedVerts[vertString] = model.vertices.length;
                model.vertices.push(loadedVerts.v[vertParts[0]].copy());
                if (loadedVerts.vt[vertParts[1]]) {
                  model.uvs.push(loadedVerts.vt[vertParts[1]].slice());
                } else {
                  model.uvs.push([0, 0]);
                }
  
                if (loadedVerts.vn[vertParts[2]]) {
                  model.vertexNormals.push(loadedVerts.vn[vertParts[2]].copy());
                }
              }
  
              face.push(vertIndex);
            }
  
            if (
              face[0] !== face[1] &&
              face[0] !== face[2] &&
              face[1] !== face[2]
            ) {
              model.faces.push(face);
            }
          }
        }
      }
    }
    // If the model doesn't have normals, compute the normals
    if (model.vertexNormals.length === 0) {
      model.computeNormals();
    }
  
    return model;
}
