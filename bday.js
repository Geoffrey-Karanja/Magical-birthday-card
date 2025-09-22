// Prompt for name
const userName = prompt("Welcome! What's your name?");
const nameDisplay = document.getElementById('nameDisplay');
const messageDisplay = document.getElementById('messageDisplay');
nameDisplay.textContent = userName ? userName + '!' : 'Friend!';

// Magical typing effect for message
const fullMessage = `
Every heartbeat today reminds you of how deeply you are loved. 💖
May your journey ahead be filled with joy, courage, and endless inspiration.
The world shines brighter because of your smile. 🌟
Believe in your dreams, cherish every moment, and let love guide you. ✨
`;
let i = 0;
function typeMessage() {
    if (i < fullMessage.length) {
        messageDisplay.innerHTML += fullMessage.charAt(i);
        i++;
        setTimeout(typeMessage, 35);
    }
}
typeMessage();

// Confetti & hearts
function createConfetti(){
    const colors=['#FF69B4','#00CED1','#FFD700','#FF1493','#98FB98','#FFB347'];
    const container=document.getElementById('confettiContainer');
    for(let i=0;i<50;i++){
        const c=document.createElement('div'); c.className='confetti';
        c.style.left=Math.random()*100+'%';
        c.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
        c.style.animationDelay=Math.random()*3+'s';
        c.style.animationDuration=(Math.random()*3+2)+'s';
        c.style.animation=`confettiFall ${c.style.animationDuration} ${c.style.animationDelay} ease-out forwards`;
        container.appendChild(c); setTimeout(()=>{c.remove();},5000);
    }
}
function createHearts(){
    const container=document.getElementById('heartsContainer');
    const hearts=['💖','💕','💗','💝','💘','❣️'];
    for(let i=0;i<20;i++){
        const h=document.createElement('div'); h.className='heart';
        h.textContent=hearts[Math.floor(Math.random()*hearts.length)];
        h.style.left=Math.random()*90+'%'; h.style.bottom='0px';
        h.style.animationDelay=Math.random()*2+'s';
        container.appendChild(h); setTimeout(()=>{h.remove();},5000);
    }
}
function triggerConfetti(){createConfetti();}
function triggerHearts(){createHearts();}
function celebrate(){createConfetti(); setTimeout(()=>{createHearts();},500);}
window.addEventListener('load',()=>{setTimeout(celebrate,1000);});

// Chime
function playChime(){
    const chime=document.getElementById('chimeSound');
    chime.currentTime=0; chime.play();
}