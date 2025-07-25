import MAIN from "./MAIN";

class Comment extends MAIN {

    #UI(comment) {
        return `
        <div>${JSON.stringify(comment)}</div>
        `
    }

    render(props) {
        return this.#UI(props?.comment);
    }
}

export default new Comment();