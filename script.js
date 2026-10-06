/* ========== TIMELINE SCROLL ANIMACIJA ========== */
const tlItems = document.querySelectorAll('.tl-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
tlItems.forEach(el => io.observe(el));

/* ========== SLIDER PRIJE/POSLIJE ========== */
const slider = document.getElementById('slider');
const handle = document.getElementById('handle');
const poslije = document.getElementById('poslije');
let dragging = false;

function setSlider(clientX) {
  const rect = slider.getBoundingClientRect();
  let proc = (clientX - rect.left) / rect.width;
  proc = Math.max(0, Math.min(1, proc));
  const pct = proc * 100;
  poslije.style.clipPath = `inset(0 0 0 ${pct}%)`;
  handle.style.left = pct + '%';
}

slider.addEventListener('mousedown', e => {
  dragging = true;
  setSlider(e.clientX);
});
window.addEventListener('mouseup', () => dragging = false);
window.addEventListener('mousemove', e => {
  if (dragging) setSlider(e.clientX);
});

slider.addEventListener('touchstart', e => {
  dragging = true;
  setSlider(e.touches[0].clientX);
});
window.addEventListener('touchend', () => dragging = false);
window.addEventListener('touchmove', e => {
  if (dragging) {
    setSlider(e.touches[0].clientX);
    e.preventDefault();
  }
}, { passive: false });

/* ========== GRAFITI ========== */
const grafiti = [
  {
    tekst: "CAVE CANEM",
    prijevod: "Čuvaj se psa!",
    lokacija: "KUĆA TRAGIČNOG PJESNIKA · Ulazni mozaik"
  },
  {
  tekst: "ADMIROR O PARIES TE NON CECIDISSE RUINIS, QUI TOT SCRIPTORUM TAEDIA SUSTINEAS",
  prijevod: "Čudim se, o zide, što se nisi srušio pod teretom tolikih dosadnih natpisa.",
  lokacija: "Pompeji · Grafit"
},
  {
  tekst: "QUISQUIS AMAT VENIAT",
  prijevod: "Neka dođe onaj ko voli.",
  lokacija: "Basilica · Grafit"
},
  {
  tekst: "MILITAT OMNIS AMANS",
  prijevod: "Svaki ljubavnik je vojnik.",
  lokacija: "Pompeji · Grafit"
},
  {
    tekst: "QUISQUIS AMAT, VALEAT",
    prijevod: "Neka svako ko ljubi bude dobro.",
    lokacija: "Kuća Cecilija Jukunda (V.1.26) · Grafit"
  },
 {
  tekst: "FULLONES ULULAMQUE CANO, NON ARMA VIRUMQUE",
  prijevod: "Pjevam o pralcima i sovi, a ne o oružju i junaku.",
  lokacija: "Kuća Marka Fabija Ululitremula · Via dell’Abbondanza · Grafit"
},
  {
  tekst: "PEREAT QUI NESCIT AMARE",
  prijevod: "Neka propadne onaj ko ne zna voljeti.",
  lokacija: "Pompeji · Ljubavni grafit"
}
];

const grid = document.getElementById('grafitiGrid');
grafiti.forEach(g => {
  const card = document.createElement('div');
  card.className = 'grafit';
  card.innerHTML = `
    <div class="grafit-lokacija">${g.lokacija}</div>
    <div class="grafit-tekst">${g.tekst}</div>
    <div class="grafit-prijevod">„${g.prijevod}"</div>
    <div class="grafit-hint">klikni za prijevod</div>
  `;
  card.addEventListener('click', () => {
    card.classList.toggle('otvoren');
    const hint = card.querySelector('.grafit-hint');
    hint.style.display = card.classList.contains('otvoren') ? 'none' : 'block';
  });
  grid.appendChild(card);
});

/* ========== EFEKAT PEPELA KROZ SKROLANJE ========== */
const pepeo = document.getElementById('pepeo');
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - window.innerHeight;
  const proc = Math.min(1, window.scrollY / max);
  pepeo.style.opacity = (proc * 0.35).toFixed(3);
  pepeo.style.background = proc > 0.5
    ? `radial-gradient(ellipse at top, rgba(184,52,26,${((proc - 0.5) * 0.4).toFixed(3)}), transparent 70%)`
    : `radial-gradient(ellipse at top, rgba(0,0,0,${(proc * 0.2).toFixed(3)}), transparent 70%)`;
});
