import store from "../store";
import Comments from "./Comments";
import DeleteBtn from "./DeleteBtn";
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
        this.select(`#replyCommentsSection${props?.id}`).classList.remove("hidden");
      } else {
        ReplyComment.clear(props);
        this.select(`#replyCommentsSection${props?.id}`).classList.add("hidden");
      }
    })

    this.select(`#editBtn${props?.id}`)?.addEventListener("click", () => {
      if (this.select(`#editCommentsSection${props?.id}`).innerHTML.length === 0) {
        EditComment.rerender(props);
        this.select(`#editCommentsSection${props?.id}`).classList.remove("hidden");
      } else {
        EditComment.clear(props);
        this.select(`#editCommentsSection${props?.id}`).classList.add("hidden");
      }
    })

    this.select(`#deleteBtn${props?.id}`)?.addEventListener("click", async () => {
      await store.methods.deleteComment(props?.comment?.id)
        .then(() => {
          store.data.comments = store.data.comments.filter(com => {
            if (`${com.id}` !== `${props?.comment?.id}`) {
              return com;
            }
          })
        })
        .then(() => Comments.render())
    })

    this.select(`#likeBtn${props?.id}`).addEventListener("click", async () => {

      let likes = [];
      let dislikes = [];

      if (!props?.id.includes("_")) {

        if (props?.comment?.likes.includes(store.data.loggedInUser?.username)) {

          likes = [...props?.comment?.likes].filter(like => {
            if (like !== store.data.loggedInUser?.username) {
              return like;
            }
          })

        } else {
          likes = [...props?.comment?.likes, store.data.loggedInUser?.username];
          dislikes = [...props?.comment?.dislikes].filter(dislike => {
            if (dislike !== store.data.loggedInUser?.username) {
              return dislike;
            }
          })
        }

        await store.methods.editComment(props?.comment?.id, {
          likes: likes,
          dislikes: dislikes
        })
          .then(() => {
            store.data.comments.filter(com => {
              if (com.id === props?.comment?.id) {
                com.likes = [...likes];
                com.dislikes = [...dislikes];
              }
            })

            LikeComment.rerender(props);
          })

      }
    })

    this.select(`#dislikeBtn${props?.id}`).addEventListener("click", async () => {

      let likes = [];
      let dislikes = [];

      if (!props?.id.includes("_")) {

        if (props?.comment?.dislikes.includes(store.data.loggedInUser?.username)) {

          dislikes = [...props?.comment?.dislikes].filter(dislike => {
            if (dislike !== store.data.loggedInUser?.username) {
              return dislike;
            }
          })

        } else {
          dislikes = [...props?.comment?.dislikes, store.data.loggedInUser?.username];
          likes = [...props?.comment?.likes].filter(like => {
            if (like !== store.data.loggedInUser?.username) {
              return like;
            }
          })
        }

        await store.methods.editComment(props?.comment?.id, {
          likes: likes,
          dislikes: dislikes
        })
          .then(() => {
            store.data.comments.filter(com => {
              if (com.id === props?.comment?.id) {
                com.likes = [...likes];
                com.dislikes = [...dislikes];
              }
            })

            LikeComment.rerender(props);
          })

      }
    })
  }

  #UI(comment, id, mainAuthor) {
    return `
        <div class="bg-white w-full rounded-lg p-5 flex gap-5 max-[800px]:flex-wrap max-[800px]:justify-between">
          <div id="likesSection${id}" class="max-[800px]:order-2">
            ${LikeComment.render({ comment: comment, id: id })}
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
                ${comment?.createdAt}
              <span>
            </div>

            <div class="text-sm text-[#67727eff] break-all">
              <p>
                ${`${id}`.includes("_") ? `<span class="text-[#5457b6ff] font-medium">@${mainAuthor}</span>` : ''}
                ${comment?.content}
              </p>
            </div>
          </div>

          <div class="max-[800px]:order-3">
            ${comment?.author !== store.data.loggedInUser?.username ? `
              ${ReplyBtn.render({ comment: comment, id: id })}
            ` : `
              <span class="flex gap-2">
                ${DeleteBtn.render({ comment: comment, id: id })}
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
    return this.#UI(props?.comment, props?.id, props?.mainAuthor);
  }

  rerender(props) {
    this.select(`#comment${props?.id}`).innerHTML = "";
    this.select(`#comment${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props?.comment, props?.id, props?.mainAuthor));
  }
}

export default new Comment();