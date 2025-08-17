import MAIN from "./MAIN";

class EditBtn extends MAIN {


    #UI(id) {
        return `
        <button id="editBtn${id}" class="edit-btn flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-[#5457b6ff] hover:opacity-40 duration-100">
          <img src="./assets/images/icon-edit.svg" />
          <span>Edit</span>
        </button>
        `
    }

    render(props) {
        return this.#UI(props?.id);
    }
}

export default new EditBtn();