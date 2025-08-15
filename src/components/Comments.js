import store from "../store";
import AddComment from "./AddComment";
import Comment from "./Comment";
import EditComment from "./EditComment";
import MAIN from "./MAIN";
import ReplyComment from "./ReplyComment";

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
        <ul id="commentsSection" class="flex flex-col gap-4">
          ${ store.data.loggedInUser?.id ? `<br/><br/><button id="signOutBtn">Sign Out</button>` : '' }
          ${store.data.comments.sort((a, b) => +a?.id - +b?.id).map(comment => {
            return `
            <li id="comment${comment?.id}">
              ${Comment.render({ mainComment: comment, comment: comment, id: comment?.id })}
            </li>
            <div id="replyCommentsSection${comment?.id}" class="reply-section hidden">
              ${ReplyComment.render({ comment: comment, id: comment?.id })}
            </div>
            <div id="editCommentsSection${comment?.id}" class="edit-section hidden">
              ${EditComment.render({ comment: comment, id: comment?.id })}
            </div>
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