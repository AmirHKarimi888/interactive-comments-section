import MAIN from "./components/MAIN";

class App extends MAIN {
    initiate() {

    }

    #UI() {
        return `
        <div>Hello</div>
        `
    }

    render(parent) {
        this.select(parent).innerHTML = "";
        this.select(parent).insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new App();