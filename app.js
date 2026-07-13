// Header shrink on scroll (home only — pages use .solid by default)
const header=document.getElementById('header');
if(header && !header.classList.contains('solid')){
  addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
}

// Scroll reveal
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4*80)+'ms';io.observe(el)});

// Active nav link on scroll (home page with in-page sections)
const homeSections=[...document.querySelectorAll('section[data-nav]')];
if(homeSections.length){
  const links=[...document.querySelectorAll('.menu a[data-scroll]')];
  addEventListener('scroll',()=>{
    let cur='hjem';
    homeSections.forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.dataset.nav});
    links.forEach(a=>a.classList.toggle('active',a.dataset.scroll===cur));
  });
}

// Mobile menu — slide-in drawer with overlay + hamburger animation
const burger=document.getElementById('burger');
const menu=document.querySelector('.menu');
if(burger&&menu){
  // Inject a brand eyebrow at the top of the drawer (shown on mobile only)
  const eyebrow=document.createElement('div');
  eyebrow.className='menu-eyebrow';
  eyebrow.textContent='Zea Beauty · Sandefjord';
  menu.insertBefore(eyebrow, menu.firstChild);

  // Inject a "Bestill time" button into the drawer (shown on mobile only)
  const book=document.createElement('a');
  book.href='bestill.html';
  book.className='btn btn-solid mobile-book';
  book.textContent='Bestill time';
  menu.appendChild(book);

  // Inject the dimming overlay
  const overlay=document.createElement('div');
  overlay.className='nav-overlay';
  document.body.appendChild(overlay);

  const setOpen=(open)=>{
    menu.classList.toggle('open',open);
    burger.classList.toggle('open',open);
    overlay.classList.toggle('show',open);
    document.body.classList.toggle('nav-open',open);
    burger.setAttribute('aria-expanded',open);
  };
  burger.addEventListener('click',()=>setOpen(!menu.classList.contains('open')));
  overlay.addEventListener('click',()=>setOpen(false));
  menu.addEventListener('click',e=>{if(e.target.tagName==='A')setOpen(false)});
  addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
  // Reset if resized up to desktop
  addEventListener('resize',()=>{if(innerWidth>960)setOpen(false)});
}

// Hero video: hide it if the .mp4 is missing/unplayable so the fallback image shows
const heroVideo=document.querySelector('.hero-video');
if(heroVideo){
  const src=heroVideo.querySelector('source');
  const hide=()=>{heroVideo.style.display='none'};
  if(src)src.addEventListener('error',hide);
  heroVideo.addEventListener('error',hide);
}

// Booking form (client-side only — no backend)
const form=document.getElementById('booking-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const msg=document.getElementById('form-msg');
    const name=form.querySelector('[name=navn]').value.trim()||'';
    const first=name.split(' ')[0];
    msg.textContent='Takk'+(first?', '+first:'')+'! Din forespørsel er registrert. Vi tar kontakt innen 24 timer for å bekrefte timen din.';
    msg.className='form-msg ok show';
    form.reset();
    msg.scrollIntoView({behavior:'smooth',block:'center'});
  });
}
