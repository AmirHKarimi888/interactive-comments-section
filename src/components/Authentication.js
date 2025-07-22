import store from "../store";
import MAIN from "./MAIN";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class Authentication extends MAIN {

    #UI() {
        return `
        <div id="authentication">
          ${ store.data.isSignUpPage ? SignUp.render() : SignIn.render() }
        </div>
        `
    }

    render() {
        return this.#UI();
    }

    rerender() {
        this.select("#authentication").innerHTML = "";
        this.select("#authentication").insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new Authentication();