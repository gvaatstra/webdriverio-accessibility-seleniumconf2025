import BasePage from "./basePage";

class MainPage extends BasePage{
    /**
    * Opens the before page of Accessibile University
    * @returns the page with accessibility issues
    */
    public openBefore(remote=true) {
        if(remote) return this.openRemote('before.html')
        return this.openLocal('before.html')
    }

    /**
    * Opens the after page of Accessibile University
    * @returns the page with accessibility issues fixed
    */
    public openAfter(remote=true) {
        if(remote) return this.openRemote('after.html')
        return this.openLocal('after.html')
    }
}
export default new MainPage()