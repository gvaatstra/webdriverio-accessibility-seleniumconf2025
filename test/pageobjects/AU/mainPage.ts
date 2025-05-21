import BasePage from "./basePage";

class MainPage extends BasePage{
    /**
    * Opens the BEFORE page of Accessibile University
    */
    public openBefore(remote=false) {
        if(remote) return this.openRemote('before.html')
        return this.openLocal('before.html')
    }

    /**
    * Opens the AFTER page of Accessibile University
    */
    public openAfter(remote=false) {
        if(remote) return this.openRemote('after.html')
        return this.openLocal('after.html')
    }
}
export default new MainPage()