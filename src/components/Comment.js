import store from "../store";
import LikeComment from "./LikeComment";
import MAIN from "./MAIN";
import Replies from "./Replies";
import ReplyBtn from "./ReplyBtn";
import ReplyComment from "./ReplyComment";

class Comment extends MAIN {

  #data = {
    author: ""
  }

  async initiate(props) {
    if (store.data.allUsers.length === 0) {
      await store.methods.getAllUsers();
    }

    if (store.data.allUsers.length) {
      this.#data.author = store.data.allUsers.find(user => user.username === props.comment?.author);
      this.rerender(props);
    }
  }

  handler(props) {
    this.select(`#replyBtn${props?.id}`).addEventListener("click", () => {
      if (this.select(`#replyCommentsSection${props?.id}`).innerHTML.length === 0) {
        ReplyComment.rerender(props);
        this.select(`#replyCommentsSection${props?.id}`).classList.remove("hidden");
      } else {
        ReplyComment.clear(props);
        this.select(`#replyCommentsSection${props?.id}`).classList.add("hidden");
      }
    })
  }

  #UI(comment, id, mainAuthor) {
    return `
        <div class="bg-white w-full rounded-lg p-5 flex gap-5 max-[500px]:flex-wrap max-[500px]:justify-between">
          <div id="likeComments${id}" class="max-[500px]:order-2">
            ${LikeComment.render({ comment: comment })}
          </div>

          <div class="break-all max-[500px]:order-1 max-[500px]:w-full flex flex-col gap-4">
            <div class="flex items-center gap-5">
              <span>
                <img class="rounded-full w-10 cursor-pointer" src="${this.#data.author?.avatar}" />
              </span>

              <span class="cursor-pointer">
                <div class="text-sm font-bold">${this.#data.author?.name}</div>
                <div class="text-xs text-[#67727eff]">@${this.#data.author?.username}</div>
              </span>

              <span class="text-sm text-[#67727eff]">
                ${comment?.createdAt}
              <span>
            </div>

            <div class="text-sm text-[#67727eff]">
              <p>
                ${`${id}`.includes("_") ? `<span class="text-[#5457b6ff] font-medium">@${mainAuthor}</span>` : ''}
                ${comment?.content}
              </p>
            </div>
          </div>

          <div class="max-[500px]:order-3">
            ${ReplyBtn.render({ comment: comment, id: id })}
          </div>
        </div>
        
        ${comment?.replies?.length ?
        `
        ${Replies.render({ comment: comment, id: id })}
        ` : ""}

        `
  }

  render(props) {
    setTimeout(async () => {
      await this.initiate(props);
      this.handler(props);
    });
    return this.#UI(props?.comment, props?.id, props?.mainAuthor);
  }

  rerender(props) {
    this.select(`#comment${props?.id}`).innerHTML = "";
    this.select(`#comment${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props?.comment, props?.id, props?.mainAuthor));
  }
}

export default new Comment();