const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', async function() {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }); });
    after(async () => {  await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });
    
    it('should load article titles', async function () {
        await page.goto('http://localhost:5500/Accordion/index.html');
        
        await page.waitForSelector('.accordion div.head>span');

        const content = await page.textContent('#main');

        expect(content).to.be.contain('Scalable Vector Graphics');
        expect(content).to.be.contain('Open standard');
        expect(content).to.be.contain('Unix');
        expect(content).to.be.contain('ALGOL');
    });

    it('should have working More button', async function() {
        await page.goto('http://localhost:5500/Accordion/index.html');

        await page.click('text=More');

        await page.waitForSelector('.extra p');

        const text = await page.textContent('.extra p');
        const visible = await page.isVisible('.extra p');

        expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)');
        expect(visible).to.be.true;
    });

    it.only('should have working Less button', async function() {
        await page.goto('http://localhost:5500/Accordion/index.html');

        await page.click('text=More');

        await page.waitForSelector('.extra p');

        let visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;

        await page.click('text=Less');

        visible = await page.isVisible('.extra p');
        expect(visible).to.be.false;
    });
});