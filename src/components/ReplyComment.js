import store from "../store";
import MAIN from "./MAIN";

class ReplyComment extends MAIN {

  #data = {
    reply: ""
  }

  handler(props) {

    this.select(`#replyInput${props?.id} textarea`)?.addEventListener("change", () => {
      this.#data.reply = this.select(`#replyInput${props?.id} textarea`)?.value;
    })

    this.select(`#replyForm${props?.id}`)?.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.#data.reply);
    })
  }

  #UI(props) {
    return `
        <form id="replyForm${props?.id}" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[500px]:flex-wrap max-[500px]:justify-between">
          <div class="rounded-full order-1 max-[500px]:order-2">
            <img src="${store.data.loggedInUser?.avatar}" class="rounded-full cursor-pointer" width="35" height="35" />
          </div>

          <div id="replyInput${props?.id}" class="order-2 max-[500px]:order-1 w-full">
            <textarea class="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Add a comment..."></textarea>
          </div>

          <div id="replyCommentBtn${props?.id}" class="order-3 max-[500px]:order-3">
            <button class="add-comment-btn">REPLY</button>
          </div>
        </form>
        `
  }

  render(props) {
    setTimeout(() => {
      this.clear(props);
    });
  }

  clear(props) {
    this.select(`#replyCommentsSection${props?.id}`).innerHTML = "";
  }

  rerender(props) {
    setTimeout(() => this.handler(props));
    this.select(`#replyCommentsSection${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props));
  }
}

export default new ReplyComment();