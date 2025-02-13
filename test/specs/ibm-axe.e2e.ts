import { getCompliance } from "accessibility-checker";
import MainPage from "../pageobjects/AU/mainPage"
import { ICheckerReport } from "accessibility-checker/lib/api/IChecker";
import AxeHelper from "../helper/axeHelper"


describe('Using both Axe and IBM checkers', () => {
    xit('should log failures on the before page', async () => {
        await MainPage.openBefore()

        const ibmBeforeResults = await getCompliance(browser, "TEST-Before")
        const ibmBeforeViolations = (ibmBeforeResults.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        const axeBuilder = new AxeHelper(browser)
        const axeBeforeResults = await axeBuilder.analyze()

        console.log('Ibm before - All results: ', (ibmBeforeResults.report as ICheckerReport).results.length)
        console.log('Ibm before - Violations: ', ibmBeforeViolations.length)

        console.log(`Axe before - Error nodes: \n`, axeBeforeResults.violations.length)
        console.log(`Axe before - Incomplete: \n`, axeBeforeResults.incomplete.length)

        // console.log(results.violations)

    })
    xit('should log failures on the after page', async () => {
        await MainPage.openAfter()

        const ibmAfterResults = await getCompliance(browser, "TEST-After")
        const ibmAfterViolations = (ibmAfterResults.report as ICheckerReport).results.filter(
            (result) => result.level === 'violation');

        const axeBuilder = new AxeHelper(browser)
        const axeAfterResults = await axeBuilder.analyze()

        //6 violations, but are they really?
        console.log('\n\nIBM: \n', ibmAfterViolations)
        console.log('\n\nAxe: \n',axeAfterResults.violations)

        console.log('Ibm after - All results: ', (ibmAfterResults.report as ICheckerReport).results.length)
        console.log('Ibm after - Violations: ', ibmAfterViolations.length)

        console.log(`Axe after - Error nodes: \n`, axeAfterResults.violations.length)
        console.log(`Axe after - Incomplete: \n`, axeAfterResults.incomplete.length)

        //Axe finds colour contrast issues on 2AAA that IBM doesn't find
        // console.log('\n\nAxe: \n',axeAfterResults.violations[0].nodes)
    })


})