import store from "../store";
import Comments from "./Comments";
import MAIN from "./MAIN";

class AddComment extends MAIN {

  #data = {
    comment: ""
  }

  handler() {

    this.select(`#commentInput textarea`)?.addEventListener("change", () => {
      this.#data.comment = this.select(`#commentInput textarea`)?.value;
    })

    this.select(`#addCommentSection`)?.addEventListener("submit", async (e) => {
      e.preventDefault();
      let biggestId = store.data.comments.sort((a, b) => +b?.id - a?.id)[0]?.id;
      console.log(biggestId);
      let newComment = {
        id: `${+biggestId + 1}`,
        content: this.#data.comment,
        createdAt: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}`,
        author: store.data.loggedInUser?.username,
        replies: [],
        likes: [],
        dislikes: []
      }

      if (this.#data.comment) {
        await store.methods.addComment(newComment)
          .then(() => {
            store.data.comments.push(newComment);
            Comments.rerender();
          })
      }
    })
  }

  #UI() {
    return `
        <form id="addCommentSection" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[800px]:flex-wrap max-[800px]:justify-between">
          <div class="rounded-full order-1 max-[800px]:order-2">
            <img src="${store.data.loggedInUser?.avatar}" class="rounded-full cursor-pointer" width="35" height="35" />
          </div>

          <div id="commentInput" class="order-2 max-[800px]:order-1 w-full">
            <textarea class="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Add a comment..."></textarea>
          </div>

          <div class="order-3 max-[800px]:order-3">
            <button id="addCommentBtn" class="add-comment-btn">SEND</button>
          </div>
        </form>
        `
  }

  render() {
    setTimeout(() => this.handler());
    return this.#UI();
  }

  rerender() {

  }
}

export default new AddComment();