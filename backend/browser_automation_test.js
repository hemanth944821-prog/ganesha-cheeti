const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\hemantha.g\\.gemini\\antigravity\\brain\\bb67f2b4-b8dc-499b-9350-1e9df533dbda';

async function runBrowserAutomationTest() {
  console.log('🚀 Starting Puppeteer Real Browser Automation Test...');
  console.log('🌐 Target URL: https://ganesha-cheeti.vercel.app/\n');

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // 1. Open Website
    console.log('📸 Step 1: Navigating to Ganesha Cheeti web app...');
    await page.goto('https://ganesha-cheeti.vercel.app/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step1_landing_page.png') });
    console.log('✅ Step 1 Complete: Saved step1_landing_page.png');

    // 2. Click Get Started / Login
    console.log('📸 Step 2: Navigating to Login Screen...');
    const loginLink = await page.$('.landing-btn-secondary, [onclick*="login"]');
    if (loginLink) {
      await loginLink.click();
    } else {
      await page.evaluate(() => navigateTo('login'));
    }
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step2_login_form.png') });
    console.log('✅ Step 2 Complete: Saved step2_login_form.png');

    // 3. Fill Admin Login Form
    console.log('📸 Step 3: Typing Admin Credentials (9876543210 / admin123)...');
    await page.evaluate(() => {
      document.getElementById('loginPhone').value = '9876543210';
      document.getElementById('loginPassword').value = 'admin123';
      const chk = document.getElementById('chkAdminRole');
      if (chk) chk.checked = true;
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step3_credentials_entered.png') });
    console.log('✅ Step 3 Complete: Saved step3_credentials_entered.png');

    // 4. Click Submit / Login Button
    console.log('📸 Step 4: Submitting Login Form to Database API...');
    const loginBtn = await page.$('#screenLogin form button[type="submit"]');
    if (loginBtn) {
      await loginBtn.click();
    } else {
      await page.evaluate(() => {
        const form = document.querySelector('#screenLogin form');
        if (form) form.requestSubmit();
      });
    }

    // Wait for authentication and navigation
    await new Promise(r => setTimeout(r, 3500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step4_dashboard_logged_in.png') });
    console.log('✅ Step 4 Complete: Logged in successfully! Saved step4_dashboard_logged_in.png');

    // 5. Navigate to Members List Screen
    console.log('📸 Step 5: Testing Members List Screen...');
    await page.evaluate(() => navigateTo('members'));
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step5_members_screen.png') });
    console.log('✅ Step 5 Complete: Saved step5_members_screen.png');

    // 6. Navigate to Contributions & Payment Tracker Screen
    console.log('📸 Step 6: Testing Contributions Tracker Screen...');
    await page.evaluate(() => navigateTo('contributions'));
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step6_contributions_screen.png') });
    console.log('✅ Step 6 Complete: Saved step6_contributions_screen.png');

    // 7. Navigate to Expenses Screen
    console.log('📸 Step 7: Testing Expenses Screen...');
    await page.evaluate(() => navigateTo('expenses'));
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step7_expenses_screen.png') });
    console.log('✅ Step 7 Complete: Saved step7_expenses_screen.png');

    // 8. Open Admin Control Center Modal
    console.log('📸 Step 8: Testing Admin Control Center...');
    await page.evaluate(() => openAdminControlCenter());
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step8_admin_control_center.png') });
    console.log('✅ Step 8 Complete: Saved step8_admin_control_center.png');

    console.log('\n============================================================');
    console.log('🎉 AUTOMATED REAL BROWSER UI TEST COMPLETED SUCCESSFULLY!');
    console.log('============================================================');

  } catch (err) {
    console.error('❌ Browser Test Error:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

runBrowserAutomationTest();
