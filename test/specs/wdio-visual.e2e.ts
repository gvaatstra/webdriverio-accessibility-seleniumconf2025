import MainPage from "../pageobjects/AU/mainPage.ts";

describe('WebdriverIO visual and tabbing', ()=> {
    xit('Should do visual comparison', async () => {
        await MainPage.openAfter()
        await browser.pause(1500)
        await browser.checkScreen('fullPageAfter')
        await MainPage.openBefore()
        await browser.pause(1500)
        await browser.checkScreen('fullPageBefore')
    })

    xit('Should check the tab order', async()=>{
        await MainPage.openAfter()
        // Beware that the tab order isn't the actual tab order (as Taba11y or manual tabbing will show)
        await browser.checkTabbablePage('fullPageAfter-Tabbed')
    })
})