import MainPage from "../pageobjects/AU/mainPage.ts";

describe('WebdriverIO visual and tabbing', ()=> {
    xit('Should do visual comparison', async () => {
        await MainPage.openAfter(false)
        await browser.pause(1500)
        const captchaLabel = await $('#captcha')
        const resultAfter = await browser.checkScreen('fullPageAfter', {
            hideElements: [captchaLabel],
            ignoreLess: true
        })
        await MainPage.openBefore(false)
        await browser.pause(1500)
        const resultBefore = await browser.checkScreen('fullPageBefore')
        console.log('Mismatch before',resultBefore)
        console.log('Mismatch after',resultAfter)

    })

    it('Should check the tab order', async()=>{
        await MainPage.openAfter()
        const captchaLabel = await $('#captcha')
        const submitButton = await $('#submit')
        await browser.pause(3000)
        // Beware of timing. Run both tests and you'll have the full tab order. Run this in isolation, you miss tabs on the video component
        const result = await browser.checkTabbablePage('fullPageAfter-Tabbed', {
            hideElements: [captchaLabel]

            //Good to know: hideElements and removeElements don't change with your taborder
            // removeElements: [captchaLabel, submitButton]
        })
        console.log('Mismatch tabbing',result)

    })
})