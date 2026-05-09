/* ============================================
   MAKEUP BY INTAN BERLIANDA - Admin JS
   ============================================ */

/* ---- UTILS ---- */
function getLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function setLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

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

function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function formatCurrency(n) {
  if (!n || n === 0) return 'Rp 0';
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function genCode() {
  return 'MUA' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

/* ---- DEFAULT DATA ---- */
const DEFAULT_PRICES = [
  { id: 1, name: 'Lamaran', price: 'Hubungi Kami', icon: '💍', desc: 'Makeup cantik untuk momen lamaran yang berkesan.', tag: 'Popular' },
  { id: 2, name: 'Wisuda', price: 'Hubungi Kami', icon: '🎓', desc: 'Tampil memesona di hari kelulusan.', tag: '' },
  { id: 3, name: 'Bridesmaid', price: 'Hubungi Kami', icon: '👰', desc: 'Seragam cantik untuk para bridesmaid.', tag: '' },
  { id: 4, name: 'Birthday Party', price: 'Hubungi Kami', icon: '🎂', desc: 'Glam up untuk birthday party.', tag: '' },
  { id: 5, name: 'Prewedding', price: 'Hubungi Kami', icon: '📷', desc: 'Makeup natural untuk prewedding.', tag: 'New' },
  { id: 6, name: 'Akad Nikah', price: 'Hubungi Kami', icon: '🕌', desc: 'Makeup sakral untuk akad nikah.', tag: '' },
  { id: 7, name: 'Resepsi', price: 'Hubungi Kami', icon: '👑', desc: 'Tampil sempurna di hari resepsi.', tag: 'Popular' },
  { id: 8, name: 'Kondangan', price: 'Hubungi Kami', icon: '✨', desc: 'Look elegan untuk kondangan.', tag: '' },
  { id: 9, name: 'Hair Do Hijab', price: 'Hubungi Kami', icon: '👒', desc: 'Styling hijab modern dan kreatif.', tag: '' },
  { id: 10, name: 'Photoshoot', price: 'Hubungi Kami', icon: '📸', desc: 'Makeup profesional untuk pemotretan.', tag: '' },
];

const DEFAULT_GALLERY = [
  { id: 1, url: '', caption: 'Makeup Lamaran', category: 'lamaran' },
  { id: 2, url: '', caption: 'Makeup Wisuda', category: 'wisuda' },
  { id: 3, url: '', caption: 'Makeup Pengantin', category: 'pengantin' },
  { id: 4, url: '', caption: 'Makeup Birthday', category: 'party' },
];

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Siti Rahma', service: 'Makeup Wisuda', rating: 5, text: 'Sangat puas dengan hasilnya! Makeup tahan seharian dan hasilnya cantik banget. Mbak Intan orangnya ramah dan profesional.', avatar: '' },
  { id: 2, name: 'Dewi Kusuma', service: 'Makeup Lamaran', rating: 5, text: 'Mbak Intan kerjaannya rapi dan hasilnya memuaskan. Makeup lamaran saya jadi yang terbaik!', avatar: '' },
  { id: 3, name: 'Annisa Putri', service: 'Akad & Resepsi', rating: 5, text: 'Pelayanan memuaskan, harga terjangkau, hasil makeup luar biasa! Semua tamu pesta bilang saya cantik banget.', avatar: '' },
];

/* ---- AUTH ---- */
const DEFAULT_CREDS = { username: 'admin', password: 'intan2025' };

function getCredentials() {
  return getLS('adminCreds', DEFAULT_CREDS);
}

function isLoggedIn() {
  return getLS('adminLoggedIn', false);
}

function checkLogin() {
  if (isLoggedIn()) {
    showDashboard();
  } else {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminLayout').style.display = 'none';
  }
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminLayout').style.display = 'flex';
  const creds = getCredentials();
  const uname = document.getElementById('adminUsername');
  if (uname) uname.textContent = creds.username;
  initDashboard();
}

/* ---- LOGIN FORM ---- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const creds = getCredentials();
    const err = document.getElementById('loginError');
    if (user === creds.username && pass === creds.password) {
      setLS('adminLoggedIn', true);
      if (err) err.style.display = 'none';
      showDashboard();
      showToast('Selamat datang, ' + user + '!', 'success');
    } else {
      if (err) { err.textContent = 'Username atau password salah!'; err.style.display = 'block'; }
    }
  });
}

const pwToggle = document.getElementById('pwToggle');
if (pwToggle) {
  pwToggle.addEventListener('click', () => {
    const inp = document.getElementById('loginPass');
    const icon = pwToggle.querySelector('i');
    if (inp.type === 'password') { inp.type = 'text'; icon.className = 'fas fa-eye-slash'; }
    else { inp.type = 'password'; icon.className = 'fas fa-eye'; }
  });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Yakin ingin logout?')) {
      setLS('adminLoggedIn', false);
      checkLogin();
      showToast('Berhasil logout', 'info');
    }
  });
}

/* ---- THEME ---- */
function initAdminTheme() {
  const saved = getLS('theme', 'light');
  const isDark = saved === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const icon = document.getElementById('adminThemeIcon');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  const toggle = document.getElementById('settingsDarkMode');
  if (toggle) toggle.checked = isDark;
}

const adminThemeBtn = document.getElementById('adminThemeToggle');
if (adminThemeBtn) {
  adminThemeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newDark = !isDark;
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    setLS('theme', newDark ? 'dark' : 'light');
    const icon = document.getElementById('adminThemeIcon');
    if (icon) icon.className = newDark ? 'fas fa-sun' : 'fas fa-moon';
    const toggle = document.getElementById('settingsDarkMode');
    if (toggle) toggle.checked = newDark;
  });
}

function toggleAdminDark(checkbox) {
  const newDark = checkbox.checked;
  document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
  setLS('theme', newDark ? 'dark' : 'light');
  const icon = document.getElementById('adminThemeIcon');
  if (icon) icon.className = newDark ? 'fas fa-sun' : 'fas fa-moon';
}

/* ---- SIDEBAR ---- */
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
if (sidebarClose) sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));

document.querySelectorAll('.sidebar-item[data-page]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const page = item.getAttribute('data-page');
    showPage(page);
    sidebar.classList.remove('open');
  });
});

function showPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const sideItem = document.querySelector(`.sidebar-item[data-page="${pageId}"]`);
  if (sideItem) sideItem.classList.add('active');
  const titles = { dashboard: 'Dashboard', bookings: 'Kelola Booking', calendar: 'Kalender Jadwal', gallery: 'Kelola Galeri', pricelist: 'Kelola Pricelist', testimonials: 'Kelola Testimoni', settings: 'Pengaturan' };
  const titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = titles[pageId] || pageId;

  if (pageId === 'dashboard') renderDashboard();
  if (pageId === 'bookings') renderBookingsTable();
  if (pageId === 'calendar') renderCalendar();
  if (pageId === 'gallery') renderGalleryAdmin();
  if (pageId === 'pricelist') renderPriceAdmin();
  if (pageId === 'testimonials') renderTestiAdmin();
}

/* ---- DASHBOARD ---- */
let bookingChart, statusChart;

function initDashboard() {
  initAdminTheme();
  renderDashboard();
}

function renderDashboard() {
  const bookings = getLS('bookings', []);
  const today = new Date().toISOString().split('T')[0];

  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'Menunggu').length;
  const done = bookings.filter(b => b.status === 'Selesai').length;
  const revenue = bookings.filter(b => b.status !== 'Ditolak').reduce((s, b) => s + (Number(b.estimatedPrice) || 0), 0);

  const e = id => document.getElementById(id);
  if (e('statTotal')) e('statTotal').textContent = total;
  if (e('statPending')) e('statPending').textContent = pending;
  if (e('statDone')) e('statDone').textContent = done;
  if (e('statRevenue')) e('statRevenue').textContent = formatCurrency(revenue);

  renderRecentBookings(bookings.slice(0, 5));
  renderBookingChart(bookings);
  renderStatusChart(bookings);
}

function renderRecentBookings(bookings) {
  const tbody = document.getElementById('recentBookingsTbody');
  if (!tbody) return;
  if (!bookings.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-light);padding:24px">Belum ada booking</td></tr>';
    return;
  }
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td><code style="font-size:12px;color:var(--pink-dark)">${b.code || '-'}</code></td>
      <td><strong>${b.name}</strong></td>
      <td>${b.type}</td>
      <td>${formatDate(b.date)}</td>
      <td><span class="status-badge ${(b.status||'').toLowerCase()}">${b.status}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn-icon view" onclick="viewBookingDetail('${b.id}')" title="Detail"><i class="fas fa-eye"></i></button>
          <button class="btn-icon edit" onclick="editBooking('${b.id}')" title="Edit"><i class="fas fa-edit"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderBookingChart(bookings) {
  const ctx = document.getElementById('bookingChart');
  if (!ctx) return;
  if (bookingChart) bookingChart.destroy();

  const days = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push(d.toLocaleDateString('id-ID', { weekday: 'short' }));
    counts.push(bookings.filter(b => b.date === key).length);
  }

  bookingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Booking',
        data: counts,
        borderColor: '#e8a0b4',
        backgroundColor: 'rgba(232,160,180,0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#e8a0b4',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, color: '#888' }, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { ticks: { color: '#888' }, grid: { display: false } }
      }
    }
  });
}

function renderStatusChart(bookings) {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;
  if (statusChart) statusChart.destroy();

  const statuses = ['Menunggu', 'Diproses', 'Disetujui', 'Selesai', 'Ditolak'];
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];
  const data = statuses.map(s => bookings.filter(b => b.status === s).length);

  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: statuses, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }] },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}` } }
      },
      cutout: '65%'
    }
  });

  const legend = document.getElementById('donutLegend');
  if (legend) {
    legend.innerHTML = statuses.map((s, i) =>
      `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span>${s}: <strong>${data[i]}</strong></div>`
    ).join('');
  }
}

function updateChart() {
  renderDashboard();
}

/* ---- BOOKINGS TABLE ---- */
let bookingsPage = 1;
const BOOKINGS_PER_PAGE = 10;
let currentBookingId = null;

function renderBookingsTable() {
  let bookings = getLS('bookings', []);
  const search = document.getElementById('bookingSearch')?.value.toLowerCase() || '';
  const filter = document.getElementById('bookingFilter')?.value || '';

  if (search) bookings = bookings.filter(b =>
    b.name?.toLowerCase().includes(search) ||
    b.code?.toLowerCase().includes(search) ||
    b.type?.toLowerCase().includes(search) ||
    b.wa?.includes(search)
  );
  if (filter) bookings = bookings.filter(b => b.status === filter);

  const total = bookings.length;
  const start = (bookingsPage - 1) * BOOKINGS_PER_PAGE;
  const paged = bookings.slice(start, start + BOOKINGS_PER_PAGE);

  const tbody = document.getElementById('bookingsTbody');
  if (!tbody) return;

  if (!paged.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--text-light);padding:32px"><i class="fas fa-calendar-times" style="font-size:32px;margin-bottom:8px;display:block;opacity:0.3"></i>Tidak ada data booking</td></tr>`;
  } else {
    tbody.innerHTML = paged.map(b => `
      <tr>
        <td><code style="font-size:12px;color:var(--pink-dark);font-weight:600">${b.code || '-'}</code></td>
        <td><strong>${b.name}</strong></td>
        <td><a href="https://wa.me/62${b.wa?.replace(/^0/,'')}" target="_blank" style="color:var(--pink-dark)">${b.wa}</a></td>
        <td>${b.type}</td>
        <td>${formatDate(b.date)}</td>
        <td>${b.time || '-'}</td>
        <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${b.location || ''}">${b.location || '-'}</td>
        <td>
          <select class="status-select" onchange="updateBookingStatus('${b.id}', this.value)" style="padding:4px 8px;border-radius:20px;border:1px solid var(--border);font-size:12px;font-weight:600;cursor:pointer;background:var(--surface);color:var(--text)">
            ${['Menunggu','Diproses','Disetujui','Selesai','Ditolak'].map(s => `<option value="${s}" ${b.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </td>
        <td>
          <div class="actions-cell">
            <button class="btn-icon view" onclick="viewBookingDetail('${b.id}')" title="Detail"><i class="fas fa-eye"></i></button>
            <button class="btn-icon edit" onclick="editBooking('${b.id}')" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete" onclick="deleteBooking('${b.id}')" title="Hapus"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderPagination(total, bookingsPage, BOOKINGS_PER_PAGE, 'bookingsPagination', (p) => { bookingsPage = p; renderBookingsTable(); });
}

function filterBookings() { bookingsPage = 1; renderBookingsTable(); }

function renderPagination(total, currentPage, perPage, containerId, onPage) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) { container.innerHTML = ''; return; }
  let html = '';
  if (currentPage > 1) html += `<button class="page-btn" onclick="(${onPage.toString()})(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPage.toString()})(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="padding:0 4px;color:var(--text-light)">...</span>`;
    }
  }
  if (currentPage < pages) html += `<button class="page-btn" onclick="(${onPage.toString()})(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  container.innerHTML = html;
}

function openAddBooking() {
  currentBookingId = null;
  document.getElementById('bookingModalTitle').textContent = 'Tambah Booking';
  document.getElementById('adminBookingForm').reset();
  document.getElementById('ab_id').value = '';
  openModal('bookingEditModal');
}

function editBooking(id) {
  const bookings = getLS('bookings', []);
  const b = bookings.find(b => String(b.id) === String(id));
  if (!b) return;
  currentBookingId = id;
  document.getElementById('bookingModalTitle').textContent = 'Edit Booking';
  document.getElementById('ab_id').value = b.id;
  document.getElementById('ab_name').value = b.name || '';
  document.getElementById('ab_wa').value = b.wa || '';
  document.getElementById('ab_date').value = b.date || '';
  document.getElementById('ab_time').value = b.time || '';
  document.getElementById('ab_type').value = b.type || '';
  document.getElementById('ab_status').value = b.status || 'Menunggu';
  document.getElementById('ab_location').value = b.location || '';
  document.getElementById('ab_price').value = b.estimatedPrice || '';
  document.getElementById('ab_note').value = b.note || '';
  openModal('bookingEditModal');
}

function deleteBooking(id) {
  if (!confirm('Yakin hapus booking ini?')) return;
  let bookings = getLS('bookings', []);
  bookings = bookings.filter(b => String(b.id) !== String(id));
  setLS('bookings', bookings);
  renderBookingsTable();
  renderDashboard();
  showToast('Booking dihapus', 'success');
}

function updateBookingStatus(id, status) {
  const bookings = getLS('bookings', []);
  const idx = bookings.findIndex(b => String(b.id) === String(id));
  if (idx === -1) return;
  bookings[idx].status = status;
  setLS('bookings', bookings);
  showToast(`Status diubah ke: ${status}`, 'success');
  renderDashboard();
}

function viewBookingDetail(id) {
  const bookings = getLS('bookings', []);
  const b = bookings.find(b => String(b.id) === String(id));
  if (!b) return;
  currentBookingId = id;
  const content = document.getElementById('detailContent');
  if (!content) return;
  content.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><label>Kode Booking</label><span style="font-weight:700;color:var(--pink-dark);font-size:18px;letter-spacing:2px">${b.code || '-'}</span></div>
      <div class="detail-item"><label>Status</label><span class="status-badge ${(b.status||'').toLowerCase()}">${b.status}</span></div>
      <div class="detail-item"><label>Nama</label><span>${b.name}</span></div>
      <div class="detail-item"><label>WhatsApp</label><span><a href="https://wa.me/62${b.wa?.replace(/^0/,'')}" target="_blank" style="color:var(--pink-dark)">${b.wa}</a></span></div>
      <div class="detail-item"><label>Tanggal</label><span>${formatDate(b.date)}</span></div>
      <div class="detail-item"><label>Jam</label><span>${b.time || '-'}</span></div>
      <div class="detail-item"><label>Jenis Makeup</label><span>${b.type}</span></div>
      <div class="detail-item"><label>Est. Harga</label><span style="font-weight:600;color:var(--pink-dark)">${formatCurrency(b.estimatedPrice)}</span></div>
    </div>
    <div class="detail-item" style="margin-bottom:12px"><label>Lokasi</label><span>${b.location || '-'}</span></div>
    <div class="detail-item" style="margin-bottom:12px"><label>Catatan</label><span>${b.note || '-'}</span></div>
    <div class="detail-item"><label>Tanggal Daftar</label><span>${b.createdAt ? new Date(b.createdAt).toLocaleString('id-ID') : '-'}</span></div>
    ${b.refImg ? `<div style="margin-top:12px"><label style="font-size:12px;color:var(--text-light);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px">Referensi Makeup</label><img src="${b.refImg}" class="detail-ref-img" alt="ref" /></div>` : ''}
  `;
  openModal('detailModal');
}

// Admin booking form submit
const adminBookingForm = document.getElementById('adminBookingForm');
if (adminBookingForm) {
  adminBookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('ab_id').value;
    const name = document.getElementById('ab_name').value.trim();
    const wa = document.getElementById('ab_wa').value.trim();
    const date = document.getElementById('ab_date').value;
    const time = document.getElementById('ab_time').value;
    const type = document.getElementById('ab_type').value;
    const status = document.getElementById('ab_status').value;
    const location = document.getElementById('ab_location').value.trim();
    const price = document.getElementById('ab_price').value;
    const note = document.getElementById('ab_note').value.trim();
    if (!name || !wa || !date || !type) return showToast('Lengkapi field wajib!', 'error');

    let bookings = getLS('bookings', []);
    if (id) {
      const idx = bookings.findIndex(b => String(b.id) === String(id));
      if (idx !== -1) {
        bookings[idx] = { ...bookings[idx], name, wa, date, time, type, status, location, estimatedPrice: Number(price) || 0, note };
        showToast('Booking diperbarui!', 'success');
      }
    } else {
      const newBooking = { id: Date.now(), code: genCode(), name, wa, date, time, type, status, location, estimatedPrice: Number(price) || 0, note, refImg: '', createdAt: new Date().toISOString() };
      bookings.unshift(newBooking);
      showToast('Booking ditambahkan!', 'success');
    }
    setLS('bookings', bookings);
    closeModal('bookingEditModal');
    renderBookingsTable();
    renderDashboard();
  });
}

/* ---- EXPORT / IMPORT ---- */
function exportBookings() {
  const bookings = getLS('bookings', []);
  const data = JSON.stringify(bookings, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bookings_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data berhasil diekspor!', 'success');
}

function importBookings(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');
      if (!confirm(`Import ${data.length} booking? Data existing akan digabung.`)) return;
      const existing = getLS('bookings', []);
      const existingIds = new Set(existing.map(b => b.id));
      const newData = data.filter(b => !existingIds.has(b.id));
      setLS('bookings', [...existing, ...newData]);
      renderBookingsTable();
      renderDashboard();
      showToast(`Berhasil import ${newData.length} booking baru!`, 'success');
    } catch (err) {
      showToast('Format file tidak valid!', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

/* ---- PRINT INVOICE ---- */
function printInvoice() {
  if (!currentBookingId) return;
  const bookings = getLS('bookings', []);
  const b = bookings.find(b => String(b.id) === String(currentBookingId));
  if (!b) return;
  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html><html><head>
    <title>Invoice - ${b.code}</title>
    <style>
      body{font-family:'DM Sans',sans-serif;max-width:600px;margin:40px auto;padding:20px;color:#2d2d2d}
      .header{text-align:center;border-bottom:2px solid #e8a0b4;padding-bottom:20px;margin-bottom:24px}
      .logo{font-size:28px;color:#c4738c;font-style:italic;margin-bottom:4px}
      .sub{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c9a882}
      .code{font-size:14px;background:#f9dde6;color:#c4738c;padding:8px 20px;border-radius:20px;display:inline-block;margin-top:8px;font-weight:700;letter-spacing:2px}
      table{width:100%;border-collapse:collapse;margin:16px 0}
      td{padding:10px;border-bottom:1px solid #f0e0e6;font-size:14px}
      td:first-child{color:#888;width:140px}
      td:last-child{font-weight:500}
      .total{background:#f9dde6;font-size:16px;font-weight:700;color:#c4738c}
      .footer{text-align:center;margin-top:32px;font-size:12px;color:#888}
      @media print{body{margin:0}}
    </style>
    </head><body>
    <div class="header">
      <div class="logo">Makeup By Intan Berlianda</div>
      <div class="sub">Professional Makeup Artist • Bekasi</div>
      <div class="code">${b.code}</div>
    </div>
    <table>
      <tr><td>Nama Klien</td><td>${b.name}</td></tr>
      <tr><td>WhatsApp</td><td>${b.wa}</td></tr>
      <tr><td>Jenis Layanan</td><td>${b.type}</td></tr>
      <tr><td>Tanggal</td><td>${formatDate(b.date)}</td></tr>
      <tr><td>Jam</td><td>${b.time || '-'}</td></tr>
      <tr><td>Lokasi</td><td>${b.location || '-'}</td></tr>
      <tr><td>Catatan</td><td>${b.note || '-'}</td></tr>
      <tr><td>Status</td><td><strong>${b.status}</strong></td></tr>
      <tr class="total"><td>Est. Harga</td><td>${formatCurrency(b.estimatedPrice)}</td></tr>
    </table>
    <p style="font-size:13px;color:#888;margin-top:16px">* DP minimal 50% setelah konfirmasi. Harga termasuk transport area Bekasi.<br>* Free bulu mata, softlens & fake nails.</p>
    <div class="footer">
      <p>Terima kasih telah mempercayakan penampilan Anda kepada kami 💄</p>
      <p>WA: 085692804808 | IG: @berlianmakeup</p>
      <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
    </div>
    <script>window.print();window.onafterprint=()=>window.close()<\/script>
    </body></html>
  `);
  win.document.close();
}

/* ---- CALENDAR ---- */
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

function renderCalendar() {
  const bookings = getLS('bookings', []);
  const titleEl = document.getElementById('calTitle');
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  if (titleEl) titleEl.textContent = `${months[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date().toISOString().split('T')[0];

  const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  let html = days.map(d => `<div class="cal-day-header">${d}</div>`).join('');

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-day other-month"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayBookings = bookings.filter(b => b.date === dateStr);
    const isToday = dateStr === today;
    const hasBooking = dayBookings.length > 0;
    html += `
      <div class="cal-day ${isToday ? 'today' : ''} ${hasBooking ? 'has-booking' : ''}" onclick="showDayDetail('${dateStr}')">
        <div class="cal-day-num">${d}</div>
        <div class="cal-events">
          ${dayBookings.slice(0, 2).map(b => {
            const cls = b.status === 'Disetujui' ? 'approved' : b.status === 'Selesai' ? 'done' : 'pending';
            return `<div class="cal-event ${cls}" title="${b.name}">${b.name.split(' ')[0]}</div>`;
          }).join('')}
          ${dayBookings.length > 2 ? `<div class="cal-event pending">+${dayBookings.length - 2} lagi</div>` : ''}
        </div>
      </div>
    `;
  }
  grid.innerHTML = html;
}

function showDayDetail(dateStr) {
  const bookings = getLS('bookings', []).filter(b => b.date === dateStr);
  const detail = document.getElementById('dayDetail');
  const title = document.getElementById('dayDetailTitle');
  const list = document.getElementById('dayDetailList');
  if (!detail || !list) return;
  detail.style.display = 'block';
  if (title) title.textContent = `Jadwal ${formatDate(dateStr)}`;
  if (!bookings.length) {
    list.innerHTML = '<p style="color:var(--text-light);font-size:14px">Tidak ada booking pada tanggal ini</p>';
    return;
  }
  list.innerHTML = bookings.map(b => `
    <div class="day-booking-item">
      <strong>${b.name}</strong>
      <span>${b.type} • ${b.time || 'waktu belum ditentukan'}</span>
      <span style="margin-top:4px"><span class="status-badge ${(b.status||'').toLowerCase()}">${b.status}</span></span>
    </div>
  `).join('');
}

function prevMonth() { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); }
function nextMonth() { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); }

/* ---- GALLERY ADMIN ---- */
function renderGalleryAdmin() {
  const gallery = getLS('gallery', DEFAULT_GALLERY);
  const grid = document.getElementById('galleryAdminGrid');
  if (!grid) return;
  grid.innerHTML = gallery.map(g => `
    <div class="gallery-admin-card">
      <div class="gallery-admin-img">
        ${g.url ? `<img src="${g.url}" alt="${g.caption}" />` : `<span style="font-size:40px">💄</span>`}
      </div>
      <div class="gallery-admin-info">
        <strong>${g.caption}</strong>
        <small>${g.category}</small>
      </div>
      <div class="gallery-admin-actions">
        <button class="btn-icon edit" onclick="editGallery(${g.id})" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn-icon delete" onclick="deleteGallery(${g.id})" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openAddGallery() {
  document.getElementById('galleryModalTitle').textContent = 'Tambah Foto';
  document.getElementById('galleryForm').reset();
  document.getElementById('gal_id').value = '';
  document.getElementById('gal_preview').innerHTML = '';
  openModal('galleryModal');
}

function editGallery(id) {
  const gallery = getLS('gallery', DEFAULT_GALLERY);
  const g = gallery.find(x => x.id === id);
  if (!g) return;
  document.getElementById('galleryModalTitle').textContent = 'Edit Foto';
  document.getElementById('gal_id').value = g.id;
  document.getElementById('gal_url').value = g.url || '';
  document.getElementById('gal_caption').value = g.caption || '';
  document.getElementById('gal_cat').value = g.category || 'all';
  const prev = document.getElementById('gal_preview');
  if (prev && g.url) prev.innerHTML = `<img src="${g.url}" style="max-height:100px;border-radius:8px;margin-top:8px" />`;
  openModal('galleryModal');
}

function deleteGallery(id) {
  if (!confirm('Hapus foto ini?')) return;
  let gallery = getLS('gallery', DEFAULT_GALLERY);
  gallery = gallery.filter(g => g.id !== id);
  setLS('gallery', gallery);
  renderGalleryAdmin();
  showToast('Foto dihapus', 'success');
}

function previewGalFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById('gal_preview');
    if (prev) prev.innerHTML = `<img src="${e.target.result}" style="max-height:120px;border-radius:8px;margin-top:8px;border:1px solid var(--border)" />`;
    document.getElementById('gal_url').value = e.target.result;
  };
  reader.readAsDataURL(file);
}

const galleryForm = document.getElementById('galleryForm');
if (galleryForm) {
  galleryForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('gal_id').value;
    const url = document.getElementById('gal_url').value.trim();
    const caption = document.getElementById('gal_caption').value.trim();
    const category = document.getElementById('gal_cat').value;
    let gallery = getLS('gallery', DEFAULT_GALLERY);
    if (id) {
      const idx = gallery.findIndex(g => String(g.id) === String(id));
      if (idx !== -1) gallery[idx] = { ...gallery[idx], url, caption, category };
      showToast('Foto diperbarui!', 'success');
    } else {
      gallery.push({ id: Date.now(), url, caption, category });
      showToast('Foto ditambahkan!', 'success');
    }
    setLS('gallery', gallery);
    closeModal('galleryModal');
    renderGalleryAdmin();
  });
}

/* ---- PRICELIST ADMIN ---- */
function renderPriceAdmin() {
  const prices = getLS('prices', DEFAULT_PRICES);
  const grid = document.getElementById('priceAdminGrid');
  if (!grid) return;
  grid.innerHTML = prices.map(p => `
    <div class="price-admin-card">
      <div class="price-admin-icon">${p.icon || '💄'}</div>
      <div class="price-admin-name">${p.name}</div>
      <div class="price-admin-price">${p.price}</div>
      <div class="price-admin-desc">${p.desc || ''}</div>
      ${p.tag ? `<span style="background:var(--pink-light);color:var(--pink-dark);padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600">${p.tag}</span>` : ''}
      <div class="price-admin-actions">
        <button class="btn-icon edit" onclick="editPrice(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn-icon delete" onclick="deletePrice(${p.id})" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openAddPrice() {
  document.getElementById('priceModalTitle').textContent = 'Tambah Layanan';
  document.getElementById('priceForm').reset();
  document.getElementById('pr_id').value = '';
  openModal('priceModal');
}

function editPrice(id) {
  const prices = getLS('prices', DEFAULT_PRICES);
  const p = prices.find(x => x.id === id);
  if (!p) return;
  document.getElementById('priceModalTitle').textContent = 'Edit Layanan';
  document.getElementById('pr_id').value = p.id;
  document.getElementById('pr_name').value = p.name || '';
  document.getElementById('pr_price').value = p.price || '';
  document.getElementById('pr_icon').value = p.icon || '';
  document.getElementById('pr_desc').value = p.desc || '';
  document.getElementById('pr_tag').value = p.tag || '';
  openModal('priceModal');
}

function deletePrice(id) {
  if (!confirm('Hapus layanan ini?')) return;
  let prices = getLS('prices', DEFAULT_PRICES);
  prices = prices.filter(p => p.id !== id);
  setLS('prices', prices);
  renderPriceAdmin();
  showToast('Layanan dihapus', 'success');
}

const priceForm = document.getElementById('priceForm');
if (priceForm) {
  priceForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('pr_id').value;
    const name = document.getElementById('pr_name').value.trim();
    const price = document.getElementById('pr_price').value.trim();
    const icon = document.getElementById('pr_icon').value.trim();
    const desc = document.getElementById('pr_desc').value.trim();
    const tag = document.getElementById('pr_tag').value.trim();
    if (!name || !price) return showToast('Nama dan harga wajib diisi!', 'error');
    let prices = getLS('prices', DEFAULT_PRICES);
    if (id) {
      const idx = prices.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) prices[idx] = { ...prices[idx], name, price, icon, desc, tag };
      showToast('Layanan diperbarui!', 'success');
    } else {
      prices.push({ id: Date.now(), name, price, icon: icon || '💄', desc, tag });
      showToast('Layanan ditambahkan!', 'success');
    }
    setLS('prices', prices);
    closeModal('priceModal');
    renderPriceAdmin();
  });
}

/* ---- TESTIMONIAL ADMIN ---- */
function renderTestiAdmin() {
  const testis = getLS('testimonials', DEFAULT_TESTIMONIALS);
  const grid = document.getElementById('testiAdminGrid');
  if (!grid) return;
  grid.innerHTML = testis.map(t => `
    <div class="testi-admin-card">
      <div class="testi-admin-header">
        <div class="testi-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      </div>
      <div class="testi-admin-text">"${t.text}"</div>
      <div class="testi-admin-name">${t.name}</div>
      <div class="testi-admin-service">${t.service}</div>
      <div class="testi-admin-actions">
        <button class="btn-icon edit" onclick="editTestimonial(${t.id})" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn-icon delete" onclick="deleteTestimonial(${t.id})" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openAddTestimonial() {
  document.getElementById('testiModalTitle').textContent = 'Tambah Testimoni';
  document.getElementById('testiForm').reset();
  document.getElementById('te_id').value = '';
  document.getElementById('te_rating').value = 5;
  openModal('testiModal');
}

function editTestimonial(id) {
  const testis = getLS('testimonials', DEFAULT_TESTIMONIALS);
  const t = testis.find(x => x.id === id);
  if (!t) return;
  document.getElementById('testiModalTitle').textContent = 'Edit Testimoni';
  document.getElementById('te_id').value = t.id;
  document.getElementById('te_name').value = t.name || '';
  document.getElementById('te_service').value = t.service || '';
  document.getElementById('te_rating').value = t.rating || 5;
  document.getElementById('te_text').value = t.text || '';
  document.getElementById('te_avatar').value = t.avatar || '';
  openModal('testiModal');
}

function deleteTestimonial(id) {
  if (!confirm('Hapus testimoni ini?')) return;
  let testis = getLS('testimonials', DEFAULT_TESTIMONIALS);
  testis = testis.filter(t => t.id !== id);
  setLS('testimonials', testis);
  renderTestiAdmin();
  showToast('Testimoni dihapus', 'success');
}

const testiForm = document.getElementById('testiForm');
if (testiForm) {
  testiForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('te_id').value;
    const name = document.getElementById('te_name').value.trim();
    const service = document.getElementById('te_service').value.trim();
    const rating = parseInt(document.getElementById('te_rating').value) || 5;
    const text = document.getElementById('te_text').value.trim();
    const avatar = document.getElementById('te_avatar').value.trim();
    if (!name || !text) return showToast('Nama dan testimoni wajib diisi!', 'error');
    let testis = getLS('testimonials', DEFAULT_TESTIMONIALS);
    if (id) {
      const idx = testis.findIndex(t => String(t.id) === String(id));
      if (idx !== -1) testis[idx] = { ...testis[idx], name, service, rating, text, avatar };
      showToast('Testimoni diperbarui!', 'success');
    } else {
      testis.push({ id: Date.now(), name, service, rating, text, avatar });
      showToast('Testimoni ditambahkan!', 'success');
    }
    setLS('testimonials', testis);
    closeModal('testiModal');
    renderTestiAdmin();
  });
}

/* ---- SETTINGS ---- */
const changeCredForm = document.getElementById('changeCredForm');
if (changeCredForm) {
  changeCredForm.addEventListener('submit', e => {
    e.preventDefault();
    const newU = document.getElementById('newUsername').value.trim();
    const newP = document.getElementById('newPassword').value;
    const confP = document.getElementById('confirmPassword').value;
    if (!newU || !newP) return showToast('Username dan password tidak boleh kosong!', 'error');
    if (newP !== confP) return showToast('Konfirmasi password tidak cocok!', 'error');
    setLS('adminCreds', { username: newU, password: newP });
    const uname = document.getElementById('adminUsername');
    if (uname) uname.textContent = newU;
    changeCredForm.reset();
    showToast('Kredensial berhasil diubah!', 'success');
  });
}

const contactInfoForm = document.getElementById('contactInfoForm');
if (contactInfoForm) {
  contactInfoForm.addEventListener('submit', e => {
    e.preventDefault();
    const wa = document.getElementById('settingsWa').value;
    const ig = document.getElementById('settingsIg').value;
    const loc = document.getElementById('settingsLoc').value;
    setLS('contactInfo', { wa, ig, loc });
    showToast('Informasi kontak disimpan!', 'success');
  });
}

function changeThemeColor(color) { showToast(`Tema ${color} diterapkan!`, 'info'); }

function resetAllData() {
  if (!confirm('PERHATIAN: Semua data booking akan dihapus permanen! Yakin?')) return;
  if (!confirm('Konfirmasi sekali lagi: hapus semua data booking?')) return;
  localStorage.removeItem('bookings');
  renderBookingsTable();
  renderDashboard();
  showToast('Semua data booking telah direset!', 'warning');
}

/* ---- INIT ---- */
checkLogin();
