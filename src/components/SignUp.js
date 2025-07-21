import MAIN from "./MAIN";

class SignUp extends MAIN {
    #data = {
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    }

    handler() {
        this.select("#name").addEventListener("change", () => {
            this.#data.name = this.select("#name").value;
        })

        this.select("#username").addEventListener("change", () => {
            this.#data.username = this.select("#username").value;
        })

        this.select("#password").addEventListener("change", () => {
            this.#data.password = this.select("#password").value;
        })

        this.select("#confirmPassword").addEventListener("change", () => {
            this.#data.confirmPassword = this.select("#confirmPassword").value;
        })

                this.select("#password").addEventListener("change", () => {
            this.#data.password = this.select("#password").value;
        })

        this.select("#signUpForm").addEventListener("submit", (event) => {
            event.preventDefault();
            console.log({
                name: this.#data.name,
                username: this.#data.username,
                password: this.#data.password               
            })
        })
    }

    #UI() {
        return `
        <div id="signUp" class="w-full h-screen flex flex-col justify-center items-center">
          <form id="signUpForm" class="px-8 py-5 bg-[#ffffffff] shadow-md rounded-lg flex flex-col gap-4">
            <div>
              <label>Name</label><br/>
              <input id="name" class="string-input" required />
            </div>
            <div>
              <label>Username</label><br/>
              <input id="username" class="string-input" required />
            </div>
            <div>
              <label>Password</label><br/>
              <input id="password" class="string-input" type="password" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showPassword" class="w-3 h-3" /></span>
                <span>Show Password</span>
              </div>
            </div>
            <div>
              <label>Confirm Password</label><br/>
              <input id="confirmPassword" class="string-input" type="password" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showConfirmPassword" class="w-3 h-3" /></span>
                <span>Show Password</span>
              </div>
            </div>
            <div>
              <button id="signUpBtn" class="signup-btn mt-2">Sign Up</button>
            </div>
          </form>
        </div>
        `
    }

    render() {
        setTimeout(() => {
            this.handler();
        })
        return this.#UI();
    }
}

export default new SignUp();