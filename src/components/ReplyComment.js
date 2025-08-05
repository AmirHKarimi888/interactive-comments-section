import MAIN from "./MAIN";

class ReplyComment extends MAIN {

    #data = {

    }

    handler() {

    }

    #UI() {
        return `
        <form id="replyCommentsSection" class="bg-white w-full rounded-lg p-5 flex justify-center gap-3 max-[500px]:flex-wrap max-[500px]:justify-between">
          <div class="rounded-full order-1 max-[500px]:order-2">
            <img src="${store.data.loggedInUser?.avatar}" class="rounded-full cursor-pointer" width="35" height="35" />
          </div>

          <div class="order-2 max-[500px]:order-1 w-full">
            <textarea class="w-full h-[90px] px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Add a comment..."></textarea>
          </div>

          <div class="order-3 max-[500px]:order-3">
            <button id="replyCommentBtn" class="add-comment-btn">REPLY</button>
          </div>
        </form>
        `
    }

    render() {

    }

    rerender() {

    }
}

export default new ReplyComment();