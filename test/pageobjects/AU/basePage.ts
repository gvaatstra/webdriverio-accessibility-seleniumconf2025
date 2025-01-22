import { browser } from '@wdio/globals'

export default class BasePage {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. info.html)
    */
    public open(path: string) {
        return browser.url(`https://www.washington.edu/accesscomputing/AU/${path}`)
    }
}