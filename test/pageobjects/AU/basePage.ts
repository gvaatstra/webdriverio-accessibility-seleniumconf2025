import { browser } from '@wdio/globals'

export default class BasePage {
    /**
    * Opens a sub page of the page remote
    * @param path path of the sub page (e.g. info.html)
    */
    public openRemote(path: string) {
        return browser.url(`https://www.washington.edu/accesscomputing/AU/${path}`)
    }
    /**
    * Opens a sub page of the page locally
    * @param path path of the sub page (e.g. info.html)
    */
    public openLocal(path: string) {
        return browser.url(`http://localhost:8080/${path}`)
    }
}