
// helpers
const q=(s)=>document.querySelector(s);
const qq=(s)=>document.querySelectorAll(s);
const nameDisplay=q('#nameDisplay');
const messageDisplay=q('#messageDisplay');
const confettiCanvas=q('#confettiCanvas');
const confettiCtx=confettiCanvas.getContext('2d');
const heartsLayer=q('#hearts');
const balloonsLayer=q('#balloons');
const introModal=q('#introModal');
const modalName=q('#modalName');
const modalMusic=q('#modalMusic');
const startBtn=q('#startBtn');
const birthdayMusic=q('#birthdayMusic');
const chimeSound=q('#chimeSound');
// resize
function resizeCanvas(){
confettiCanvas.width=confettiCanvas.clientWidth*devicePixelRatio;
confettiCanvas.height=confettiCanvas.clientHeight*devicePixelRatio;
confettiCtx.scale(devicePixelRatio,devicePixelRatio);
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();
// confetti
let confettiParticles=[];
class Confetti{
constructor(x,y,dx,dy,size,color,rotSpeed){this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.size=size;this.color=color;this.rotation=Math.random()*360;this.rotSpeed=rotSpeed;this.life=0;this.ttl=Math.random()*80+80;}
update(){this.x+=this.dx;this.y+=this.dy;this.dy+=0.12;this.rotation+=this.rotSpeed;this.life++;}
draw(ctx){ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.rotation*Math.PI/180);ctx.fillStyle=this.color;ctx.fillRect(-this.size/2,-this.size/2,this.size,this.size);ctx.restore();}
}
function spawnConfetti(xRange=1){
const colors=['#FF69B4','#00CED1','#FFD700','#FF1493','#98FB98','#FFB347'];
const areaW=confettiCanvas.clientWidth;
for(let i=0;i<80;i++){
const x=Math.random()*areaW*xRange;
const y=-20-Math.random()*60;
const dx=(Math.random()-0.5)*4;
const dy=Math.random()*1.5+1.5;
const size=Math.random()*8+6;
const color=colors[Math.floor(Math.random()*colors.length)];
const rot=(Math.random()-0.5)*8;
confettiParticles.push(new Confetti(x,y,dx,dy,size,color,rot));
}
}
function updateConfetti(){
confettiCtx.clearRect(0,0,confettiCanvas.clientWidth,confettiCanvas.clientHeight);
for(let i=confettiParticles.length-1;i>=0;i--){
let p=confettiParticles[i];p.update();p.draw(confettiCtx);
if(p.y>confettiCanvas.clientHeight+40||p.life>p.ttl)confettiParticles.splice(i,1);
}
}
let confettiRAF=null;
function confettiLoop(){updateConfetti();confettiRAF=requestAnimationFrame(confettiLoop);}
// hearts
function createHeartBurst(count=14){
const hearts=['💖','💕','💗','💝','💘','❣️'];
for(let i=0;i<count;i++){
const el=document.createElement('div');el.className='heart-el';el.textContent=hearts[Math.floor(Math.random()*hearts.length)];
const left=(10+Math.random()*80);el.style.left=left+'%';
el.style.bottom='20px';el.style.fontSize=(18+Math.random()*22)+'px';
heartsLayer.appendChild(el);
setTimeout(()=>{el.remove()},3200+Math.random()*1200);
}
}
// balloons
function createBalloons(count=6){
for(let i=0;i<count;i++){
const el=document.createElement('div');el.className='balloon';el.textContent='🎈';
const left=(6+Math.random()*88);el.style.left=left+'%';
const delay=Math.random()*1.2;
const duration=6+Math.random()*5;
const finalY=confettiCanvas.clientHeight+180;
el.animate([{transform:'translateY(0)'},{transform:`translateY(-${finalY}px)`}],{duration:duration*1000,delay:delay*1000,easing:'ease-in',fill:'forwards'});
balloonsLayer.appendChild(el);
setTimeout(()=>el.remove(),(delay+duration)*1000+200);
}
}
// message
const fullMessage=`
✨ May the universe bend slightly in your favor today — just enough for impossible things to feel possible. ✨
🌌 May your steps align with hidden doors meant only for you, opening at the exact second you arrive.
💫 And may one quiet moment today reveal something you’ve been waiting to understand for far too long.
🌟 This year, may life treat you gently, surprise you kindly, and guide you toward the version of yourself you secretly know you’re capable of becoming.
🎉 Keep shining, keep dreaming, and keep being uniquely, brilliantly you — the world needs more of that magic.
`;
function typeWriter(el,text,speed=28){
let idx=0;el.textContent='';
function step(){
const ch=text.charAt(idx);el.textContent+=ch;idx++;
if(idx<text.length){
let delay=speed;
if(ch===','||ch==='-')delay=speed*2;
if(ch==='.'||ch==='!'||ch==='?')delay=speed*8;
setTimeout(step,delay);
}
}
step();
}
function capitalise(s){if(!s)return s;return s.trim().replace(/\b\w/g,c=>c.toUpperCase());}
// buttons
q('#confettiBtn').addEventListener('click',()=>{spawnConfetti(1);if(!confettiRAF)confettiLoop();});
q('#heartsBtn').addEventListener('click',()=>createHeartBurst());
q('#chimeBtn').addEventListener('click',()=>{chimeSound.currentTime=0;chimeSound.play();});
q('#surpriseBtn').addEventListener('click',()=>{
createBalloons(8);createHeartBurst(18);spawnConfetti(1.2);if(!confettiRAF)confettiLoop();if(modalMusic.checked)birthdayMusic.play();
});
// modal
startBtn.addEventListener('click',()=>{
const name=capitalise(modalName.value||'Friend');
nameDisplay.textContent=name;
introModal.style.display='none';
if(modalMusic.checked)birthdayMusic.play();
typeWriter(messageDisplay,fullMessage);
});
// wish
q('#wishBtn').addEventListener('click',()=>{
const val=q('#wishInput').value.trim();
if(val){const floatEl=document.createElement('div');floatEl.className='wish-float';floatEl.textContent=val;document.body.appendChild(floatEl);
setTimeout(()=>floatEl.remove(),5000);q('#wishInput').value='';createHeartBurst(8);spawnConfetti(1.2);if(!confettiRAF)confettiLoop();}
});