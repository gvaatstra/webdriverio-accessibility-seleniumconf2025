import AxeHelper from "../helper/axeHelper"
import Form from "../pageobjects/AU/form"
import MainPage from "../pageobjects/AU/mainPage"

describe('Using Axe for accessibility checks', ()=>{
    xit('Should find many failures on the before-page', async()=>{
        await MainPage.openBefore()
        const axeBuilder = new AxeHelper(browser)
        const results = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(results)
        expect(results.violations.length).toBeLessThan(1)
    })

    xit('Should find no... less failures on the after-page', async()=>{
        //Note: Do you see the difference with the Axe Chrome plugin due to difference in tags

        await MainPage.openAfter()
        const axeBuilder = new AxeHelper(browser)
        const results = await axeBuilder.analyze()
        axeBuilder.logViolationsToConsole(results)


        console.log(`Error: \n`, results.violations)
        // https://webaim.org/resources/contrastchecker/?fcolor=5A667A&bcolor=F0F0F0
        console.log(`Error nodes: \n`, results.violations[0].nodes)

        // Incomplete means undeterminable and therefore needs manual inspection.
        console.log(`Incomplete: \n`, results.incomplete)
        expect(results.violations.length).toBeLessThan(1)
    })

    xit('Should find less failures on the before-page with the form excluded', async()=>{
        await MainPage.openBefore()
        const axeBuilder1 = new AxeHelper(browser)
        const results1 = await axeBuilder1.analyze()
        axeBuilder1.logViolationsToConsole(results1)
        
        //Exclude form and scan again
        const axeBuilder2 = new AxeHelper(browser, {exclude: [Form.baseSelector]})
        const results2 = await axeBuilder2.analyze()

        const violations1 = results1.violations.length
        const violations2 = results2.violations.length
        console.log(`Without the form, the amount of violations went from ${violations1} to ${violations2}:`)

        axeBuilder2.logViolationsToConsole(results2)
    })
})