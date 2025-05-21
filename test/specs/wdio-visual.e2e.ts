import MainPage from "../pageobjects/AU/mainPage.ts";

describe('WebdriverIO visual and tabbing', ()=> {
    xit('Should do visual comparison', async () => {
        await MainPage.openAfter()
        await browser.pause(1500)
        const captchaLabel = await $('#captcha')
        const resultAfter = await browser.checkScreen('fullPageAfter', {
            hideElements: [captchaLabel],
            ignoreLess: true
        })
        await MainPage.openBefore()
        await browser.pause(1500)
        const resultBefore = await browser.checkScreen('fullPageBefore')
        console.log('Mismatch before',resultBefore)
        console.log('Mismatch after',resultAfter)

    })
    it('Should check the tab order', async()=>{
        await MainPage.openAfter()
        const captchaLabel = await $('#captcha')
        const submitButton = await $('#submit')
        // Beware of timing. Without the wait, the video component sometimes isn't fully taken into account in the tab order
        await browser.pause(2000)
        const result = await browser.checkTabbablePage('fullPageAfter-Tabbed', {
            hideElements: [captchaLabel]

            //Good to know: hideElements and removeElements don't change with your taborder
            // removeElements: [captchaLabel, submitButton]
        })
        console.log('Mismatch tabbing',result)

    })
})