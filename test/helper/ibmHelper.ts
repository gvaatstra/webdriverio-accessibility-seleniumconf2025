import { IBaselineResult } from "accessibility-checker/lib/common/engine/IReport";

export default class IbmHelper {

        static logResultsToConsole(data: IBaselineResult[]) {
            console.table(this.getViolations(data));
        }
    
        private static getViolations(data: IBaselineResult[]) {
            const results: { message: string, level: string, snippet: string }[] = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    results.push({
                        message: `IBM - ${data[j].message}`,
                        level: data[j].level,
                        snippet: data[j].snippet
                    });
                }
            }
            return results;
        }
}
