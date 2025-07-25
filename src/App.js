import Authentication from "./components/Authentication";
import Comments from "./components/Comments";
import MAIN from "./components/MAIN";
import store from "./store";

class App extends MAIN {

    async initiate() {
        await store.methods.getSignedInUser();
        // await store.methods.getSelectedUser({username: "aaaaaa", password: ";3d:]xXRMP^9hHD@" })
        // .then(() => console.log(store.data.selectedUser))
    }

    #UI() {
        return `
        <header>

        </header>

        <main>
          <div id="mainContainer" class="max-[450px]:px-2 max-[700px]:px-10 min-[700px]:px-20 rubik-400">
            ${store.data.loggedInUser?.id ? Comments.render() : Authentication.render()}
          </div>
        </main>

        <footer>

        </footer>
        `
    }

    async render(parent) {
        await this.initiate();
        this.select(parent).innerHTML = "";
        this.select(parent).insertAdjacentHTML("afterbegin", this.#UI());
    }

    rerender(parent) {
        this.select(parent).innerHTML = "";
        this.select(parent).insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new App();