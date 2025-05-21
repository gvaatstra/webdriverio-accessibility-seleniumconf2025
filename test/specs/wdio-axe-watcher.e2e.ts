import { WdioController } from "@axe-core/watcher";
import MainPage from "../pageobjects/AU/mainPage.ts";
import { wrapWdio } from '@axe-core/watcher'
import AxeHelper from "../helper/axeHelper.ts";

describe('WebdriverIO Axe watcher', ()=> {
    let controller: WdioController

    // You do need a .env file with your API key from Deque Developer Hub (as of now free)
    before(()=>{
        controller = new WdioController(browser)
        wrapWdio(browser, controller)
    })

    xit('Should do axe watcher checks automatically', async () => {
        await MainPage.openAfter()
        await browser.pause(1500)
        await MainPage.openBefore()
        await browser.pause(1500)
    })

    it('Should analyze with Axe-core locally and remote', async()=>{
        // const axeTags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']; // Currently default in AxeHelper
        const axeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
        await MainPage.openBefore()
        const axeBuilder = new AxeHelper(browser).setTags(axeTags)
        const results = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(results)
        await MainPage.openAfter()
        const resultsAfter = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(resultsAfter)
        await MainPage.openBefore()
        const resultsBeforeAgain = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(resultsBeforeAgain)

})

    afterEach(async () => {
        await controller.flush()
      })
})