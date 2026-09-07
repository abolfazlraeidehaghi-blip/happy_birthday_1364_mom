const $ = s => document.querySelector(s);
const envelope = $('.envelope');
const intro = $('.intro');
const celebration = $('.celebration');
const loading = $('.loading');
const balloonField = $('.balloon-field');
const confettiLayer = $('.confetti-layer');
const heartsBg = $('.hearts-bg');
const replay = $('.replay');
let started = false;

window.addEventListener('load',()=>setTimeout(()=>loading.classList.add('hide'),700));

function rand(min,max){return Math.random()*(max-min)+min}
function choose(a){return a[Math.floor(Math.random()*a.length)]}

function makeConfetti(count=170){
  const frag=document.createDocumentFragment();
  for(let i=0;i<count;i++){
    const c=document.createElement('i'); c.className='confetti';
    c.style.left=rand(0,100)+'%'; c.style.animationDuration=rand(3.8,7.8)+'s'; c.style.animationDelay=rand(0,.9)+'s';
    c.style.transform=`rotate(${rand(0,360)}deg)`;
    c.style.background=choose(['#ff72b7','#ffd1e7','#ffffff','#ff3c95','#ffbdde']);
    c.style.borderRadius=choose(['2px','50%','0']); confettiLayer.appendChild(c);
  }
  return frag;
}
function makeBalloons(count=30){
  const colors=['#ff5da7','#ff8ac5','#ffd1e7','#c96bff','#ffffff','#ff3d8f'];
  for(let i=0;i<count;i++){
    const b=document.createElement('span'); b.className='balloon';
    const size=rand(38,68); b.style.width=size+'px'; b.style.height=size*1.22+'px';
    b.style.left=rand(-3,103)+'%'; b.style.background=choose(colors);
    b.style.animationDuration=rand(7,13)+'s'; b.style.animationDelay=rand(0,4)+'s';
    b.style.setProperty('--drift',rand(-18,18)+'vw'); b.style.setProperty('--rot',rand(-28,28)+'deg');
    balloonField.appendChild(b);
  }
}
function makeHearts(count=50){
  for(let i=0;i<count;i++){
    const h=document.createElement('span'); h.className='heart-float'; h.textContent=choose(['♥','❤','♡','✦']);
    h.style.left=rand(0,100)+'%'; h.style.fontSize=rand(12,32)+'px'; h.style.animationDuration=rand(5,10)+'s'; h.style.animationDelay=rand(0,5)+'s'; h.style.setProperty('--drift',rand(-20,20)+'vw');
    celebration.appendChild(h);
  }
}

const birthdayAudio = document.querySelector('#birthdayAudio');

function playBirthdayAudio(){
  if(!birthdayAudio) return;
  birthdayAudio.currentTime = 0;
  birthdayAudio.play().catch(()=>{});
}

function openShow(){
  if(started)return; started=true;
  envelope.classList.add('open');
  setTimeout(()=>{
    intro.classList.add('hidden');
    celebration.classList.add('active'); celebration.setAttribute('aria-hidden','false');
    makeConfetti(); makeBalloons(); makeHearts(); playBirthdayAudio();
  },1150);
}
envelope.addEventListener('click',openShow);
envelope.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openShow()});
replay.addEventListener('click',()=>{ if(birthdayAudio){ birthdayAudio.pause(); birthdayAudio.currentTime=0; } location.reload(); });

// افکت موشک‌های کوچک نور در شروع
for(let i=0;i<34;i++){
  const dot=document.createElement('span'); dot.style.position='absolute'; dot.style.width=rand(2,5)+'px'; dot.style.height=dot.style.width; dot.style.borderRadius='50%'; dot.style.background='white'; dot.style.opacity=rand(.12,.55); dot.style.left=rand(0,100)+'%'; dot.style.top=rand(0,100)+'%'; dot.style.boxShadow='0 0 10px #fff'; dot.style.animation=`blink ${rand(1.2,3)}s ${rand(0,2)}s infinite`; document.querySelector('.sparkles').appendChild(dot);
}
