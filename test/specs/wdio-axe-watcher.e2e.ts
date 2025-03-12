import { WdioController } from "@axe-core/watcher";
import MainPage from "../pageobjects/AU/mainPage.ts";
import { wrapWdio } from '@axe-core/watcher'
import AxeHelper from "../helper/axeHelper.ts";

describe('WebdriverIO visual and tabbing', ()=> {
    let controller: WdioController

    // You do need a .env file with your API key from Deque Developer Hub (as of now free)
    before(()=>{
        controller = new WdioController(browser)
        wrapWdio(browser, controller)
    })

    xit('Should do visual comparison', async () => {
        await MainPage.openAfter(true)
        await browser.pause(1500)
        await MainPage.openBefore(true)
        await browser.pause(1500)
    })

    xit('Should analyze with Axe-core locally and remote', async()=>{
        // const axeTags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']; // Currently default in AxeHelper
        const axeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
        await MainPage.openBefore()
        const axeBuilder = new AxeHelper(browser).setTags(axeTags)
        const results = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(results)
        await MainPage.openAfter(true)
        const resultsAfter = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(resultsAfter)
        await MainPage.openBefore(true)
        const resultsBeforeAgain = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(resultsBeforeAgain)

})

    afterEach(async () => {
        await controller.flush()
      })
})