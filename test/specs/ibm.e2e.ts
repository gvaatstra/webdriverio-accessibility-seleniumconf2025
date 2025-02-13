import {assertCompliance, getCompliance} from "accessibility-checker";
import MainPage from "../pageobjects/AU/mainPage"
import { ICheckerReport } from "accessibility-checker/lib/api/IChecker";

describe('Using IBM Equal Access accessibility-checker', () => {
    xit('should log failures on the before page', async () => {
        await MainPage.openBefore()

        const results = await getCompliance(browser, "TEST")
        console.log((results.report as ICheckerReport).results)


        const filteredResults = (results.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('Violations: \n', filteredResults)

        console.log('All results: ',(results.report as ICheckerReport).results.length)
        console.log('Violations: ',filteredResults.length)
    })

    xit('should log failures on the after page', async () => {
        await MainPage.openAfter()

        const results = await getCompliance(browser, "TEST-after-baseline2")

        const filteredResults = (results.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        console.log('Violations: \n', filteredResults)

        console.log('All results: ',(results.report as ICheckerReport).results.length)
        console.log('Violations: ',filteredResults.length)

        console.log('The violations are: \n', filteredResults)

        //0 = match baseline or no violations, 1 = does not match baseline, 2 = failure based on failLevels
        const returnCode = assertCompliance(results.report as ICheckerReport);
        console.log('ReturnCode: ', returnCode);
    })

        it('should log no failures on the after page compared to baseline', async () => {
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
})