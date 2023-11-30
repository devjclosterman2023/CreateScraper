const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.coursera.org/');

    // Extract text content using XPath targeting specific <p> elements
    const elements = await page.$x('//div[contains(@class, "rc-MetatagsWrapper")]//p');
 // Example: Target specific <p> elements
    console.log(elements)
   // Replace //div[@class="main-content"]//p with the appropriate XPath expression that accurately targets the <p> elements you intend to scrape.
    let scrapedData = '';
    
    for (const element of elements) {
        const text = await page.evaluate(el => el.textContent, element);
        console.log(text); //Log each extracted text
        scrapedData += text + '\n'; // Append text content to the string 
        console.log(element.length)
    }

    // Write scraped data to a text file
    fs.writeFileSync('scraped_data.txt', scrapedData);

    await browser.close();
    console.log('Script executed successfully.');
  } catch (err) {
    console.error('An error occurred:', err);
  }
})();



