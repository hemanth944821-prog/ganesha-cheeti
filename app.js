// ============================================================
// Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ) - Native Mobile App Engine & UI Utils
// ============================================================

// Relative API Base URL for Vercel deployment and local dev
const API_BASE_URL = window.location.origin.includes('localhost:3000') 
  ? 'http://localhost:5000/api' 
  : '/api';

// Bilingual Dictionary
const i18n = {
  en: {
    appTitle: "Ganesha Cheeti",
    appSubTitle: "Community Savings & Growth",
    welcome: "Welcome!",
    userGreeting: "Welcome, Ramesh!",
    groupName: "Group: Sri Ganesh Friends",
    totalSavings: "Total Savings",
    completedYears: "Completed 2 Years",
    monthlyContribution: "Monthly Contribution",
    perMember: "(per member)",
    nextCheeti: "Next Cheeti",
    nextDrawDate: "Next draw date",
    interestPaid: "Interest (to be paid)",
    approxInterest: "5% (approx) - Varies as per group",
    festivalExpenses: "Festival & Expenses",
    soFarThisYear: "so far this year",
    cheetiConductNotice: "Cheeti will be conducted on 12th of every month.",
    
    // Nav Items
    home: "Home",
    contributions: "Contributions",
    payouts: "Payouts",
    expenses: "Expenses",
    members: "Members",
    reports: "Reports",
    settings: "Settings",
    more: "More",

    // Action buttons
    getStarted: "Get Started",
    alreadyAccount: "Already have an account? Login",
    submitContribution: "Submit Contribution",
    addExpense: "+ Add Expense",

    // Screen Titles
    cheetiDetails: "Cheeti Details",
    makeContribution: "Make Contribution",
    payoutCheetiWinner: "Payout / Cheeti Winner",
    lastMonthWinner: "Last Month Winner",
    payoutHistory: "Payout History",
    reportsSummary: "Reports & Summary",
    
    // Labels
    amountPerMember: "Amount per Member",
    yourContribution: "Your Contribution",
    paymentMethod: "Payment Method",
    cash: "Cash (Manual Entry)",
    upi: "UPI",
    bankTransfer: "Bank Transfer",
    totalMembers: "Total Members: 15",
    ourGoal: "Our Goal – Benefit for all members.",
    
    // Filter Chips
    all: "All",
    festival: "Festival",
    temple: "Temple",
    other: "Other"
  },
  kn: {
    appTitle: "ಗಣೇಶ ಚೀಟಿ",
    appSubTitle: "ಒಟ್ಟಾಗಿ ಉಳಿತಾಯ – ಒಟ್ಟಾಗಿ ಅಭಿವೃದ್ಧಿ",
    welcome: "ಸ್ವಾಗತ!",
    userGreeting: "ನಮಸ್ಕಾರ, Ramesh!",
    groupName: "ಗುಂಪು: ಶ್ರೀ ಗಣೇಶ್ ಫ್ರೆಂಡ್ಸ್",
    totalSavings: "ಒಟ್ಟು ಉಳಿತಾಯ",
    completedYears: "2 ವರ್ಷಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ",
    monthlyContribution: "ತಿಂಗಳ ಕೊಡುಗೆ",
    perMember: "(ಪ್ರತಿ ಸದಸ್ಯರಿಗೆ)",
    nextCheeti: "ಮುಂದಿನ ಚೀಟಿ",
    nextDrawDate: "ಮುಂದಿನ ಡ್ರಾ ದಿನಾಂಕ",
    interestPaid: "ಬಡ್ಡಿ (ನೀಡಬೇಕಾದದ್ದು)",
    approxInterest: "5% (ಅಂದಾಜು) - ಗುಂಪಿನ ನಿಯಮದಂತೆ",
    festivalExpenses: "ಹಬ್ಬದ ಮತ್ತು ಇತರ ಖರ್ಚುಗಳು",
    soFarThisYear: "ಈ ವರ್ಷ ಇಲ್ಲಿಯವರೆಗೆ",
    cheetiConductNotice: "ಪ್ರತಿ 12ನೇ ತಾರೀಖಿಗೆ ಚೀಟಿ ನಡೆಯುತ್ತದೆ.",
    
    // Nav Items
    home: "ಮುಖಪುಟ",
    contributions: "ಕೊಡುಗೆ",
    payouts: "ಪಾವತಿ",
    expenses: "ಖರ್ಚುಗಳು",
    members: "ಸದಸ್ಯರು",
    reports: "ವರದಿಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    more: "ಮತ್ತಷ್ಟು",

    // Action buttons
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    alreadyAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್",
    submitContribution: "ಕೊಡುಗೆ ಸಲ್ಲಿಸಿ",
    addExpense: "+ ಖರ್ಚು ಸೇರಿಸಿ",

    // Screen Titles
    cheetiDetails: "ಚೀಟಿ ವಿವರಗಳು",
    makeContribution: "ತಿಂಗಳ ಕೊಡುಗೆ",
    payoutCheetiWinner: "ಚೀಟಿ ಗೆದ್ದವರು / ಪಾವತಿ",
    lastMonthWinner: "ಕಳೆದ ತಿಂಗಳ ವಿಜೇತ",
    payoutHistory: "ಪಾವತಿ ಇತಿಹಾಸ",
    reportsSummary: "ವರದಿಗಳು & ಸಾರಾಂಶ",

    // Labels
    amountPerMember: "ಪ್ರತಿ ಸದಸ್ಯರ ಮೊತ್ತ",
    yourContribution: "ನಿಮ್ಮ ಕೊಡುಗೆ",
    paymentMethod: "ಪಾವತಿ ವಿಧಾನ",
    cash: "ನಗದು (ಮ್ಯಾನುಯಲ್ ನಮೂದು)",
    upi: "ಯುಪಿಐ (UPI)",
    bankTransfer: "ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ",
    totalMembers: "ಒಟ್ಟು ಸದಸ್ಯರು: 15",
    ourGoal: "ನಮ್ಮ ಗುರಿ – ಎಲ್ಲರಿಗೂ ಲಾಭ",

    // Filter Chips
    all: "ಎಲ್ಲಾ",
    festival: "ಹಬ್ಬ",
    temple: "ದೇವಾಲಯ",
    other: "ಇತರ"
  }
};

// Current App State
let currentLang = 'kn';
let currentScreen = 'splash';
let totalSavingsVal = 90000;
let totalExpensesVal = 8450;
let currentUser = null;

// Members List Data
const membersData = [
  { id: 1, code: 'M#01', nameEn: 'Ganesh (Admin)', nameKn: 'ಗಣೇಶ್ (ಅಡ್ಮಿನ್)', phone: '9876543210', role: 'Admin', status: 'Active' },
  { id: 2, code: 'M#02', nameEn: 'Ramesh', nameKn: 'ರಮೇಶ್', phone: '9876543211', role: 'Member', status: 'Active' },
  { id: 3, code: 'M#03', nameEn: 'Suresh', nameKn: 'ಸುರೇಶ್', phone: '9876543212', role: 'Member', status: 'Active' },
  { id: 4, code: 'M#04', nameEn: 'Mahesh', nameKn: 'ಮಹೇಶ್', phone: '9876543213', role: 'Member', status: 'Active' },
  { id: 5, code: 'M#05', nameEn: 'Ravi', nameKn: 'ರವಿ', phone: '9876543214', role: 'Member', status: 'Active' },
  { id: 6, code: 'M#06', nameEn: 'Shankar', nameKn: 'ಶಂಕರ್', phone: '9876543215', role: 'Member', status: 'Active' },
  { id: 7, code: 'M#07', nameEn: 'Ramesh Kumar', nameKn: 'ರಮೇಶ್ ಕುಮಾರ್', phone: '9876543216', role: 'Member', status: 'Active' },
  { id: 8, code: 'M#08', nameEn: 'Lakshmi', nameKn: 'ಲಕ್ಷ್ಮಿ', phone: '9876543217', role: 'Member', status: 'Active' },
  { id: 9, code: 'M#09', nameEn: 'Anitha', nameKn: 'ಅನಿತಾ', phone: '9876543218', role: 'Member', status: 'Active' },
  { id: 10, code: 'M#10', nameEn: 'Kumar', nameKn: 'ಕುಮಾರ್', phone: '9876543219', role: 'Member', status: 'Active' },
  { id: 11, code: 'M#11', nameEn: 'Pooja', nameKn: 'ಪೂಜಾ', phone: '9876543220', role: 'Member', status: 'Active' },
  { id: 12, code: 'M#12', nameEn: 'Manjunath', nameKn: 'ಮಂಜುನಾಥ್', phone: '9876543221', role: 'Member', status: 'Active' },
  { id: 13, code: 'M#13', nameEn: 'Shivaram', nameKn: 'ಶಿವರಾಮ್', phone: '9876543222', role: 'Member', status: 'Active' },
  { id: 14, code: 'M#14', nameEn: 'Basavaraj', nameKn: 'ಬಸವರಾಜ್', phone: '9876543223', role: 'Member', status: 'Active' },
  { id: 15, code: 'M#15', nameEn: 'Venkatesh', nameKn: 'ವೆಂಕಟೇಶ್', phone: '9876543224', role: 'Member', status: 'Active' }
];

// Expenses Data
const expensesData = [
  { id: 1, titleEn: "Ganesh Chaturthi Puja (Temple & Prasad)", titleKn: "ಗಣೇಶ ಚತುರ್ಥಿ ಪೂಜೆ (ದೇವಾಲಯ ಮತ್ತು ಪ್ರಸಾದ)", date: "12 Sep 2026", category: "festival", amount: 2500 },
  { id: 2, titleEn: "Group Dinner", titleKn: "ಗುಂಪು ಊಟ", date: "05 Aug 2026", category: "other", amount: 1800 },
  { id: 3, titleEn: "Temple Donation", titleKn: "ದೇವಾಲಯ ದೇಣಿಗೆ", date: "15 Jan 2026", category: "temple", amount: 1000 },
  { id: 4, titleEn: "Flowers & Decoration", titleKn: "ಹೂವುಗಳು ಮತ್ತು ಅಲಂಕಾರ", date: "27 Aug 2025", category: "festival", amount: 950 },
  { id: 5, titleEn: "Miscellaneous", titleKn: "ಇತರ ಖರ್ಚುಗಳು", date: "10 May 2025", category: "other", amount: 1200 }
];

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  fetchLiveDataFromBackend();
  renderMembersList();
  renderExpensesList('all');
  loadNotificationsData();
  checkAutomatedReminders();
  updateI18nText();
});

// --- CUSTOM MOBILE TOAST NOTIFICATION ENGINE (REPLACES BROWSER ALERTS) ---
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --- FULLSCREEN SPINNER UTILITIES ---
function showSpinner(text = 'Processing...') {
  const overlay = document.getElementById('appSpinner');
  const txt = document.getElementById('spinnerText');
  if (txt) txt.textContent = text;
  if (overlay) overlay.classList.add('active');
}

function hideSpinner() {
  const overlay = document.getElementById('appSpinner');
  if (overlay) overlay.classList.remove('active');
}

// Fetch Live Data
async function fetchLiveDataFromBackend() {
  try {
    const resSummary = await fetch(`${API_BASE_URL}/summary`);
    if (resSummary.ok) {
      const data = await resSummary.json();
      totalSavingsVal = data.totalSavings || 90000;
      totalExpensesVal = data.totalExpenses || 7450;
      
      document.querySelectorAll('.savings-total-val').forEach(el => {
        el.textContent = `₹ ${totalSavingsVal.toLocaleString()}`;
      });
      document.querySelectorAll('.expenses-total-val').forEach(el => {
        el.textContent = `₹ ${totalExpensesVal.toLocaleString()}`;
      });
    }

    const resMembers = await fetch(`${API_BASE_URL}/members`);
    if (resMembers.ok) {
      const apiMems = await resMembers.json();
      if (apiMems && apiMems.length > 0) {
        membersData.length = 0;
        apiMems.forEach(m => {
          membersData.push({
            id: m.MemberID,
            code: m.MemberCode,
            nameEn: m.Name_EN,
            nameKn: m.Name_KN || m.Name_EN,
            phone: m.Phone,
            role: m.Role || 'Member',
            status: m.Status || 'Active'
          });
        });
        renderMembersList();
        populateMemberDropdowns();
      }
    }
  } catch (err) {
    console.log('Using local client state (API connection active)');
  }
}

// Toggle Language Engine
function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'kn' : 'en';
  document.querySelectorAll('.lang-btn-text').forEach(btn => {
    btn.textContent = (currentLang === 'en') ? 'ಕನ್ನಡ' : 'English';
  });
  updateI18nText();
  renderMembersList();
  renderExpensesList('all');
  if (currentUser) populateProfileModal();
}

function updateI18nText() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// Password Visibility Eye Toggle
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  }
}

// Quick Demo Fill with Admin Checkbox Sync
function fillDemoLogin(phone, pwd, isAdmin = false) {
  document.getElementById('loginPhone').value = phone;
  document.getElementById('loginPassword').value = pwd;
  const chk = document.getElementById('chkAdminRole');
  if (chk) {
    chk.checked = isAdmin;
    handleAdminCheckboxToggle(chk);
  }
}

function handleAdminCheckboxToggle(chk) {
  const wrapper = chk.closest('.checkbox-admin-wrapper');
  if (wrapper) {
    if (chk.checked) {
      wrapper.classList.add('checked');
    } else {
      wrapper.classList.remove('checked');
    }
  }
}

// Login Submission Handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;
  const isAdminChecked = document.getElementById('chkAdminRole').checked;

  showSpinner(currentLang === 'kn' ? 'ಲಾಗಿನ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Verifying Credentials...');

  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    const result = await res.json();
    hideSpinner();

    if (res.ok && result.success) {
      currentUser = result.user;
      if (isAdminChecked) currentUser.Role = 'Admin';
      applyUserSession();
      showToast(currentLang === 'kn' ? `ಸ್ವಾಗತ ${currentUser.Name_KN || currentUser.Name_EN}!` : `Welcome ${currentUser.Name_EN}!`, 'success');
      navigateTo('dashboard');
    } else {
      showToast(result.message || 'Invalid Login Details', 'error');
    }
  } catch (err) {
    hideSpinner();
    const localUser = membersData.find(m => m.phone === phone);
    if (localUser) {
      if (localUser.status === 'Inactive') {
        showToast('Your account is inactive. Please contact Admin.', 'error');
        return;
      }
      currentUser = { MemberID: localUser.id, Name_EN: localUser.nameEn, Name_KN: localUser.nameKn, Role: isAdminChecked ? 'Admin' : localUser.role, Phone: localUser.phone, Code: localUser.code };
      applyUserSession();
      showToast(`Welcome ${currentUser.Name_EN}!`, 'success');
      navigateTo('dashboard');
    } else {
      showToast('Invalid Phone Number or Password', 'error');
    }
  }
}

// User Session & Profile Setup
function applyUserSession() {
  const greeting = document.getElementById('userGreetingText');
  const banner = document.getElementById('adminModeBanner');
  const testCard = document.getElementById('adminPushTestHomeCard');
  const adminBtns = document.querySelectorAll('.admin-only-btn');
  const headerAvatar = document.getElementById('userAvatarHeader');

  if (currentUser) {
    const name = (currentLang === 'kn') ? (currentUser.Name_KN || currentUser.Name_EN) : currentUser.Name_EN;
    if (greeting) greeting.textContent = (currentLang === 'kn') ? `ನಮಸ್ಕಾರ, ${name}!` : `Welcome, ${name}!`;

    if (headerAvatar) {
      headerAvatar.textContent = currentUser.Name_EN.charAt(0);
      headerAvatar.style.fontWeight = 'bold';
    }

    if (currentUser.Role === 'Admin') {
      if (banner) banner.style.display = 'flex';
      if (testCard) testCard.style.display = 'block';
      adminBtns.forEach(b => b.style.display = 'block');
    } else {
      if (banner) banner.style.display = 'none';
      if (testCard) testCard.style.display = 'none';
      adminBtns.forEach(b => b.style.display = 'none');
    }
    populateProfileModal();
  }
  populateMemberDropdowns();
  renderMembersList();
}

function populateProfileModal() {
  if (!currentUser) return;
  const nameEl = document.getElementById('profileName');
  const codeEl = document.getElementById('profileCode');
  const phoneEl = document.getElementById('profilePhone');
  const avatarEl = document.getElementById('profileAvatarLg');
  const roleEl = document.getElementById('profileRoleBadge');

  if (nameEl) nameEl.textContent = (currentLang === 'kn') ? (currentUser.Name_KN || currentUser.Name_EN) : currentUser.Name_EN;
  if (codeEl) codeEl.textContent = currentUser.MemberCode || `M#0${currentUser.MemberID || 1}`;
  if (phoneEl) phoneEl.textContent = currentUser.Phone || '9876543210';
  if (avatarEl) avatarEl.textContent = currentUser.Name_EN.charAt(0);
  if (roleEl) roleEl.textContent = currentUser.Role === 'Admin' ? 'Admin & Member' : 'Member';
}

function handleLogout() {
  currentUser = null;
  const banner = document.getElementById('adminModeBanner');
  const testCard = document.getElementById('adminPushTestHomeCard');
  if (banner) banner.style.display = 'none';
  if (testCard) testCard.style.display = 'none';
  document.querySelectorAll('.admin-only-btn').forEach(b => b.style.display = 'none');
  showToast(currentLang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್‌ಔಟ್ ಆಗಿದೆ' : 'Logged out successfully', 'info');
  navigateTo('splash');
}

function populateMemberDropdowns() {
  const selPwd = document.getElementById('pwdMemberSelect');
  const selDraw = document.getElementById('drawMemberSelect');

  const optionsHtml = membersData.map(m => {
    const name = (currentLang === 'kn') ? m.nameKn : m.nameEn;
    return `<option value="${m.id}">${m.code} - ${name}</option>`;
  }).join('');

  if (selPwd) selPwd.innerHTML = optionsHtml;
  if (selDraw) selDraw.innerHTML = optionsHtml;
}

// Switch Active Screen
function navigateTo(screenId) {
  currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
  
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active-screen');
  }

  const navBar = document.getElementById('appBottomNav');
  if (navBar) {
    navBar.style.display = (screenId === 'splash' || screenId === 'login') ? 'none' : 'flex';
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    const targetNav = item.getAttribute('data-screen');
    if (targetNav === screenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const container = document.querySelector('.screen-container');
  if (container) container.scrollTop = 0;
}

// Render Members List
function renderMembersList() {
  const listEl = document.getElementById('membersContainer');
  if (!listEl) return;
  
  listEl.innerHTML = membersData.map((m, index) => {
    const num = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
    const displayName = (currentLang === 'kn') ? m.nameKn : m.nameEn;
    const adminTag = m.role === 'Admin' ? `<span class="admin-tag">Admin & Member</span>` : '';
    const isInactive = m.status === 'Inactive';
    const statusClass = isInactive ? 'style="background:#FEE2E2; color:#991B1B;"' : '';
    const statusText = isInactive ? (currentLang === 'kn' ? 'ನಿಷ್ಕ್ರಿಯ' : 'Inactive') : (currentLang === 'kn' ? 'ಸಕ್ರಿಯ' : 'Active');
    
    let adminActions = '';
    if (currentUser && currentUser.Role === 'Admin') {
      const toggleAction = isInactive ? 'Active' : 'Inactive';
      const btnLabel = isInactive ? 'Reactivate' : 'Deactivate';
      const btnBg = isInactive ? '#059669' : '#DC2626';
      adminActions = `<button class="chip-tab" style="background:${btnBg}; color:white; font-size:10px; margin-left:6px;" onclick="toggleMemberStatus(${m.id}, '${toggleAction}')">${btnLabel}</button>`;
    }

    return `
      <div class="member-card" style="${isInactive ? 'opacity:0.7;' : ''}">
        <div class="member-left">
          <span class="member-num">${num}</span>
          <div class="member-avatar">${m.nameEn.charAt(0)}</div>
          <div>
            <div class="member-name">${displayName} ${adminTag}</div>
            <div style="font-size:11px; color:#64748B;">📱 ${m.phone}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center;">
          <span class="status-badge" ${statusClass}>${statusText}</span>
          ${adminActions}
        </div>
      </div>
    `;
  }).join('');
}

// Toggle Member Deactivation
async function toggleMemberStatus(memberId, newStatus) {
  showSpinner('Updating Member...');
  try {
    await fetch(`${API_BASE_URL}/members/${memberId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) { console.warn(err.message); }
  hideSpinner();

  const mem = membersData.find(m => m.id === memberId);
  if (mem) mem.status = newStatus;

  renderMembersList();
  showToast(currentLang === 'kn' ? `ಸದಸ್ಯರ ಸ್ಥಿತಿ ಬದಲಾಗಿದೆ: ${newStatus}` : `Member status updated to ${newStatus}`, 'info');
}

// Admin Add Member
async function handleAddMemberSubmit(event) {
  event.preventDefault();
  const nameEn = document.getElementById('memNameEn').value;
  const nameKn = document.getElementById('memNameKn').value || nameEn;
  const phone = document.getElementById('memPhone').value;
  const role = document.getElementById('memRole').value;

  showSpinner('Adding Member...');
  try {
    await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name_en: nameEn, name_kn: nameKn, phone, role, password: '1234' })
    });
  } catch (err) { console.warn(err.message); }
  hideSpinner();

  const newMem = {
    id: membersData.length + 1,
    code: `M#${(membersData.length + 1).toString().padStart(2, '0')}`,
    nameEn,
    nameKn,
    phone,
    role,
    status: 'Active'
  };
  membersData.push(newMem);

  renderMembersList();
  populateMemberDropdowns();
  closeModal('modalAddMember');
  showToast(currentLang === 'kn' ? 'ಹೊಸ ಸದಸ್ಯ ಯಶಸ್ವಿಯಾಗಿ ಸೇರ್ಪಡೆಯಾಗಿದ್ದಾರೆ!' : 'New member added successfully!', 'success');
}

// Admin Change Password
async function handleChangePasswordSubmit(event) {
  event.preventDefault();
  const memberId = document.getElementById('pwdMemberSelect').value;
  const newPassword = document.getElementById('newPasswordInput').value;

  showSpinner('Updating Password...');
  try {
    await fetch(`${API_BASE_URL}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, newPassword })
    });
  } catch (err) { console.warn(err.message); }
  hideSpinner();

  closeModal('modalChangePassword');
  showToast(currentLang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!' : 'Password updated successfully!', 'success');
}

// Admin Conduct Winner Draw
async function handleConductDrawSubmit(event) {
  event.preventDefault();
  const monthYear = document.getElementById('drawMonthYear').value;
  const memberId = document.getElementById('drawMemberSelect').value;
  const amountWon = parseInt(document.getElementById('drawAmountWon').value, 10);

  showSpinner('Recording Draw Winner...');
  try {
    await fetch(`${API_BASE_URL}/payouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, monthYear, amountWon, paymentMethod: 'UPI' })
    });
  } catch (err) { console.warn(err.message); }
  hideSpinner();

  closeModal('modalConductDraw');
  showToast(currentLang === 'kn' ? `ಚೀಟಿ ವಿಜೇತ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದ್ದಾರೆ!` : `Chit draw winner recorded successfully!`, 'success');
  navigateTo('payouts');
}

// Render Expenses List
function renderExpensesList(filterCategory = 'all') {
  const listEl = document.getElementById('expensesContainer');
  if (!listEl) return;

  const filtered = expensesData.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  listEl.innerHTML = filtered.map(exp => {
    const title = (currentLang === 'kn') ? exp.titleKn : exp.titleEn;
    const icon = exp.category === 'festival' ? '🪔' : exp.category === 'temple' ? '🏛️' : '📦';
    
    return `
      <div class="expense-item">
        <div class="member-left">
          <div class="expense-icon-box">${icon}</div>
          <div class="expense-info">
            <h4>${title}</h4>
            <p>${exp.date}</p>
          </div>
        </div>
        <div class="expense-amount">₹ ${exp.amount.toLocaleString()}</div>
      </div>
    `;
  }).join('');
}

function filterExpenses(category, btn) {
  document.querySelectorAll('.chip-tab').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderExpensesList(category);
}

function selectPaymentMethod(card, method) {
  document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

function handleContributionSubmit(event) {
  event.preventDefault();
  const amtInput = document.getElementById('contribAmountInput');
  const val = parseInt(amtInput ? amtInput.value : 200, 10);
  
  totalSavingsVal += val;
  document.querySelectorAll('.savings-total-val').forEach(el => {
    el.textContent = `₹ ${totalSavingsVal.toLocaleString()}`;
  });

  showToast(currentLang === 'kn' ? 'ನಿಮ್ಮ ಕೊಡುಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Your contribution has been recorded successfully!', 'success');
  navigateTo('dashboard');
}

async function handleAddExpenseSubmit(event) {
  event.preventDefault();
  const titleEn = document.getElementById('expTitleEn').value;
  const titleKn = document.getElementById('expTitleKn').value || titleEn;
  const amount = parseInt(document.getElementById('expAmount').value, 10);
  const category = document.getElementById('expCategory').value;

  showSpinner('Saving Expense...');
  try {
    await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title_en: titleEn,
        title_kn: titleKn,
        category,
        amount,
        expenseDate: new Date().toISOString().split('T')[0]
      })
    });
  } catch (err) { console.warn(err.message); }
  hideSpinner();

  const newExp = {
    id: expensesData.length + 1,
    titleEn,
    titleKn,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category,
    amount
  };

  expensesData.unshift(newExp);
  totalExpensesVal += amount;

  document.querySelectorAll('.expenses-total-val').forEach(el => {
    el.textContent = `₹ ${totalExpensesVal.toLocaleString()}`;
  });

  renderExpensesList('all');
  closeModal('modalAddExpense');
  showToast(currentLang === 'kn' ? 'ಖರ್ಚು ಯಶಸ್ವಿಯಾಗಿ ಲೈವ್ ಡಾಟಾಬೇಸ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!' : 'New expense saved to live MSSQL database!', 'success');
}

function toggleDeviceView() {
  const wrapper = document.getElementById('appViewportWrapper');
  const btn = document.getElementById('btnToggleView');
  if (wrapper) {
    wrapper.classList.toggle('desktop-mode');
    if (wrapper.classList.contains('desktop-mode')) {
      if (btn) btn.innerHTML = '📱 Mobile View';
    } else {
      if (btn) btn.innerHTML = '🖥️ Desktop View';
    }
  }
}

// ============================================================
// PUSH NOTIFICATIONS & REMINDER ENGINE
// ============================================================

let notificationsData = [
  {
    id: 1,
    title: "⏱️ Monthly Payment Due Reminder / ಕೊಡುಗೆ ಜ್ಞಾಪನೆ",
    body: "Monthly Cheeti ₹200 contribution is due by 10th of every month. Please pay via UPI or Cash to stay active!",
    type: "reminder",
    time: "10 Sep 2026, 09:00 AM",
    isRead: false
  },
  {
    id: 2,
    title: "🎲 12th Cheeti Lucky Draw Alert / 12ನೇ ತಾರೀಖಿನ ಚೀಟಿ ಡ್ರಾ",
    body: "Monthly Cheeti Lucky Draw will take place on 12th at 6:00 PM! Good luck to all active group members!",
    type: "event",
    time: "12 Sep 2026, 10:30 AM",
    isRead: false
  },
  {
    id: 3,
    title: "🎉 September Winner Announced / ಸೆಪ್ಟೆಂಬರ್ ವಿಜೇತರು",
    body: "Congratulations to Ramesh Kumar for winning September 2026 Cheeti Payout of ₹2,400!",
    type: "winner",
    time: "12 Sep 2026, 06:30 PM",
    isRead: true
  }
];

// Play standard native app sound tone via Web Audio API
function playNotificationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (err) {
    console.warn('Audio tone play error:', err.message);
  }
}

// Request Browser Web Push Notification Permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast(currentLang === 'kn' ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಪುಶ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ' : 'Web Push notifications are not supported by this browser.', 'warning');
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      playNotificationSound();
      showToast(currentLang === 'kn' ? '🔔 ಪುಶ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ!' : '🔔 Push notifications enabled successfully!', 'success');
      
      // Trigger instant welcome test notification
      sendWebPushNotification(
        "Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ)",
        currentLang === 'kn' ? "ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. 10 ಮತ್ತು 12ನೇ ತಾರೀಖಿನ ಜ್ಞಾಪನೆಗಳು ಇಲ್ಲಿ ಬರುತ್ತವೆ!" : "Push notifications active! You will receive 10th due date and 12th draw day alerts."
      );
    } else if (permission === 'denied') {
      showToast(currentLang === 'kn' ? 'ಅಧಿಸೂಚನೆಗಳ ಅನುಮತಿಯನ್ನು ನಿರಾಕರಿಸಲಾಗಿದೆ.' : 'Notification permission denied in browser settings.', 'error');
    }
  } catch (err) {
    console.error('Permission request error:', err);
    showToast('Could not request notification permission.', 'error');
  }
}

// Register Service Worker for PWA & Mobile Lockscreen Push Notifications
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registered successfully:', reg.scope))
      .catch(err => console.warn('Service Worker registration failed:', err.message));
  }
}

// Send Web Push Notification to Device / Browser (Desktop Chrome & Mobile Android/iOS)
async function sendWebPushNotification(title, body) {
  playNotificationSound();

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          reg.showNotification(title, {
            body: body,
            icon: 'ganesha_avatar.png',
            badge: 'ganesha_avatar.png',
            vibrate: [200, 100, 200],
            tag: 'ganesha-cheeti-notif',
            renotify: true
          });
          return;
        }
      }

      new Notification(title, {
        body: body,
        icon: 'ganesha_avatar.png',
        badge: 'ganesha_avatar.png',
        tag: 'ganesha-cheeti-notif',
        renotify: true
      });
    } catch (err) {
      console.warn('Browser Notification error:', err.message);
      showToast(`🔔 ${title}: ${body}`, 'info', 4500);
    }
  } else {
    showToast(`🔔 ${title}: ${body}`, 'info', 4500);
  }
}

// Load notifications from Backend API
async function loadNotificationsData() {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        notificationsData = data.map(item => ({
          id: item.NotificationID || item.id,
          title: item.Title || item.title,
          body: item.Body || item.body,
          type: (item.Type || item.type || 'broadcast').toLowerCase(),
          time: item.CreatedAt ? new Date(item.CreatedAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recently',
          isRead: item.IsRead || false
        }));
      }
    }
  } catch (err) {
    console.warn('Load notifications backend warning:', err.message);
  }
  renderNotificationsInbox();
}

// Render Notification Items inside Modal Inbox
function renderNotificationsInbox() {
  const container = document.getElementById('notificationsContainer');
  const badgeDot = document.getElementById('unreadBadgeDot');

  const unreadCount = notificationsData.filter(n => !n.isRead).length;

  if (badgeDot) {
    if (unreadCount > 0) {
      badgeDot.style.display = 'block';
    } else {
      badgeDot.style.display = 'none';
    }
  }

  if (!container) return;

  if (notificationsData.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px 12px; color: var(--text-muted); font-size: 13px;">
        🔔 No notifications currently / ಯಾವುದೇ ಸೂಚನೆಗಳಿಲ್ಲ.
      </div>
    `;
    return;
  }

  container.innerHTML = notificationsData.map(item => {
    let icon = '📢';
    let typeClass = 'broadcast';

    if (item.type === 'reminder') {
      icon = '⏱️';
      typeClass = 'reminder';
    } else if (item.type === 'event') {
      icon = '🎲';
      typeClass = 'event';
    } else if (item.type === 'winner') {
      icon = '🎉';
      typeClass = 'winner';
    }

    return `
      <div class="notif-card ${item.isRead ? '' : 'unread'}" onclick="markNotificationRead(${item.id})">
        <div class="notif-icon-badge">${icon}</div>
        <div class="notif-content">
          <div class="notif-header-row">
            <span class="notif-title">${item.title}</span>
            <span class="notif-time">${item.time}</span>
          </div>
          <div class="notif-body">${item.body}</div>
          <span class="notif-type-tag ${typeClass}">${item.type}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Mark single item read
function markNotificationRead(id) {
  const item = notificationsData.find(n => n.id === id);
  if (item && !item.isRead) {
    item.isRead = true;
    renderNotificationsInbox();
  }
}

// Mark all items read
function markAllNotificationsRead() {
  notificationsData.forEach(n => n.isRead = true);
  renderNotificationsInbox();
  showToast(currentLang === 'kn' ? 'ಎಲ್ಲಾ ಸೂಚನೆಗಳನ್ನು ಓದಲಾಗಿದೆ!' : 'All notifications marked as read!', 'info');
}

// Admin Quick Presets for Broadcast Modal
function fillQuickNotificationPreset(presetType) {
  const titleInput = document.getElementById('notifTitle');
  const bodyInput = document.getElementById('notifBody');

  if (presetType === 'due') {
    if (titleInput) titleInput.value = '⏱️ Monthly Contribution Due Reminder / ಕೊಡುಗೆ ಜ್ಞಾಪನೆ';
    if (bodyInput) bodyInput.value = 'Dear Member, monthly ₹200 Cheeti contribution is due by 10th. Please pay via UPI or Cash! / ದಿನಾಂಕ 10ರೊಳಗೆ ₹200 ಚೀಟಿ ಹಣ ಪಾವತಿಸಿ.';
  } else if (presetType === 'draw') {
    if (titleInput) titleInput.value = '🎲 12th Cheeti Lucky Draw Alert / 12ನೇ ತಾರೀಖಿನ ಚೀಟಿ ಡ್ರಾ';
    if (bodyInput) bodyInput.value = 'Monthly Cheeti Lucky Draw will take place tomorrow on 12th at 6:00 PM! Good luck! / ನಾಳೆ 12ನೇ ತಾರೀಖು ಚೀಟಿ ಡ್ರಾ ನಡೆಯಲಿದೆ!';
  }
}

// Handle Admin Broadcast Submit
async function handleAdminSendNotificationSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('notifTitle').value;
  const body = document.getElementById('notifBody').value;

  showSpinner('Broadcasting Notification...');

  try {
    await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, type: 'Broadcast' })
    });
  } catch (err) {
    console.warn('Broadcast notification API error:', err.message);
  }

  hideSpinner();

  const newNotif = {
    id: Date.now(),
    title,
    body,
    type: 'broadcast',
    time: 'Just now',
    isRead: false
  };

  notificationsData.unshift(newNotif);
  renderNotificationsInbox();

  // Send native web push to device
  sendWebPushNotification(title, body);

  closeModal('modalSendNotification');
  showToast(currentLang === 'kn' ? 'ಎಲ್ಲಾ ಸದಸ್ಯರಿಗೆ ಪುಶ್ ಸೂಚನೆ ಕಳುಹಿಸಲಾಗಿದೆ!' : 'Broadcast push notification sent to all members!', 'success');
  if (document.getElementById('notifTitle')) document.getElementById('notifTitle').value = '';
  if (document.getElementById('notifBody')) document.getElementById('notifBody').value = '';
}

// Automatic Automated Reminders Check
function checkAutomatedReminders() {
  const today = new Date();
  const dateNum = today.getDate();

  if (dateNum >= 8 && dateNum <= 10) {
    const existing = notificationsData.find(n => n.type === 'reminder' && n.title.includes('Due'));
    if (!existing) {
      notificationsData.unshift({
        id: Date.now(),
        title: "⏱️ Payment Reminder: Due on 10th / ಕೊಡುಗೆ ಜ್ಞಾಪನೆ",
        body: "Monthly ₹200 contribution deadline is approaching. Please pay before 10th.",
        type: "reminder",
        time: "Today",
        isRead: false
      });
      renderNotificationsInbox();
    }
  } else if (dateNum === 11 || dateNum === 12) {
    const existing = notificationsData.find(n => n.type === 'event' && n.title.includes('Draw'));
    if (!existing) {
      notificationsData.unshift({
        id: Date.now(),
        title: "🎲 Cheeti Draw Alert: 12th Draw Today / 12ನೇ ತಾರೀಖಿನ ಚೀಟಿ ಡ್ರಾ",
        body: "Monthly Cheeti Lucky Draw takes place today at 6:00 PM!",
        type: "event",
        time: "Today",
        isRead: false
      });
      renderNotificationsInbox();
    }
  }
}

// Temporary Admin Test for System Push Notification
async function testAdminPushNotification() {
  if (!('Notification' in window)) {
    showToast(currentLang === 'kn' ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸಿಸ್ಟಮ್ ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.' : 'System Push notifications not supported in this browser.', 'error');
    return;
  }

  let perm = Notification.permission;
  if (perm !== 'granted') {
    try {
      perm = await Notification.requestPermission();
    } catch (e) {
      console.warn('Request permission error:', e.message);
    }
  }

  if (perm === 'granted') {
    const title = '🔔 Admin System Push Test / ಅಡ್ಮಿನ್ ನೋಟಿಫಿಕೇಶನ್';
    const body = 'Hello Admin (Ganesh)! System Web Push notification is working perfectly on your device!';
    
    // Trigger System Browser Push Notification
    sendWebPushNotification(title, body);

    // Also add to local notification inbox & update badge
    notificationsData.unshift({
      id: Date.now(),
      title: title,
      body: body,
      type: 'broadcast',
      time: 'Just now',
      isRead: false
    });
    renderNotificationsInbox();

    showToast(currentLang === 'kn' ? '🔔 ಬ್ರೌಸರ್ ಸಿಸ್ಟಮ್ ನೋಟಿಫಿಕೇಶನ್ ಕಳುಹಿಸಲಾಗಿದೆ!' : '🔔 Browser system push notification sent successfully!', 'success');
  } else {
    showToast(currentLang === 'kn' ? 'ಅಧಿಸೂಚನೆಗಳ ಅನುಮತಿಯನ್ನು ನೀಡಿ (Allow notifications).' : 'Please allow notifications in browser settings to see system popups.', 'warning');
  }
}


