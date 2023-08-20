const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com/");

  // await page.screenshot({ path: "example.png", fullPage: true });

  // await page.pdf({ path: "example.pdf", format: "A4" });

  // const html = await page.content();
  // console.log(html);

  // const title = await page.evaluate(() => document.title);
  // console.log(title);

  // const text = await page.evaluate(() => document.body.innerText);
  // console.log(text);

  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (elem) => elem.href)
  // );
  // console.log(links);

  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".cscourse-grid .card"), (elem) => ({
  //     title: elem.querySelector(".card-body h3").innerText,
  //     level: elem.querySelector(".card-body .level").innerText,
  //     url: elem.querySelector(".card-footer a").href,
  //   }))
  // );
  // console.log(courses);

  const courses = await page.$$eval(".cscourse-grid .card", (elements) =>
    elements.map((elem) => ({
      title: elem.querySelector(".card-body h3").innerText,
      level: elem.querySelector(".card-body .level").innerText,
      url: elem.querySelector(".card-footer a").href,
    }))
  );
  // console.log(courses);

  // save data to json file
  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("File Savef");
  });

  await browser.close();
}

run();
