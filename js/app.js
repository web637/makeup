/* ============================================
   MAKEUP BY INTAN BERLIANDA - Main App JS
   ============================================ */

/* ---- DEFAULT DATA ---- */
const DEFAULT_PRICES = [
  { id: 1, name: 'Lamaran', price: 'Hubungi Kami', icon: '💍', desc: 'Makeup cantik untuk momen lamaran yang berkesan dan memukau.', tag: 'Popular' },
  { id: 2, name: 'Wisuda', price: 'Hubungi Kami', icon: '🎓', desc: 'Tampil memesona di hari kelulusan dengan makeup flawless & elegan.', tag: '' },
  { id: 3, name: 'Bridesmaid', price: 'Hubungi Kami', icon: '👰', desc: 'Seragam cantik untuk para bridesmaid yang menawan.', tag: '' },
  { id: 4, name: 'Birthday Party', price: 'Hubungi Kami', icon: '🎂', desc: 'Glam up untuk birthday party yang tak terlupakan.', tag: '' },
  { id: 5, name: 'Prewedding', price: 'Hubungi Kami', icon: '📷', desc: 'Makeup natural untuk sesi foto prewedding romantis.', tag: 'New' },
  { id: 6, name: 'Akad Nikah', price: 'Hubungi Kami', icon: '🕌', desc: 'Makeup sakral dan anggun untuk momen akad nikah suci.', tag: '' },
  { id: 7, name: 'Resepsi', price: 'Hubungi Kami', icon: '👑', desc: 'Tampil sempurna di hari resepsi pernikahan yang spesial.', tag: 'Popular' },
  { id: 8, name: 'Kondangan', price: 'Hubungi Kami', icon: '✨', desc: 'Look elegan untuk menghadiri pernikahan kerabat.', tag: '' },
  { id: 9, name: 'Hair Do Hijab', price: 'Hubungi Kami', icon: '👒', desc: 'Styling hijab modern dan kreatif untuk berbagai acara.', tag: '' },
  { id: 10, name: 'Photoshoot', price: 'Hubungi Kami', icon: '📸', desc: 'Makeup profesional untuk sesi pemotretan komersial & personal.', tag: '' },
  { id: 11, name: 'Terima Tamu', price: 'Hubungi Kami', icon: '🌸', desc: 'Tampil segar dan elegan sebagai penerima tamu acara.', tag: '' },
  { id: 12, name: 'Pendamping Wisuda', price: 'Hubungi Kami', icon: '💐', desc: 'Makeup serasi untuk mendampingi wisudawan/wisudawati.', tag: '' },
];

const DEFAULT_GALLERY = [
  { id: 1, url: '', caption: 'Makeup Lamaran', category: 'lamaran' },
  { id: 2, url: '', caption: 'Makeup Wisuda', category: 'wisuda' },
  { id: 3, url: '', caption: 'Makeup Pengantin', category: 'pengantin' },
  { id: 4, url: '', caption: 'Makeup Birthday', category: 'party' },
  { id: 5, url: '', caption: 'Makeup Prewedding', category: 'pengantin' },
  { id: 6, url: '', caption: 'Makeup Akad', category: 'pengantin' },
  { id: 7, url: '', caption: 'Hair Do Hijab', category: 'wisuda' },
  { id: 8, url: '', caption: 'Makeup Kondangan', category: 'party' },
];

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Siti Rahma', service: 'Makeup Wisuda', rating: 5, text: 'Sangat puas dengan hasilnya! Makeup tahan seharian dan hasilnya cantik banget. Mbak Intan orangnya ramah dan profesional. Highly recommended!', avatar: '' },
  { id: 2, name: 'Dewi Kusuma', service: 'Makeup Lamaran', rating: 5, text: 'Mbak Intan kerjaannya rapi dan hasilnya memuaskan. Makeup lamaran saya jadi yang terbaik. Terima kasih sudah membuat hari special saya semakin indah!', avatar: '' },
  { id: 3, name: 'Annisa Putri', service: 'Akad & Resepsi', rating: 5, text: 'Pelayanan memuaskan, harga terjangkau, dan hasil makeup luar biasa! Semua tamu pesta bilang saya cantik banget. Pasti booking lagi untuk acara berikutnya.', avatar: '' },
  { id: 4, name: 'Rini Wulandari', service: 'Bridesmaid', rating: 5, text: 'Alhamdulillah hasilnya sangat bagus! Kita berlima semua bridesmaid puas dengan makeupnya. Mbak Intan tepat waktu dan hasilnya konsisten cantik.', avatar: '' },
  { id: 5, name: 'Maya Sari', service: 'Birthday Party', rating: 5, text: 'Makeup birthday saya kece abis! Foto-fotonya jadi epic semua. Mbak Intan tahu banget apa yang cocok untuk wajah saya. 10/10 recommended!', avatar: '' },
];

const DEFAULT_FAQS = [
  { q: 'Berapa DP minimal untuk booking?', a: 'DP minimal 50% dari total harga setelah konfirmasi jadwal. Sisa pembayaran dilunasi pada hari H sebelum pengerjaan dimulai.' },
  { q: 'Apakah transport sudah termasuk dalam harga?', a: 'Ya, harga yang tertera sudah termasuk biaya transport untuk area Bekasi. Untuk area di luar Bekasi akan dikenakan biaya transport tambahan sesuai jarak.' },
  { q: 'Apa saja yang free/gratis?', a: 'Setiap paket sudah include free bulu mata, free softlens, dan free fake nails. Tidak ada biaya tambahan untuk item tersebut.' },
  { q: 'Apakah bisa request makeup sesuai keinginan?', a: 'Tentu saja! Anda bisa request referensi makeup yang diinginkan saat melakukan booking. Silakan kirimkan foto referensi dan kami akan berusaha semaksimal mungkin mewujudkannya.' },
  { q: 'Berapa jauh hari sebelumnya harus booking?', a: 'Disarankan booking minimal 2 minggu sebelum hari H, terutama untuk tanggal yang ramai seperti akhir pekan atau hari libur. Booking lebih awal lebih baik!' },
  { q: 'Apakah bisa trial makeup sebelum hari H?', a: 'Ya, tersedia layanan trial makeup untuk memastikan hasil sesuai keinginan. Silakan hubungi via WhatsApp untuk informasi harga dan jadwal trial.' },
  { q: 'Berapa lama waktu yang dibutuhkan untuk makeup?', a: 'Rata-rata waktu pengerjaan adalah 1.5 - 3 jam tergantung jenis makeup dan kompleksitasnya. Untuk makeup pengantin bisa lebih lama. Harap memperhitungkan waktu ini saat merencanakan jadwal.' },
  { q: 'Bagaimana jika tidak puas dengan hasilnya?', a: 'Kepuasan Anda adalah prioritas utama kami. Kami akan melakukan perbaikan jika ada hal yang kurang sesuai. Komunikasikan dengan baik selama proses pengerjaan.' },
];

/* ---- UTILS ---- */
function getLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function setLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

function genCode() {
  return 'MUA' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function showToast(msg, type = 'info') {
  const icons = { success: 'check-circle', error: 'times-circle', warning: 'exclamation-triangle', info: 'info-circle' };
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, 3500);
}

function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('active'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('active'); }

/* ---- SPLASH ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const sp = document.getElementById('splash-screen');
    if (sp) sp.classList.add('hidden');
  }, 2000);
});

/* ---- THEME ---- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeIcon) themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  setLS('theme', dark ? 'dark' : 'light');
}

const savedTheme = getLS('theme', 'light');
setTheme(savedTheme === 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });
}

/* ---- NAVBAR ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLogoTaps = { count: 0, timer: null };

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

navLinks && navLinks.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = ['home', 'about', 'pricelist', 'gallery', 'booking', 'testimonial', 'contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
  document.querySelectorAll('.bottom-nav-item').forEach(l => {
    const href = l.getAttribute('href');
    l.classList.toggle('active', href === '#' + current);
  });
}

/* ---- BACK TO TOP ---- */
const backBtn = document.getElementById('backToTop');
if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- ADMIN LOGO TAP ---- */
const navLogo = document.getElementById('nav-logo');
if (navLogo) {
  navLogo.addEventListener('click', (e) => {
    navLogoTaps.count++;
    clearTimeout(navLogoTaps.timer);
    navLogoTaps.timer = setTimeout(() => navLogoTaps.count = 0, 1500);
    if (navLogoTaps.count >= 5) {
      navLogoTaps.count = 0;
      window.location.href = 'admin.html';
    }
  });
}

/* ---- HERO PARTICLES ---- */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 20 + Math.random() * 80;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; top:${Math.random() * 100}%;
      --dur:${6 + Math.random() * 8}s;
      --dx:${(Math.random() - 0.5) * 60}px;
      --dy:${(Math.random() - 0.5) * 60}px;
      animation-delay:${Math.random() * -8}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ---- COUNTER ANIMATION ---- */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      if (e.target.closest('#home')) animateCounters();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// Counter observer
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); counterObs.disconnect(); }
  }, { threshold: 0.5 });
  counterObs.observe(heroStats);
}

/* ---- PRICELIST ---- */
function renderPricelist() {
  const grid = document.getElementById('pricelistGrid');
  if (!grid) return;
  const prices = getLS('prices', DEFAULT_PRICES);
  grid.innerHTML = prices.map(p => `
    <div class="price-card reveal-up">
      ${p.tag ? `<div class="price-card-tag">${p.tag}</div>` : ''}
      <div class="price-card-icon">${p.icon || '💄'}</div>
      <div class="price-card-body">
        <div class="price-card-name">${p.name}</div>
        <div class="price-card-desc">${p.desc || 'Layanan makeup profesional untuk acara spesial Anda.'}</div>
        <div class="price-card-price">${p.price} <small>/ session</small></div>
        <a href="#booking" class="btn-primary" onclick="prefillBooking('${p.name}')">
          <i class="fas fa-calendar-check"></i> Booking
        </a>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

function prefillBooking(service) {
  const sel = document.getElementById('bookingType');
  if (sel) {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === service) { sel.selectedIndex = i; break; }
    }
  }
}

/* ---- GALLERY ---- */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const gallery = getLS('gallery', DEFAULT_GALLERY);
  const filtered = filter === 'all' ? gallery : gallery.filter(g => g.category === filter);
  grid.innerHTML = filtered.map(g => `
    <div class="gallery-item" onclick="openLightbox('${g.url}', '${g.caption}')" data-cat="${g.category}">
      ${g.url
        ? `<img src="${g.url}" alt="${g.caption}" loading="lazy" />`
        : `<div class="gallery-placeholder"><div class="gallery-placeholder-icon">💄</div><span>${g.caption}</span></div>`
      }
      <div class="gallery-overlay"><div class="gallery-caption">${g.caption}</div></div>
    </div>
  `).join('');
}

const galleryFilter = document.getElementById('galleryFilter');
if (galleryFilter) {
  galleryFilter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    galleryFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
}

/* ---- LIGHTBOX ---- */
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!lb || !img) return;
  if (!src) { showToast('Gambar belum tersedia', 'info'); return; }
  img.src = src;
  if (cap) cap.textContent = caption || '';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

/* ---- TESTIMONIAL SLIDER ---- */
let testiIndex = 0;
let testiAutoplay;

function renderTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.getElementById('testimonialDots');
  if (!track) return;
  const testis = getLS('testimonials', DEFAULT_TESTIMONIALS);

  track.innerHTML = testis.map(t => `
    <div class="testi-card">
      <div class="testi-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-author">
        <div class="testi-avatar">
          ${t.avatar ? `<img src="${t.avatar}" alt="${t.name}" />` : t.name.charAt(0)}
        </div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-service">${t.service}</div>
        </div>
      </div>
    </div>
  `).join('');

  if (dots) {
    const total = Math.ceil(testis.length / 3);
    dots.innerHTML = Array.from({ length: total }, (_, i) =>
      `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToTesti(${i})"></div>`
    ).join('');
  }

  startTestiAutoplay(testis.length);
}

function goToTesti(idx) {
  const track = document.getElementById('testimonialTrack');
  const cards = track ? track.querySelectorAll('.testi-card') : [];
  if (!cards.length) return;
  const perView = window.innerWidth < 768 ? 1 : 3;
  const maxIdx = Math.ceil(cards.length / perView) - 1;
  testiIndex = Math.max(0, Math.min(idx, maxIdx));
  const w = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${testiIndex * w * perView}px)`;
  document.querySelectorAll('#testimonialDots .dot').forEach((d, i) => d.classList.toggle('active', i === testiIndex));
}

function startTestiAutoplay(len) {
  clearInterval(testiAutoplay);
  const perView = window.innerWidth < 768 ? 1 : 3;
  const total = Math.ceil(len / perView);
  testiAutoplay = setInterval(() => {
    testiIndex = (testiIndex + 1) % total;
    goToTesti(testiIndex);
  }, 4500);
}

/* ---- FAQ ---- */
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = DEFAULT_FAQS.map((f, i) => `
    <div class="faq-item" onclick="toggleFAQ(this)">
      <div class="faq-question">
        <span>${f.q}</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => {
    f.classList.remove('open');
    f.querySelector('.faq-answer').classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-answer').classList.add('open');
  }
}

/* ---- BOOKING FORM ---- */
const uploadArea = document.getElementById('uploadArea');
const bookingFile = document.getElementById('bookingRef');

if (uploadArea && bookingFile) {
  uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.style.borderColor = 'var(--pink)'; });
  uploadArea.addEventListener('dragleave', () => uploadArea.style.borderColor = '');
  uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file) handleFilePreview(file);
  });
  bookingFile.addEventListener('change', e => {
    if (e.target.files[0]) handleFilePreview(e.target.files[0]);
  });
}

function handleFilePreview(file) {
  if (!file.type.startsWith('image/')) return showToast('Hanya file gambar yang diizinkan', 'error');
  if (file.size > 5 * 1024 * 1024) return showToast('Ukuran file maksimal 5MB', 'error');
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById('uploadPreview');
    const img = document.getElementById('previewImg');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    if (img) img.src = e.target.result;
    if (prev) prev.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function clearUpload() {
  const prev = document.getElementById('uploadPreview');
  const placeholder = uploadArea && uploadArea.querySelector('.upload-placeholder');
  const inp = document.getElementById('bookingRef');
  if (prev) prev.style.display = 'none';
  if (placeholder) placeholder.style.display = 'flex';
  if (inp) inp.value = '';
}

// Auto-save draft
function saveDraft() {
  const draft = {
    name: document.getElementById('bookingName')?.value,
    wa: document.getElementById('bookingWa')?.value,
    date: document.getElementById('bookingDate')?.value,
    time: document.getElementById('bookingTime')?.value,
    type: document.getElementById('bookingType')?.value,
    location: document.getElementById('bookingLocation')?.value,
    note: document.getElementById('bookingNote')?.value,
  };
  setLS('bookingDraft', draft);
}

function loadDraft() {
  const draft = getLS('bookingDraft', null);
  if (!draft) return;
  if (draft.name) document.getElementById('bookingName').value = draft.name;
  if (draft.wa) document.getElementById('bookingWa').value = draft.wa;
  if (draft.date) document.getElementById('bookingDate').value = draft.date;
  if (draft.time) document.getElementById('bookingTime').value = draft.time;
  if (draft.type) document.getElementById('bookingType').value = draft.type;
  if (draft.location) document.getElementById('bookingLocation').value = draft.location;
  if (draft.note) document.getElementById('bookingNote').value = draft.note;
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  ['bookingName', 'bookingWa', 'bookingDate', 'bookingTime', 'bookingType', 'bookingLocation', 'bookingNote'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', saveDraft);
  });

  loadDraft();

  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('bookingName').value.trim();
    const wa = document.getElementById('bookingWa').value.trim();
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const type = document.getElementById('bookingType').value;
    const location = document.getElementById('bookingLocation').value.trim();
    const agree = document.getElementById('agreeTerms').checked;
    const note = document.getElementById('bookingNote').value.trim();
    const refImg = document.getElementById('previewImg')?.src;

    if (!name || !wa || !date || !type || !location) return showToast('Lengkapi semua field wajib!', 'error');
    if (!agree) return showToast('Harap setujui syarat DP terlebih dahulu', 'warning');
    if (!/^08\d{8,12}$/.test(wa)) return showToast('Format nomor WA tidak valid (contoh: 08xxxxxxxxxx)', 'error');

    const code = genCode();
    const booking = { id: Date.now(), code, name, wa, date, time, type, location, note, refImg: refImg && refImg !== '' ? refImg : '', status: 'Menunggu', createdAt: new Date().toISOString(), estimatedPrice: 0 };
    const bookings = getLS('bookings', []);
    bookings.unshift(booking);
    setLS('bookings', bookings);
    setLS('bookingDraft', null);

    const codeDisplay = document.getElementById('bookingCodeDisplay');
    if (codeDisplay) codeDisplay.textContent = code;
    openModal('bookingModal');
    bookingForm.reset();
    clearUpload();
    showToast('Booking berhasil dikirim! 🎉', 'success');
  });
}

/* ---- STATUS CHECK ---- */
function checkBookingStatus() {
  const code = document.getElementById('statusSearchInput')?.value.trim().toUpperCase();
  const result = document.getElementById('statusResult');
  if (!code || !result) return;
  const bookings = getLS('bookings', []);
  const found = bookings.find(b => b.code === code);
  if (!found) {
    result.innerHTML = `<div class="status-badge-result" style="background:#fee2e2;color:#7f1d1d">Kode booking tidak ditemukan</div>`;
    return;
  }
  const colors = {
    'Menunggu': 'background:#fef3c7;color:#78350f',
    'Diproses': 'background:#dbeafe;color:#1e3a5f',
    'Disetujui': 'background:#d1fae5;color:#065f46',
    'Selesai': 'background:#ede9fe;color:#4c1d95',
    'Ditolak': 'background:#fee2e2;color:#7f1d1d',
  };
  result.innerHTML = `
    <div style="padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;margin-top:8px;font-size:13px;">
      <div><strong>${found.name}</strong></div>
      <div style="color:var(--text-light)">${found.type} • ${found.date}</div>
      <div style="margin-top:6px"><span class="status-badge-result" style="${colors[found.status] || ''};border-radius:20px;padding:3px 10px;font-weight:600;">${found.status}</span></div>
    </div>
  `;
}

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, textarea');
    const name = inputs[0]?.value;
    const wa = inputs[1]?.value;
    const msg = inputs[2]?.value;
    if (!name || !wa || !msg) return showToast('Lengkapi semua field', 'error');
    const text = encodeURIComponent(`Halo Mbak Intan,\n\nNama: ${name}\nNo WA: ${wa}\n\nPesan:\n${msg}`);
    window.open(`https://wa.me/6285692804808?text=${text}`, '_blank');
    contactForm.reset();
    showToast('Mengarahkan ke WhatsApp...', 'success');
  });
}

/* ---- INIT ---- */
renderPricelist();
renderGallery();
renderTestimonials();
renderFAQ();

// Set min date for booking
const dateInput = document.getElementById('bookingDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
