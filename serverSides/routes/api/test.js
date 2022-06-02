console.log(`${__filename}:1`);

const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

const RouterUtil = require('../../utils/RouterUtil');
const wrapTryCatch = RouterUtil.wrapTryCatch;


router.get('/', wrapTryCatch(async (req, res) => {
    console.log("hello test!");

    const browser = await puppeteer.launch({
        headless : false
    });
    const page = await browser.newPage();
    await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=');

    const lottoId = process.env.LOTTO_ID;
    const lottoPw = process.env.LOTTO_PW;

    await page.evaluate((id, pw) => {
        document.querySelector('#userId').value = id;
        document.querySelector('#article > div:nth-child(2) > div > form > div > div.inner > fieldset > div.form > input[type=password]:nth-child(2)').value = pw;
    }, lottoId, lottoPw);

    await page.click('#article > div:nth-child(2) > div > form > div > div.inner > fieldset > div.form > a');
    await page.waitForNavigation();

    await page.goto("https://el.dhlottery.co.kr/game/TotalGame.jsp?LottoId=LO40");
    await page.select("#amoundApply", "5");

    // await page.screenshot({ path: 'naver.png', fullPage:true });

    await page.waitForSelector(1000);
    await browser.close();

    res.renderJson({
        text: "hello test!"
    });
}));


module.exports = router;