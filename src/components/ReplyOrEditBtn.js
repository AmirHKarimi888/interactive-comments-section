import MAIN from "./MAIN";

class ReplyOrEditBtn extends MAIN {

    #data = {

    }

    handler() {

    }

    #UI(comment) {
        return `
        <button class="flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-[#5457b6ff] hover:opacity-40 duration-100">
          <img src="./public/assets/images/icon-reply.svg" />
          <span>Reply</span>
        </button>
        `
    }

    render(props) {
        setTimeout(() => this.handler());
        return this.#UI(props?.comment);
    }
}

export default new ReplyOrEditBtn();