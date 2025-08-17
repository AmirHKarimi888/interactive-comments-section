import store from "../store";
import Comments from "./Comments";
import MAIN from "./MAIN";

class DeleteComment extends MAIN {

    async initiate(props) {
        if (!props?.id.includes("_")) {
            await store.methods.deleteComment(props?.mainComment?.id)
                .then(() => {
                    store.data.comments = store.data.comments.filter(com => {
                        if (`${com.id}` !== `${props?.mainComment?.id}`) {
                            return com;
                        }
                    })
                    Comments.rerender();
                })


        } else {
            let replies = props?.mainComment?.replies;
            replies = replies.filter(reply => {
                if (`${reply.id}` !== `${props?.comment?.id}`) {
                    return reply;
                }
            })
            await store.methods.editComment(`${props?.mainComment?.id}`, {
                replies: replies
            })
            .then(() => {
                store.data.comments.filter(comment => {
                    if (`${comment.id}` === `${props?.mainComment?.id}`) {
                        comment.replies = [...replies];
                    }
                })
                Comments.rerender();
            })
        }
    }

    #UI(id) {
        return `
        <button id="deleteBtn${id}" class="delete-btn flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-[#ed6468ff] hover:opacity-40 duration-100">
          <img src="./assets/images/icon-delete.svg" />
          <span>Delete</span>
        </button>
        `
    }

    render(props) {
        return this.#UI(props?.id);
    }

    async rerender(props) {
        await this.initiate(props);
    }
}

export default new DeleteComment();