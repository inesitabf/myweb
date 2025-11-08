// Expand/Collapse cards
document.querySelectorAll('.card__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const more = btn.nextElementSibling;
    const isOpen = !more.hasAttribute('hidden');
    if (isOpen) {
      more.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Learn more';
    } else {
      more.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Hide details';
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== Experience the Product modal logic (autoplay + arrows) ===== */
const xpModal = document.getElementById('xp-modal');
const xpOpen  = document.getElementById('open-xp');
const xpClose = document.getElementById('xp-close');
const xpBackdrop = document.getElementById('xp-backdrop');

const slidesWrap = document.getElementById('xp-slides');
const xpSlides = slidesWrap ? Array.from(slidesWrap.querySelectorAll('.xp-slide')) : [];
const prevBtn = document.querySelector('.xp-prev');
const nextBtn = document.querySelector('.xp-next');

let xpIndex = 0;
let xpTimer = null;
const XP_INTERVAL = 4000; // auto-advance every 4s

function xpShow(i){
  if (!xpSlides.length) return;
  xpSlides[xpIndex].classList.remove('is-active');
  xpIndex = (i + xpSlides.length) % xpSlides.length;
  xpSlides[xpIndex].classList.add('is-active');
}

function xpNext(){ xpShow(xpIndex + 1); }
function xpPrev(){ xpShow(xpIndex - 1); }

function xpStart(){
  if (xpTimer) clearInterval(xpTimer);
  xpTimer = setInterval(xpNext, XP_INTERVAL);
}
function xpStop(){
  if (xpTimer) clearInterval(xpTimer);
  xpTimer = null;
}

function xpOpenModal(){
  xpModal.setAttribute('aria-hidden', 'false');
  xpShow(0);
  xpStart();
}
function xpCloseModal(){
  xpModal.setAttribute('aria-hidden', 'true');
  xpStop();
}

xpOpen?.addEventListener('click', xpOpenModal);
xpClose?.addEventListener('click', xpCloseModal);
xpBackdrop?.addEventListener('click', xpCloseModal);
nextBtn?.addEventListener('click', () => { xpNext(); xpStart(); });
prevBtn?.addEventListener('click', () => { xpPrev(); xpStart(); });

// Pause auto when hovering modal (to read calmly)
xpModal?.addEventListener('mouseenter', xpStop);
xpModal?.addEventListener('mouseleave', xpStart);

// Keyboard navigation for XP modal
document.addEventListener('keydown', (e) => {
  if (xpModal && xpModal.getAttribute('aria-hidden') === 'false'){
    if (e.key === 'ArrowRight'){ xpNext(); xpStart(); }
    if (e.key === 'ArrowLeft'){ xpPrev(); xpStart(); }
    if (e.key === 'Escape'){ xpCloseModal(); }
  }
});

/* ===== Typeform fullscreen modal ===== */
const tfModal = document.getElementById('tf-modal');
const tfClose = document.getElementById('tf-close');
const tfBackdrop = document.getElementById('tf-backdrop');
const openTFButtons = document.querySelectorAll('.js-open-typeform');

function openTF(){
  tfModal.setAttribute('aria-hidden', 'false');
}
function closeTF(){
  tfModal.setAttribute('aria-hidden', 'true');
}

openTFButtons.forEach(btn => btn.addEventListener('click', openTF));
tfClose?.addEventListener('click', closeTF);
tfBackdrop?.addEventListener('click', closeTF);

// Esc to close Typeform modal
document.addEventListener('keydown', (e) => {
  if (tfModal && tfModal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape'){
    closeTF();
  }
});
