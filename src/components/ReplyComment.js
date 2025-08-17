import store from "../store";
import Comments from "./Comments";
import MAIN from "./MAIN";

class ReplyComment extends MAIN {

  #data = {
    reply: ""
  }

  handler(props) {

    this.select(`#replyInput${props?.id} textarea`)?.addEventListener("change", () => {
      this.#data.reply = this.select(`#replyInput${props?.id} textarea`)?.value;
    })

    this.select(`#replyForm${props?.id}`)?.addEventListener("submit", async (e) => {
      e.preventDefault();
      let replies = props?.mainComment?.replies;
      let biggestId = "0";

      if (replies.length) {
        biggestId = [...replies].sort((a, b) => +b?.id - a?.id)[0]?.id;
      }

      let newReply = {
        id: `${+biggestId + 1}`,
        content: this.#data.reply,
        createdAt: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}`,
        author: store.data.loggedInUser?.username,
        to: props?.comment?.author,
        likes: [],
        dislikes: []
      }

      if (this.#data.reply) {

        await store.methods.editComment(props?.mainComment?.id, {
          replies: [...replies, newReply]
        })
          .then(() => {
            store.data.comments.filter(com => {
              if (`${com.id}` === `${props?.mainComment?.id}`) {
                com.replies = [...com.replies, newReply];
              }
            })
            Comments.render();
          })
      }
    })
  }

  #UI(props) {
    return `
        <form id="replyForm${props?.id}" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[800px]:flex-wrap max-[800px]:justify-between">
          <div class="rounded-full order-1 max-[800px]:order-2">
            <img src="${store.data.loggedInUser?.avatar}" class="rounded-full cursor-pointer" width="35" height="35" />
          </div>

          <div id="replyInput${props?.id}" class="order-2 max-[800px]:order-1 w-full">
            <textarea class="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Add a comment..."></textarea>
          </div>

          <div id="replyCommentBtn${props?.id}" class="order-3 max-[800px]:order-3">
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
    this.select(`#replyCommentsSection${props?.id}`).classList.add("hidden");
  }

  rerender(props) {
    setTimeout(() => this.handler(props));
    this.selectAll(".reply-comment-section").forEach(el => {
      el.innerHTML = "";
      el.classList.add("hidden");
    })
    this.select(`#replyCommentsSection${props?.id}`)?.insertAdjacentHTML("afterbegin", this.#UI(props));
    this.select(`#replyCommentsSection${props?.id}`).classList.remove("hidden");
  }
}

export default new ReplyComment();