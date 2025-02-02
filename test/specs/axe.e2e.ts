import AxeHelper from "../helper/axeHelper"
import Form from "../pageobjects/AU/form"
import MainPage from "../pageobjects/AU/mainPage"

describe('Using Axe for accessibility checks', ()=>{
    xit('Should find many failures on the before-page', async()=>{
        await MainPage.openBefore()
        const axeBuilder = new AxeHelper(browser)
        const results = await axeBuilder.analyze()
        axeBuilder.logResultsToConsole(results)
        expect(results.violations.length).toBeLessThan(1)
    })

    xit('Should find many failures on the before-page', async()=>{
        //Note: Do you see the difference with the Axe Chrome plugin due to difference in tags

        await MainPage.openAfter()
        const axeBuilder = new AxeHelper(browser)
        const results = await axeBuilder.analyze()
        axeBuilder.logResultsToConsole(results)

        // Incomplete means undeterminable and therefore needs manual inspection.
        // Some extra information about the undetermined (incomplete) and the error
        console.log(results)
        console.log(results.incomplete[0].tags)
        console.log(results.incomplete[0].nodes)
        console.log(results.violations[0].tags)

        expect(results.violations.length).toBeLessThan(1)
    })

    it('Should find many failures on the before-page', async()=>{
        await MainPage.openBefore()
        const axeBuilder1 = new AxeHelper(browser)
        const results1 = await axeBuilder1.analyze()
        axeBuilder1.logResultsToConsole(results1)
        
        const axeBuilder2 = new AxeHelper(browser, {exclude: [Form.baseSelector]})
        const results2 = await axeBuilder2.analyze()

        const violations1 = results1.violations.length
        const violations2 = results2.violations.length
        console.log(`Without the form, the amount of violations went from ${violations1} to ${violations2}:`)

        axeBuilder2.logResultsToConsole(results2)
    })
})