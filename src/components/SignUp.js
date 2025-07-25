import useCheckRegex from "../hooks/useCheckRegex";
import useGenerateAvatar from "../hooks/useGenerateAvatar";
import useGenerateUUID from "../hooks/useGenerateUUID";
import store from "../store";
import Authentication from "./Authentication";
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
    passwordConfirmCheck: true,
    existanceCheck: false
  }

  handler() {

    this.select("#switchToSignInBtn").addEventListener("click", () => {
      store.data.isSignUpPage = false;
      Authentication.rerender();
    })

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

    this.select("#showPasswordBtn").addEventListener("change", () => {
      this.#data.showPassword = !this.#data.showPassword;
      this.rerender();
    })

    this.select("#showPasswordConfirmBtn").addEventListener("change", () => {
      this.#data.showPasswordConfirm = !this.#data.showPasswordConfirm;
      this.rerender();
    })

    this.select("#signUpForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      let { name, username, password, passwordConfirm } = useCheckRegex({ name: this.#data.name, username: this.#data.username, password: this.#data.password, passwordConfirm: this.#data.passwordConfirm });
      this.#data.nameCheck = name;
      this.#data.usernameCheck = username;
      this.#data.passwordCheck = password;
      this.#data.passwordConfirmCheck = passwordConfirm;

      if (name && username && password && passwordConfirm) {
        const newUser = {
          uuid: useGenerateUUID().uuid,
          name: this.#data.name,
          username: this.#data.username,
          password: this.#data.password,
          avatar: useGenerateAvatar(this.#data.name).avatarUrl
        }

        await store.methods.getAllUsers()
          .then(async () => this.#data.existanceCheck = store.data.allUsers.some(user => user.username === newUser.username && user.password === newUser.password))

        if (!this.#data.existanceCheck) {
          await store.methods.signUpUser(newUser)
            .then(async (data) => await store.methods.signInUser(data))
        } else {
          this.rerender();
        }

      } else {
        this.rerender();
      }
    })
  }

  #UI() {
    return `
        <div id="signUp" class="w-full h-screen flex flex-col justify-center items-center">
          <form id="signUpForm" class="px-8 py-5 bg-[#ffffffff] shadow-md rounded-lg flex flex-col gap-4">
            <div>
              <label>Name</label><br/>
              <input id="name" class="string-input" value="${this.#data.name}" required />
              ${this.#data.nameCheck ? '' : '<div id="nameError" class="w-[228px] text-xs text-red-500">Should be like: 2–50 characters, Letters (English or Persian), Spaces and hyphens only</div>'}
            </div>

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
              <label>Confirm Password</label><br/>
              <input id="passwordConfirm" class="string-input" type="${this.#data.showPasswordConfirm ? 'text' : 'password'}" value="${this.#data.passwordConfirm}" required />
              <div class="text-sm mt-1">
                <span><input type="checkbox" id="showPasswordConfirmBtn" class="w-3 h-3" ${this.#data.showPasswordConfirm ? 'checked' : ''} /></span>
                <span>Show Password</span>
              </div>
              ${this.#data.passwordConfirmCheck ? '' : '<div id="passwordConfirmError" class="w-[228px] text-xs text-red-500">Password and Password Cofirm must be the same</div>'}
            </div>
            <div>
              <button id="signUpBtn" class="signup-btn mt-2">Sign Up</button>
            </div>

            ${this.#data.existanceCheck ? '<div id="passwordConfirmError" class="w-[228px] text-xs text-red-500">Username already exists!</div>' : ''}

            <div class="text-xs w-[228px]">
              <span>Do you already have an account?</span>
              <span id="switchToSignInBtn" class="cursor-pointer text-[#5457b6ff]">Sign In</span> 
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

export default new SignUp();