import Comment from "./Comment";
import EditComment from "./EditComment";
import MAIN from "./MAIN";
import ReplyComment from "./ReplyComment";

class Replies extends MAIN {

  #UI(comment) {
    return `
        <ul id="RepliesSection${comment?.id}" class="flex flex-col mt-3 gap-3 border-l-2 border-gray-300 pl-10 ml-10 max-[800px]:ml-0 max-[800px]:pl-5">

          ${comment?.replies.map(reply => {
      return `
              <li id="comment${comment?.id}_${reply?.id}">
                ${Comment.render({ mainComment: comment, comment: reply, id: `${comment?.id}_${reply?.id}` })}
              </li>

              <div id="replyCommentsSection${comment?.id}_${reply?.id}" class="reply-comment-section hidden">
                ${ReplyComment.render({ mainComment: comment, comment: reply, id: `${comment?.id}_${reply?.id}` })}
              </div>

              <div id="editCommentsSection${comment?.id}_${reply?.id}" class="edit-comment-section hidden">
                ${EditComment.render({ mainComment: comment, comment: reply, id: `${comment?.id}_${reply?.id}` })}
              </div>
              `
    })
        .join("")}
          </ul>
        `
  }

  render(props) {
    return this.#UI(props?.comment);
  }

  rerender(props) {
    this.select(`#repliesSection${props?.mainComment?.id}`).innerHTML = "";
    this.select(`#repliesSection${props?.mainComment?.id}`).insertAdjacentHTML("afterbegin", this.#UI(props?.comment));
  }
}

export default new Replies();