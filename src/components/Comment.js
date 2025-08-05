import store from "../store";
import LikeComment from "./LikeComment";
import MAIN from "./MAIN";

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
        <div id="addCommentsSection" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[500px]:flex-wrap max-[500px]:justify-between">
          <div id="likeComments${comment?.id}">
            ${LikeComment.render({ comment: comment })}
          </div>

          <div class="break-all">
            <p>
            ${JSON.stringify(this.#data.author)}
            </p>
          </div>

          <div>

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