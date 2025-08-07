import MAIN from "./MAIN";

class LikeComment extends MAIN {

    #UI(comment) {
        return `
        <div class="rounded-lg flex flex-col gap-3 max-[500px]:flex-row text-[#5457b6ff] bg-[#f5f6faff] p-3 max-[500px]:px-2 max-[500px]:py-1">
          <span class="cursor-pointer grid items-center">
              <img src="./public/assets/images/icon-plus.svg">
          </span>

          <span class="font-medium">
            ${comment?.likes.length - comment?.dislikes.length}
          </span>

          <span class="cursor-pointer grid items-center">
              <img src="./public/assets/images/icon-minus.svg">
          </span>
        </div>
        `
    }

    render(props) {
        return this.#UI(props?.comment);
    }
}

export default new LikeComment();