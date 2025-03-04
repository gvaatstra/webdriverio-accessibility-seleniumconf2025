import { AxeBuilder } from '@axe-core/webdriverio'
import { AxeResults } from 'axe-core';
import { RunOptions } from 'axe-core';

export interface CustomAxeBuilderConfigParameters {
    disableFrames?: string[]
    include?: string[]
    exclude?: string[]
    options?: RunOptions

}

export default class AxeHelper {
    private builder: AxeBuilder
    private axeTags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']; //For more info, see https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags

    constructor(browser: WebdriverIO.Browser, options?: CustomAxeBuilderConfigParameters) {
        this.builder = new AxeBuilder({ client: browser }).withTags(this.axeTags)
        if (options?.options) this.builder.options(options?.options)
        this.addDisableFrames(options?.disableFrames)
        this.addIncluded(options?.include)
        this.addExcludes(options?.exclude)
    }
    private addDisableFrames(inputs: string[] = []) {
        for (const frame of inputs)
            this.builder.disableFrame(frame)
    }
    private addIncluded(inputs: string[] = []) {
        for (const input of inputs)
            this.builder.include(input)
    }
    private addExcludes(inputs: string[] = []) {
        for (const input of inputs)
            this.builder.exclude(input)
    }

    analyze(){
        return this.builder.analyze()
    }

    logResultsToConsole(data: AxeResults) {
        console.table(this.getViolations(data));
    }
    setTags(tags: string[]){
        this.builder.withTags(tags)
        return this
    }

    private getViolations(data: AxeResults) {
        const results: { type: string, description: string }[] = [];
        for (let i = 0; i < data.violations.length; i++) {
            results.push({
                type: `Axe violation ${i}`,
                description: data.violations[i].description,
            });
            for (let j = 0; j < data.violations[i].nodes.length; j++) {
                results.push({
                    type: `Axe violation ${i} - HTML`,
                    description: data.violations[i].nodes[j].target.toString()
                });
            }
        }
        return results;
    }
}