import Comment from "./Comment";
import MAIN from "./MAIN";

class Replies extends MAIN {


    #UI(comment) {
        return `
        <ul id="RepliesSection${comment?.id}" class="flex flex-col gap-3 border-l-2 border-gray-300 pl-10 ml-10 my-5 max-[500px]:ml-0 max-[500px]:pl-5">

        ${comment?.replies.map(reply => {
            return `
            <li id="comment${comment?.id}_${reply?.id}">
              ${Comment.render({ comment: reply, id: `${comment?.id}_${reply?.id}`, mainAuthor: comment?.author })}
            </li>
            `
        })
        .join("")}
        </ul>
        `
    }

    render(props) {
        return this.#UI(props?.comment);
    }

}

export default new Replies();