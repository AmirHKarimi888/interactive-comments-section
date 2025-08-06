import store from "../store";
import LikeComment from "./LikeComment";
import MAIN from "./MAIN";
import ReplyOrEditBtn from "./ReplyOrEditBtn";

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

    #UI(comment) {
        return `
        <div id="addCommentsSection" class="bg-white w-full rounded-lg p-5 flex justify-around gap-3 max-[500px]:flex-wrap max-[500px]:justify-between">
          <div id="likeComments${comment?.id}" class="max-[500px]:order-2">
            ${LikeComment.render({ comment: comment })}
          </div>

          <div class="break-all max-[500px]:order-1 max-[500px]:w-full flex flex-col gap-3">
            <div class="flex items-center gap-5">
              <span>
                <img src="${this.#data.author?.avatar}" />
              </span>

              <span>
                <div>${this.#data.author?.name}</div>
                <div>@${this.#data.author?.username}</div>
              </span>

              <span>
                ${comment?.createdAt}
              <span>
            </div>

            <div>
              <p>${comment?.content}</p>
            </div>
          </div>

          <div class="max-[500px]:order-3">
            ${ReplyOrEditBtn.render({ comment: comment })}
          </div>
        </div>
        `
    }

    render(props) {
        setTimeout(async() => await this.initiate(props));
        return this.#UI(props?.comment);
    }

    rerender(props) {
        this.select(`#comment${props.comment?.id}`).innerHTML = "";
        this.select(`#comment${props.comment?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props?.comment));
    }
}

export default new Comment();