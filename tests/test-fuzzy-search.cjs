const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:8080';

async function testFuzzySearch() {
  console.log('ТЕСТ: Нечёткий поиск');
  console.log('='.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const testCases = [
    { query: 'пальто', expected: 'точное совпадение' },
    { query: 'ПАЛЬТО', expected: 'регистр' },
    { query: 'палт', expected: 'частичное' },
    { query: 'брюк', expected: 'частичное' },
    { query: 'футболк', expected: 'частичное' },
    { query: 'S25', expected: 'артикул' },
  ];

  for (const tc of testCases) {
    await page.goto(`${BASE_URL}/catalog?search=${encodeURIComponent(tc.query)}`, {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(800);

    // Get count from "Найдено: X"
    const countText = await page.locator('text=/Найдено.*\\d+/').first().textContent().catch(() => '');
    const match = countText?.match(/Найдено:\s*(\d+)/);
    const count = match ? parseInt(match[1]) : 0;

    const icon = count > 0 ? '✅' : '❌';
    console.log(`${icon} "${tc.query}" (${tc.expected}): ${count} товаров`);
  }

  await browser.close();
  console.log('\n' + '='.repeat(50));
}

testFuzzySearch();
