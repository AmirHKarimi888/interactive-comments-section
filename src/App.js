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
          <div id="mainContainer" class="max-[800px]:px-4 py-12 max-[900px]:px-8 min-[900px]:px-16 min-[1000px]:px-32 min-[1200px]:px-64 rubik-400">
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