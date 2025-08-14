import store from "../store";
import Comments from "./Comments";
import MAIN from "./MAIN";

class EditComment extends MAIN {

  #data = {
    edited: ""
  }

  initiate(props) {
    this.select(`#editInput${props?.id} textarea`).innerHTML = props?.comment?.content;
    this.#data.edited = props?.comment?.content;
  }
  
  handler(props) {

    this.select(`#editInput${props?.id} textarea`)?.addEventListener("change", () => {
      this.#data.edited = this.select(`#editInput${props?.id} textarea`)?.value;
    })

    this.select(`#editForm${props?.id}`)?.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      if (this.#data.edited) {
        if (!`${props?.id}`.includes("_")) {
           await store.methods.editComment(props?.comment?.id, {
             content: this.#data.edited
           })
           .then(() => {
             store.data.comments.filter(com => {
                if (`${com.id}` === `${props?.comment?.id}`) {
                    com.content = this.#data.edited
                }
             })
           })
           .then(() => Comments.rerender(props))
        }
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
  }

  rerender(props) {
    setTimeout(() => {
        this.initiate(props);
        this.handler(props);
    });
    this.select(`#editCommentsSection${props?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props));
  }
}

export default new EditComment();