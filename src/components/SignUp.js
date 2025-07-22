import useCheckRegex from "../hooks/useCheckRegex";
import MAIN from "./MAIN";

class SignUp extends MAIN {

    #data = {
        name: "",
        username: "",
        password: "",
        passwordConfirm: "",

        showPassword: false,
        showPasswordConfirm: false,

        nameCheck: true,
        usernameCheck: true,
        passwordCheck: true,
        passwordConfirmCheck: true
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

        this.select("#passwordConfirm").addEventListener("change", () => {
            this.#data.passwordConfirm = this.select("#passwordConfirm").value;
        })

        this.select("#password").addEventListener("change", () => {
            this.#data.password = this.select("#password").value;
        })

        this.select("#showPasswordBtn").addEventListener("change", () => {
            this.#data.showPassword = !this.#data.showPassword;
            this.rerender();
        })

        this.select("#showPasswordConfirmBtn").addEventListener("change", () => {
            this.#data.showPasswordConfirm = !this.#data.showPasswordConfirm;
            this.rerender();
        })

        this.select("#signUpForm").addEventListener("submit", (event) => {
            event.preventDefault();
            let { name, username, password, passwordConfirm } = useCheckRegex({ name: this.#data.name, username: this.#data.username, password: this.#data.password, passwordConfirm: this.#data.passwordConfirm });
            this.#data.nameCheck = name;
            this.#data.usernameCheck = username;
            this.#data.passwordCheck = password;
            this.#data.passwordConfirmCheck = passwordConfirm;
            console.log(name, username, password, passwordConfirm);
            if (name && username && password && passwordConfirm) {
                console.log({ name: this.#data.name, username: this.#data.username, password: this.#data.password, passwordConfirm: this.#data.passwordConfirm });
            }
            this.rerender();
        })
    }

    #UI() {
        return `
        <div id="signUp" class="w-full h-screen flex flex-col justify-center items-center">
          <form id="signUpForm" class="px-8 py-5 bg-[#ffffffff] shadow-md rounded-lg flex flex-col gap-4">
            <div>
              <label>Name</label><br/>
              <input id="name" class="string-input" value="${this.#data.name}" required />
              ${ this.#data.nameCheck ? '' : '<div id="nameError" class="w-[228px] text-xs text-red-500">Should be like: 2–50 characters, Letters (English or Persian), Spaces and hyphens only</div>' }
            </div>

            <div>
              <label>Username</label><br/>
              <input id="username" class="string-input" value="${this.#data.username}" required />
              ${ this.#data.usernameCheck ? '' : '<div id="usernameError" class="w-[228px] text-xs text-red-500">Should be like: 3–20 characters, Starts with a letter, Only letters, digits</div>' }
            </div>

            <div>
              <label>Password</label><br/>
              <input id="password" class="string-input" type="${this.#data.showPassword ? 'text' : 'password'}" value="${this.#data.password}" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showPasswordBtn" class="w-3 h-3" ${this.#data.showPassword ? 'checked' : ''} /></span>
                <span>Show Password</span>
              </div>
              ${ this.#data.passwordCheck ? '' : '<div id="passwordError" class="w-[228px] text-xs text-red-500">Should be like: 8+ characters, At least one uppercase, one lowercase, one digit, one special char</div>' }
            </div>

            <div>
              <label>Confirm Password</label><br/>
              <input id="passwordConfirm" class="string-input" type="${this.#data.showPasswordConfirm ? 'text' : 'password'}" value="${this.#data.passwordConfirm}" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showPasswordConfirmBtn" class="w-3 h-3" ${this.#data.showPasswordConfirm ? 'checked' : ''} /></span>
                <span>Show Password</span>
              </div>
              ${ this.#data.passwordConfirmCheck ? '' : '<div id="passwordConfirmError" class="w-[228px] text-xs text-red-500">Password and Password Cofirm must be the same</div>' }
            </div>
            <div>
              <button id="signUpBtn" class="signup-btn mt-2">Sign Up</button>
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
        this.select("#mainContainer").innerHTML = "";
        this.select("#mainContainer").insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new SignUp();