import MAIN from "./MAIN";

class ReplyOrEditBtn extends MAIN {

    #data = {

    }

    handler() {

    }

    #UI(comment) {
        return `
        <button class="flex cursor-pointer items-center gap-1 p-2 text-sm">
          <img src="./public/assets/images/icon-reply.svg" />
          <span>Replies</span>
        </button>
        `
    }

    render(props) {
        setTimeout(() => this.handler());
        return this.#UI(props?.comment);
    }
}

export default new ReplyOrEditBtn();