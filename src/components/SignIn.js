import store from "../store";
import Authentication from "./Authentication";
import MAIN from "./MAIN";

class SignIn extends MAIN {

    #data = {
        username: "",
        password: "",

        showPassword: false,

        usernameCheck: true,
        passwordCheck: true,
        existanceCheck: true
    }

    handler() {
        this.select("#switchToSignUpBtn").addEventListener("click", () => {
            store.data.isSignUpPage = true;
            Authentication.rerender();
        })

        this.select("#username").addEventListener("change", () => {
            this.#data.username = this.select("#username").value;
        })

        this.select("#password").addEventListener("change", () => {
            this.#data.password = this.select("#password").value;
        })

        this.select("#showPasswordBtn").addEventListener("change", () => {
            this.#data.showPassword = !this.#data.showPassword;
            this.rerender();
        })

        this.select("#signInForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            await store.methods.getAllUsers()
            .then(async() => {
              let foundUser = store.data.allUsers.find(user => user.username === this.#data.username && user.password === this.#data.password);
              this.#data.existanceCheck = foundUser ? true : false;

              if (this.#data.existanceCheck) {
                await store.methods.signInUser(foundUser)
                .then(() => {
                  this.#data.username = "";
                  this.#data.password = "";
                })
              } else {
                this.rerender();
              }
            })
        })
    }

    #UI() {
        return `
        <div id="signIn" class="w-full h-screen flex flex-col justify-center items-center">
          <form id="signInForm" class="px-8 py-5 bg-[#ffffffff] shadow-md rounded-lg flex flex-col gap-4">

            <div>
              <label>Username</label><br/>
              <input id="username" class="string-input" value="${this.#data.username}" required />
              ${this.#data.usernameCheck ? '' : '<div id="usernameError" class="w-[228px] text-xs text-red-500">Should be like: 3–20 characters, Starts with a letter, Only letters, digits</div>'}
            </div>

            <div>
              <label>Password</label><br/>
              <input id="password" class="string-input" type="${this.#data.showPassword ? 'text' : 'password'}" value="${this.#data.password}" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showPasswordBtn" class="w-3 h-3" ${this.#data.showPassword ? 'checked' : ''} /></span>
                <span>Show Password</span>
              </div>
              ${this.#data.passwordCheck ? '' : '<div id="passwordError" class="w-[228px] text-xs text-red-500">Should be like: 8+ characters, At least one uppercase, one lowercase, one digit, one special char</div>'}
            </div>

            <div>
              <button id="signUpBtn" class="signup-btn mt-2">Sign In</button>
            </div>

            ${this.#data.existanceCheck ? '' : '<div id="passwordConfirmError" class="w-[228px] text-xs text-red-500">Username is not found!</div>'}

            <div class="text-xs w-[228px]">
              <span>Don't have an account yet?</span>
              <span id="switchToSignUpBtn" class="cursor-pointer text-[#5457b6ff]">Sign Up</span> 
            </div>
          </form>
        </div>
        `
    }

    render() {
        setTimeout(() => this.handler());
        return this.#UI();
    }

    rerender() {
        setTimeout(() => this.handler());
        this.select("#authentication").innerHTML = "";
        this.select("#authentication").insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new SignIn();