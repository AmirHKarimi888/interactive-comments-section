import useFormatDate from "../hooks/useFormatDate";
import store from "../store";
import DeleteComment from "./DeleteComment";
import EditBtn from "./EditBtn";
import EditComment from "./EditComment";
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
    this.select(`#replyBtn${props?.id}`)?.addEventListener("click", () => {
      if (this.select(`#replyCommentsSection${props?.id}`).innerHTML.length === 0) {
        ReplyComment.rerender(props);
      } else {
        ReplyComment.clear(props);
      }
    })

    this.select(`#editBtn${props?.id}`)?.addEventListener("click", () => {
      if (this.select(`#editCommentsSection${props?.id}`).innerHTML.length === 0) {
        EditComment.rerender(props);
      } else {
        EditComment.clear(props);
      }
    })

    this.select(`#deleteBtn${props?.id}`)?.addEventListener("click", async () => {
      await DeleteComment.rerender(props);
    })

    this.select(`#likeBtn${props?.id}`)?.addEventListener("click", async () => {
      await LikeComment.rerender({...props, isDislike: false});
    })

    this.select(`#dislikeBtn${props?.id}`)?.addEventListener("click", async () => {
      await LikeComment.rerender({...props, isDislike: true});
    })
  }

  #UI(mainComment, comment, id) {
    return `
        <div class="bg-white w-full rounded-lg p-5 flex gap-5 max-[800px]:flex-wrap max-[800px]:justify-between">
          <div id="likesSection${id}" class="max-[800px]:order-2">
            ${LikeComment.render({ mainComment: mainComment, comment: comment, id: id })}
          </div>

          <div class="max-[800px]:order-1 max-[800px]:w-full flex flex-col gap-4">
            <div class="flex items-center gap-5">
              <span>
                <img class="rounded-full w-10 cursor-pointer" src="${this.#data.author?.avatar}" />
              </span>

              <span class="cursor-pointer">
                <div class="text-sm font-bold">${this.#data.author?.name}</div>
                <div class="text-xs text-[#67727eff]">@${this.#data.author?.username}</div>
              </span>

              ${comment?.author === store.data.loggedInUser?.username ? `
              <span class="bg-[#5457b6ff] text-white text-[0.6rem] px-1.5 rounded-sm">
                you
              </span>
              ` : ''}

              <span class="text-sm text-[#67727eff]">
                ${useFormatDate().formatDateAgo(comment?.createdAt)}
              <span>
            </div>

            <div class="text-sm text-[#67727eff] break-all">
              <p>
                ${`${id}`.includes("_") ? `<span class="text-[#5457b6ff] font-medium">@${mainComment?.author}</span>` : ''}
                <span id="commentContent${id}">${comment?.content}</span>
              </p>
            </div>
          </div>

          <div class="max-[800px]:order-3">
            ${comment?.author !== store.data.loggedInUser?.username ? `
              ${ReplyBtn.render({ comment: comment, id: id })}
            ` : `
              <span class="flex gap-2">
                ${DeleteComment.render({ comment: comment, id: id })}
                ${EditBtn.render({ comment: comment, id: id })}
              </span>
            `}
          </div>
        </div>
        
        ${comment?.replies?.length ?
        `
        <div id="repliesSection${id}">
          ${Replies.render({ comment: comment, id: id })}
        </div>
        ` : ""}

        `
  }

  render(props) {
    setTimeout(async () => {
      await this.initiate(props);
      this.handler(props);
    });
    return this.#UI(props?.mainComment, props?.comment, props?.id);
  }

  rerender(props) {
    if (this.select(`#comment${props?.id}`)) {
      this.select(`#comment${props?.id}`).innerHTML = "";
      this.select(`#comment${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props?.mainComment, props?.comment, props?.id));
    }
  }
}

export default new Comment();