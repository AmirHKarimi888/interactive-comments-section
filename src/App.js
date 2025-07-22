import MAIN from "./components/MAIN";
import SignUp from "./components/SignUp";

class App extends MAIN {
    initiate() {

    }

    #UI() {
        return `
        <header>

        </header>

        <main>
          <div id="mainContainer" class="max-[450px]:px-2 max-[700px]:px-10 min-[700px]:px-20 rubik-400">
            ${ SignUp.render() }
          </div>
        </main>

        <footer>

        </footer>
        `
    }

    render(parent) {
        this.select(parent).innerHTML = "";
        this.select(parent).insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new App();