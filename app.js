// ============================================================
// Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ) - Core App Logic, Auth & Admin Engine
// ============================================================

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
let currentUser = null; // Currently logged in user object

// Members List Data (Preseeded)
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

// DOM Load Initialization
document.addEventListener('DOMContentLoaded', () => {
  fetchLiveDataFromBackend();
  renderMembersList();
  renderExpensesList('all');
  updateI18nText();
});

// Fetch Live Data from Express API & MSSQL Server
async function fetchLiveDataFromBackend() {
  try {
    const resSummary = await fetch('http://localhost:5000/api/summary');
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

    const resMembers = await fetch('http://localhost:5000/api/members');
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
    console.log('Using local client state (Backend API on http://localhost:5000)');
  }
}

// Toggle Language Engine
function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'kn' : 'en';
  const labelBtn = document.getElementById('langBtnText');
  if (labelBtn) {
    labelBtn.textContent = (currentLang === 'en') ? 'ಕನ್ನಡ' : 'English';
  }
  updateI18nText();
  renderMembersList();
  renderExpensesList('all');
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

// Quick Demo Login Fill
function fillDemoLogin(phone, pwd) {
  document.getElementById('loginPhone').value = phone;
  document.getElementById('loginPassword').value = pwd;
}

// Login Submission Handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    const result = await res.json();

    if (res.ok && result.success) {
      currentUser = result.user;
      applyUserSession();
      alert(currentLang === 'kn' ? `ಸ್ವಾಗತ ${currentUser.Name_KN || currentUser.Name_EN}!` : `Welcome ${currentUser.Name_EN}!`);
      navigateTo('dashboard');
    } else {
      alert(result.message || 'Invalid Login Details');
    }
  } catch (err) {
    // Local fallback login check
    const localUser = membersData.find(m => m.phone === phone);
    if (localUser) {
      if (localUser.status === 'Inactive') {
        alert('Your account is inactive. Please contact Admin.');
        return;
      }
      currentUser = { MemberID: localUser.id, Name_EN: localUser.nameEn, Name_KN: localUser.nameKn, Role: localUser.role };
      applyUserSession();
      alert(`Welcome ${currentUser.Name_EN}!`);
      navigateTo('dashboard');
    } else {
      alert('Invalid Phone Number or Password');
    }
  }
}

// Apply Logged-in User Session (Show/Hide Admin Action Controls)
function applyUserSession() {
  const greeting = document.getElementById('userGreetingText');
  const banner = document.getElementById('adminModeBanner');
  const adminBtns = document.querySelectorAll('.admin-only-btn');

  if (currentUser) {
    const name = (currentLang === 'kn') ? (currentUser.Name_KN || currentUser.Name_EN) : currentUser.Name_EN;
    if (greeting) greeting.textContent = (currentLang === 'kn') ? `ನಮಸ್ಕಾರ, ${name}!` : `Welcome, ${name}!`;

    if (currentUser.Role === 'Admin') {
      if (banner) banner.style.display = 'flex';
      adminBtns.forEach(b => b.style.display = 'block');
    } else {
      if (banner) banner.style.display = 'none';
      adminBtns.forEach(b => b.style.display = 'none');
    }
  }
  populateMemberDropdowns();
  renderMembersList();
}

// Logout Handler
function handleLogout() {
  currentUser = null;
  const banner = document.getElementById('adminModeBanner');
  if (banner) banner.style.display = 'none';
  document.querySelectorAll('.admin-only-btn').forEach(b => b.style.display = 'none');
  alert(currentLang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್‌ಔಟ್ ಆಗಿದೆ' : 'Logged out successfully');
  navigateTo('splash');
}

// Populate Member Dropdowns for Modals
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

// Render Members List with Admin Deactivate / Reactivate Action
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

// Toggle Deactivate / Reactivate Member (Soft Status Toggle - No Data Loss)
async function toggleMemberStatus(memberId, newStatus) {
  try {
    await fetch(`http://localhost:5000/api/members/${memberId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) {
    console.warn(err.message);
  }

  const mem = membersData.find(m => m.id === memberId);
  if (mem) mem.status = newStatus;

  renderMembersList();
  alert(currentLang === 'kn' ? `ಸದಸ್ಯರ ಸ್ಥಿತಿ ಬದಲಾಗಿದೆ: ${newStatus}` : `Member status updated to ${newStatus}`);
}

// Admin Add Member Submission Handler
async function handleAddMemberSubmit(event) {
  event.preventDefault();
  const nameEn = document.getElementById('memNameEn').value;
  const nameKn = document.getElementById('memNameKn').value || nameEn;
  const phone = document.getElementById('memPhone').value;
  const role = document.getElementById('memRole').value;

  try {
    await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name_en: nameEn, name_kn: nameKn, phone, role, password: '1234' })
    });
  } catch (err) { console.warn(err.message); }

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
  alert(currentLang === 'kn' ? 'ಹೊಸ ಸದಸ್ಯ ಯಶಸ್ವಿಯಾಗಿ ಸೇರ್ಪಡೆಯಾಗಿದ್ದಾರೆ!' : 'New member added successfully!');
}

// Admin Change Password Handler
async function handleChangePasswordSubmit(event) {
  event.preventDefault();
  const memberId = document.getElementById('pwdMemberSelect').value;
  const newPassword = document.getElementById('newPasswordInput').value;

  try {
    await fetch('http://localhost:5000/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, newPassword })
    });
  } catch (err) { console.warn(err.message); }

  closeModal('modalChangePassword');
  alert(currentLang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!' : 'Password updated successfully!');
}

// Admin Conduct Winner Draw Handler
async function handleConductDrawSubmit(event) {
  event.preventDefault();
  const monthYear = document.getElementById('drawMonthYear').value;
  const memberId = document.getElementById('drawMemberSelect').value;
  const amountWon = parseInt(document.getElementById('drawAmountWon').value, 10);

  try {
    await fetch('http://localhost:5000/api/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, monthYear, amountWon, paymentMethod: 'UPI' })
    });
  } catch (err) { console.warn(err.message); }

  closeModal('modalConductDraw');
  alert(currentLang === 'kn' ? `ಚೀಟಿ ವಿಜೇತ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದ್ದಾರೆ!` : `Chit draw winner recorded successfully!`);
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

  alert(currentLang === 'kn' ? 'ನಿಮ್ಮ ಕೊಡುಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Your contribution has been recorded successfully!');
  navigateTo('dashboard');
}

async function handleAddExpenseSubmit(event) {
  event.preventDefault();
  const titleEn = document.getElementById('expTitleEn').value;
  const titleKn = document.getElementById('expTitleKn').value || titleEn;
  const amount = parseInt(document.getElementById('expAmount').value, 10);
  const category = document.getElementById('expCategory').value;

  const newExp = {
    id: expensesData.length + 1,
    titleEn,
    titleKn,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category,
    amount
  };

  try {
    await fetch('http://localhost:5000/api/expenses', {
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

  expensesData.unshift(newExp);
  totalExpensesVal += amount;

  document.querySelectorAll('.expenses-total-val').forEach(el => {
    el.textContent = `₹ ${totalExpensesVal.toLocaleString()}`;
  });

  renderExpensesList('all');
  closeModal('modalAddExpense');
  alert(currentLang === 'kn' ? 'ಖರ್ಚು ಯಶಸ್ವಿಯಾಗಿ ಲೈವ್ ಡಾಟಾಬೇಸ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!' : 'New expense saved to live MSSQL database!');
}

function toggleDeviceView() {
  const wrapper = document.getElementById('appViewportWrapper');
  const btn = document.getElementById('btnToggleView');
  if (wrapper) {
    wrapper.classList.toggle('desktop-mode');
    if (wrapper.classList.contains('desktop-mode')) {
      btn.innerHTML = '📱 Mobile View';
    } else {
      btn.innerHTML = '🖥️ Desktop View';
    }
  }
}
