import BasePage from "./basePage";

class MainPage extends BasePage{
    /**
    * Opens the before page of Accessibile University
    * @returns the page with accessibility issues
    */
    public openBefore() {
        return this.open('before.html')
    }

    /**
    * Opens the after page of Accessibile University
    * @returns the page with accessibility issues fixed
    */
    public openAfter() {
        return this.open('after.html')
    }
}
export default new MainPage()