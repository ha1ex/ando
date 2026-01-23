const { chromium } = require('playwright');

const PROD_URL = 'https://andojv.com';

async function testMobileSearchProd() {
  console.log('ТЕСТ: Мобильный поиск на ПРОДАКШЕНЕ');
  console.log('URL: ' + PROD_URL);
  console.log('='.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  try {
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Accept cookies
    const cookies = page.locator('button:has-text("Принять")');
    if (await cookies.isVisible()) await cookies.click();

    // Click search
    const searchBtn = page.locator('button:has-text("ПОИСК")').first();
    await searchBtn.click();
    await page.waitForTimeout(500);

    // Check overlay
    const input = page.locator('input[placeholder*="Поиск"]');
    const overlayOpen = await input.isVisible();
    console.log(`✓ Оверлей открылся: ${overlayOpen}`);

    // Type and submit
    await input.fill('пальто');
    await input.press('Enter');
    await page.waitForTimeout(1500);

    const url = page.url();
    const isOnCatalog = url.includes('/catalog');
    const hasSearch = url.includes('search=');
    console.log(`✓ URL: ${url}`);
    console.log(`✓ На каталоге: ${isOnCatalog}`);
    console.log(`✓ Поиск в URL: ${hasSearch}`);

    // Count results
    const cards = await page.locator('a[href^="/product/"]').count();
    console.log(`✓ Найдено товаров: ${cards}`);

    await page.screenshot({
      path: 'tests/screenshots/mobile-search-test/prod-final.png',
      fullPage: false
    });

    console.log('\n' + (overlayOpen && isOnCatalog ? '✅ ТЕСТ ПРОЙДЕН' : '❌ ТЕСТ НЕ ПРОЙДЕН'));

  } catch (e) {
    console.error('❌ Ошибка:', e.message);
  } finally {
    await browser.close();
  }
}

testMobileSearchProd();
