import MAIN from "./MAIN";

class DeleteBtn extends MAIN {


    #UI(id) {
        return `
        <button id="deleteBtn${id}" class="delete-btn flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-[#ed6468ff] hover:opacity-40 duration-100">
          <img src="./public/assets/images/icon-delete.svg" />
          <span>Delete</span>
        </button>
        `
    }

    render(props) {
        return this.#UI(props?.id);
    }
}

export default new DeleteBtn();