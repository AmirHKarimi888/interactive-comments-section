import store from "../store";
import MAIN from "./MAIN";

class EditComment extends MAIN {

  #data = {
    edited: ""
  }

  initiate(props) {
    if (this.select(`#editInput${props?.id} textarea`)) {
      this.select(`#editInput${props?.id} textarea`).innerHTML = props?.comment?.content;
    }
    this.#data.edited = props?.comment?.content;
  }

  handler(props) {

    this.select(`#editInput${props?.id} textarea`)?.addEventListener("change", () => {
      this.#data.edited = this.select(`#editInput${props?.id} textarea`)?.value;
    })

    this.select(`#editForm${props?.id}`)?.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (this.#data.edited) {
        if (!props?.id.includes("_")) {
          await store.methods.editComment(props?.comment?.id, {
            content: this.#data.edited
          })
            .then(() => {
              store.data.comments.filter(com => {
                if (`${com.id}` === `${props?.comment?.id}`) {
                  com.content = this.#data.edited;
                }
              })
            })


        } else {
          let replies = props?.mainComment?.replies;
          replies.filter(reply => {
            if (reply.id === props?.comment?.id) {
              reply.content = this.#data.edited;
            }
          })
          await store.methods.editComment(props?.mainComment?.id, {
            replies: replies
          })
            .then(() => {
              store.data.comments.filter(com => {
                if (`${com.id}` === `${props?.comment?.id}`) {
                  com.replies = [...replies];
                }
              })
            })
        }

        this.select(`#commentContent${props?.id}`).innerHTML = this.#data.edited;
        this.clear(props);
      }
    })
  }

  #UI(props) {
    return `
        <form id="editForm${props?.id}" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[800px]:flex-wrap max-[800px]:justify-between">
          <div class="rounded-full order-1 max-[800px]:order-2">
            <img src="${store.data.loggedInUser?.avatar}" class="rounded-full cursor-pointer" width="35" height="35" />
          </div>

          <div id="editInput${props?.id}" class="order-2 max-[800px]:order-1 w-full">
            <textarea class="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Add a comment..."></textarea>
          </div>

          <div id="editCommentBtn${props?.id}" class="order-3 max-[800px]:order-3">
            <button class="add-comment-btn">UPDATE</button>
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
    this.select(`#editCommentsSection${props?.id}`).innerHTML = "";
    this.select(`#editCommentsSection${props?.id}`).classList.add("hidden");
  }

  rerender(props) {
    setTimeout(() => {
      this.initiate(props);
      this.handler(props);
    });
    this.selectAll(".edit-comment-section").forEach(el => {
      el.innerHTML = "";
      el.classList.add("hidden");
    })
    this.select(`#editCommentsSection${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props));
    this.select(`#editCommentsSection${props?.id}`).classList.remove("hidden");
  }
}

export default new EditComment();