import { assertCompliance, getCompliance } from "accessibility-checker";
import MainPage from "../pageobjects/AU/mainPage"
import { ICheckerReport } from "accessibility-checker/lib/api/IChecker";
import path from "node:path";
import IbmHelper from "../helper/ibmHelper";


describe('Using IBM Equal Access accessibility-checker', () => {
    xit('should log failures on the before page', async () => {
        await MainPage.openBefore()

        const results = await getCompliance(browser, "TEST")
        console.log((results.report as ICheckerReport).results)


        const filteredResults = (results.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('Violations: \n', filteredResults)

        console.log('All results: ', (results.report as ICheckerReport).results.length)
        console.log('Violations: ', filteredResults.length)
    })

    xit('should log failures on the after page', async () => {
        await MainPage.openAfter()

        const results = await getCompliance(browser, "TEST-after-baseline2")

        const filteredResults = (results.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('Violations: \n', filteredResults)

        console.log('All results: ', (results.report as ICheckerReport).results.length)
        console.log('Violations: ', filteredResults.length)

        IbmHelper.logResultsToConsole(filteredResults)

        //0 = match baseline or no violations, 1 = does not match baseline, 2 = failure based on failLevels
        const returnCode = assertCompliance(results.report as ICheckerReport);
        console.log('ReturnCode: ', returnCode);
    })

    xit('should log no failures on the after page compared to baseline', async () => {
        await MainPage.openAfter()
        //Do not use this, unless you're giving a demo and don't like surprises
        await browser.pause(250)

        const ibmCurrent = await getCompliance(browser, "TEST-after-baseline")
        const ibmCurrentViolations = (ibmCurrent.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('Ibm baseline - All results: ', (ibmCurrent.report as ICheckerReport).results.length)
        console.log('Ibm baseline - Violations: ', ibmCurrentViolations.length)
        console.log('Ibm baseline - Violations in summary: ', (ibmCurrent.report as ICheckerReport).summary.counts.violation)

        const returnCode = assertCompliance(ibmCurrent.report as ICheckerReport);
        //0 = match baseline or no violations, 1 = does not match baseline, 2 = failure based on failLevels
        console.log('ReturnCode: ', returnCode);

        // Did give me unusable results due to constant diff
        // const differences = diffResultsWithExpected(ibmAfterResults.report,baseline,false)
        // console.log(differences)
    })

    xit('Should not be used on images in case you wondered', async () => {
        await MainPage.openAfter()
        await browser.pause(1000)
        await browser.checkScreen('fullPageAfter')
        await MainPage.openBefore()
        await browser.pause(1000)
        await browser.checkScreen('fullPageBefore')


        const resultsBefore = await getCompliance(path.join(process.cwd(), "wdio-visual-baseline", "fullPageBefore.png"), "Testing screenshot before")
        const filteredResultsBefore = (resultsBefore.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('All results: ', (resultsBefore.report as ICheckerReport).results.length)
        console.log('Violations: ', filteredResultsBefore.length)

        const resultsAfter = await getCompliance(path.join(process.cwd(), "wdio-visual-baseline", "fullPageAfter.png"), "Testing screenshot after")
        const filteredResultsAfter = (resultsAfter.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        //In case you thought it could run on images, don't be fooled
        console.log('All results: ', (resultsAfter.report as ICheckerReport).results.length)
        console.log('Violations: ', filteredResultsAfter.length)
    })

    xit('Should run on HTML files (if you installed the git submodules)', async () => {
        const pathToBeforeHtml = path.join(process.cwd(), "sites", "accessibility-AU", "before.html")
        const pathToAfterHtml = path.join(process.cwd(), "sites", "accessibility-AU", "after.html")

        // The second getCompliance seems to get stuck 1 out of 2 times.. not sure why it sometimes result in an infinite wait
        await browser.pause(2000)
        const resultsBefore = await getCompliance(pathToBeforeHtml, "Testing screenshot before")
        const resultsAfter = await getCompliance(pathToAfterHtml, "Testing screenshot after")


        const filteredResultsBefore = (resultsBefore.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');
        console.log('All results before: ', (resultsBefore.report as ICheckerReport).results.length)
        console.log('Violations before: ', filteredResultsBefore.length)

        const filteredResultsAfter = (resultsAfter.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('All results after: ', (resultsAfter.report as ICheckerReport).results.length)
        console.log('Violations after: ', filteredResultsAfter.length)
    })

})