import MAIN from "./MAIN";

class LikeComment extends MAIN {

    #UI(mainComment, comment, id) {
        return `
        <div class="rounded-lg flex flex-col gap-3 max-[800px]:flex-row text-[#5457b6ff] bg-[#f5f6faff] p-3 max-[800px]:px-2 max-[800px]:py-1">
          <span id="likeBtn${id}" class="cursor-pointer grid items-center">
              <img src="./public/assets/images/icon-plus.svg">
          </span>

          <span id="numberOfLikes${id}" class="font-medium">
            ${comment?.likes?.length - comment?.dislikes?.length}
          </span>

          <span id="dislikeBtn${id}" class="cursor-pointer grid items-center">
              <img src="./public/assets/images/icon-minus.svg">
          </span>
        </div>
        `
    }

    render(props) {
        return this.#UI(props?.mainComment, props?.comment, props?.id);
    }

    rerender(props) {
        this.select(`#numberOfLikes${props?.id}`).innerHTML = "";
        this.select(`#numberOfLikes${props?.id}`).insertAdjacentHTML("afterbegin", props?.comment?.likes.length - props?.comment?.dislikes.length);
    }
}

export default new LikeComment();