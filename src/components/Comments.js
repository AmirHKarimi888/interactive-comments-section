import store from "../store";
import AddComment from "./AddComment";
import Comment from "./Comment";
import MAIN from "./MAIN";

class Comments extends MAIN {
    async initiate() {
        await store.methods.getComments()
        .then(() => this.rerender());
    }

    handler() {
        this.select("#signOutBtn")?.addEventListener("click", () => store.methods.signOut());
    }

    #UI() {
        return `
        <ul id="commentsSection" class="flex flex-col gap-3">
          ${ store.data.loggedInUser?.id ? `${JSON.stringify(store.data.loggedInUser)}<br/><br/><button id="signOutBtn">Sign Out</button>` : '' }
          ${store.data.comments.map(comment => {
            return `
            <li id="comment${comment?.id}">
              ${Comment.render({ comment: comment, id: comment?.id })}
            </li>
            `
          })
          .join("")}
          <div>
            ${AddComment.render()}
          </div>
        </ul>
        `
    }

    render() {
        setTimeout(async() => {
            await this.initiate()
            this.handler();
        });
        return this.#UI();
    }

    rerender() {
        setTimeout(() => this.handler());
        this.select("#commentsSection").innerHTML = "";
        this.select("#commentsSection").insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new Comments();