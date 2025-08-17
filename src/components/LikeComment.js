import store from "../store";
import MAIN from "./MAIN";

class LikeComment extends MAIN {

    async initiate(props) {
        let likes = [];
        let dislikes = [];

        // Like btn is clicked
        if (!props?.isDislike) {

            if (props?.comment?.likes.includes(store.data.loggedInUser?.username)) {

                likes = [...props?.comment?.likes].filter(like => {
                    if (like !== store.data.loggedInUser?.username) {
                        return like;
                    }
                })

            } else {
                likes = [...props?.comment?.likes, store.data.loggedInUser?.username];
                dislikes = [...props?.comment?.dislikes].filter(dislike => {
                    if (dislike !== store.data.loggedInUser?.username) {
                        return dislike;
                    }
                })
            }


            // The comment is not a reply, since reply ids dont't include _
            if (!props?.id.includes("_")) {

                await store.methods.editComment(props?.id?.split("_")[0], {
                    likes: likes,
                    dislikes: dislikes
                })
                    .then(() => {
                        store.data.comments.filter(com => {
                            if (com.id === props?.comment?.id) {
                                com.likes = [...likes];
                                com.dislikes = [...dislikes];
                            }
                        })

                    })


            // The comment is a reply        
            } else {

                let replies = props?.mainComment?.replies;

                replies.filter(rep => {
                    if (+rep.id === +props?.id.split("_")[1]) {
                        rep.likes = [...likes];
                        rep.dislikes = [...dislikes];
                    }
                })

                await store.methods.editComment(props?.id?.split("_")[0], {
                    replies: replies
                })
                    .then(() => {
                        store.data.comments.filter(com => {
                            if (com.id === props?.comment?.id) {
                                com.replies = replies;
                            }
                        })

                    })

            }


        // Dislike btn is clicked
        } else {

            if (props?.comment?.dislikes.includes(store.data.loggedInUser?.username)) {

                dislikes = [...props?.comment?.dislikes].filter(dislike => {
                    if (dislike !== store.data.loggedInUser?.username) {
                        return dislike;
                    }
                })

            } else {
                dislikes = [...props?.comment?.dislikes, store.data.loggedInUser?.username];
                likes = [...props?.comment?.likes].filter(like => {
                    if (like !== store.data.loggedInUser?.username) {
                        return like;
                    }
                })
            }


            // The comment is not a reply, since reply ids dont't include _
            if (!props?.id.includes("_")) {

                await store.methods.editComment(props?.id?.split("_")[0], {
                    likes: likes,
                    dislikes: dislikes
                })
                    .then(() => {
                        store.data.comments.filter(com => {
                            if (com.id === props?.comment?.id) {
                                com.likes = [...likes];
                                com.dislikes = [...dislikes];
                            }
                        })
                    })


            // The comment is a reply
            } else {

                let replies = props?.mainComment?.replies;

                replies.filter(rep => {
                    if (+rep.id === +props?.id.split("_")[1]) {
                        rep.likes = [...likes];
                        rep.dislikes = [...dislikes];
                    }
                })

                await store.methods.editComment(props?.id?.split("_")[0], {
                    replies: replies
                })
                    .then(() => {
                        store.data.comments.filter(com => {
                            if (com.id === props?.comment?.id) {
                                com.replies = replies;
                            }
                        })
                    })
            }
        }
    }

    #UI(mainComment, comment, id) {
        return `
        <div class="rounded-lg flex flex-col gap-3 max-[800px]:flex-row text-[#5457b6ff] bg-[#f5f6faff] p-3 max-[800px]:px-2 max-[800px]:py-1">
          <span id="likeBtn${id}" class="cursor-pointer grid items-center">
              <img src="./assets/images/icon-plus.svg">
          </span>

          <span id="numberOfLikes${id}" class="font-medium">
            ${comment?.likes?.length - comment?.dislikes?.length}
          </span>

          <span id="dislikeBtn${id}" class="cursor-pointer grid items-center">
              <img src="./assets/images/icon-minus.svg">
          </span>
        </div>
        `
    }

    render(props) {
        return this.#UI(props?.mainComment, props?.comment, props?.id);
    }

    async rerender(props) {
        await this.initiate(props)
            .then(() => {
                this.select(`#numberOfLikes${props?.id}`).innerHTML = "";
                this.select(`#numberOfLikes${props?.id}`).insertAdjacentHTML("afterbegin", props?.comment?.likes.length - props?.comment?.dislikes.length);
            })
    }
}

export default new LikeComment();