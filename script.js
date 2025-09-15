// MATRIX RAIN
const matrix = document.getElementById('matrixCanvas');
const ctx = matrix.getContext('2d');
function resizeMatrix() { matrix.width = innerWidth; matrix.height = innerHeight; }
resizeMatrix(); window.addEventListener('resize', resizeMatrix);

const letters = '01';
const fontSize = 14;
let cols = Math.floor(innerWidth / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,matrix.width,matrix.height);
    ctx.fillStyle='#0f0';
    ctx.font=fontSize+'px monospace';
    for(let i=0;i<drops.length;i++){
        let char=letters.charAt(Math.floor(Math.random()*letters.length));
        ctx.fillText(char,i*fontSize,drops[i]*fontSize);
        if(drops[i]*fontSize>matrix.height && Math.random()>0.975){drops[i]=0;}
        drops[i]++;
    }
}
setInterval(drawMatrix,50);

// HACKER LOGS
const logsEl = document.getElementById('logs');
const msgs = ['Booting kernel... OK','Secure link established... OK','Loading crypto modules... OK','Spawning daemons... OK','Access granted','Decrypting payload... OK','Tracing IP... OK','System ready.'];
let logIndex = 0;
setInterval(()=>{
    const div = document.createElement('div');
    div.textContent = '> '+msgs[logIndex % msgs.length];
    logsEl.appendChild(div);
    if(logsEl.childNodes.length>30) logsEl.removeChild(logsEl.firstChild);
    logsEl.scrollTop = logsEl.scrollHeight;
    logIndex++;
},900);

// WIREFRAME SPHERE (Three.js)
const wireCanvas = document.getElementById('wireCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, wireCanvas.clientWidth/wireCanvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas:wireCanvas, alpha:true});
renderer.setSize(wireCanvas.clientWidth, wireCanvas.clientHeight);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({color:0x00ff66, wireframe:true});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
camera.position.z = 3;

function animateWire(){
    requestAnimationFrame(animateWire);
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animateWire();

// BINARY SUN + LION (Detailed Outline with crown and sword)
const sCanvas = document.getElementById('symbolCanvas');
const sctx = sCanvas.getContext('2d');
function fitSymbol(){ sCanvas.width=sCanvas.clientWidth; sCanvas.height=sCanvas.clientHeight; }
fitSymbol(); window.addEventListener('resize', fitSymbol);

// Full binary art matrix for demonstration (simplified)
const symbolMatrix = [
'0000011111000',
'0001111111100',
'0011111111110',
'0111110111110',
'1111111111111',
'1111111111111',
'0111111111100',
'0011111111000',
'0001111110000',
'0000011100000'
];
let sAng=0;
function drawSymbol(){
    sctx.clearRect(0,0,sCanvas.width,sCanvas.height);
    const cx=sCanvas.width/2, cy=sCanvas.height/2;
    const scale=15;
    sctx.font='10px monospace';
    sctx.textAlign='center';
    sctx.textBaseline='middle';
    for(let y=0;y<symbolMatrix.length;y++){
        for(let x=0;x<symbolMatrix[y].length;x++){
            if(symbolMatrix[y][x]==='1'){
                let px=x-symbolMatrix[y].length/2;
                let py=y-symbolMatrix.length/2;
                let pz=0;
                let rx = px*Math.cos(sAng)+pz*Math.sin(sAng);
                let rz = -px*Math.sin(sAng)+pz*Math.cos(sAng);
                let ry = py;
                let dx = cx + rx*scale;
                let dy = cy + ry*scale;
                let color;
                if(py<symbolMatrix.length/3) color='rgba(0,128,0,0.9)';
                else if(py<symbolMatrix.length*2/3) color='rgba(255,255,255,0.9)';
                else color='rgba(255,0,0,0.9)';
                sctx.fillStyle=color;
                sctx.fillText('0', dx, dy);
            }
        }
    }
    sAng += 0.02;
    requestAnimationFrame(drawSymbol);
}
drawSymbol();
