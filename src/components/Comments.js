import store from "../store";
import Authentication from "./Authentication";
import Comment from "./Comment";
import MAIN from "./MAIN";

class Comments extends MAIN {
    async initiate() {
        await store.methods.getComments()
        .then(() => this.rerender());
    }

    handler() {
        this.select("#signOutBtn")?.addEventListener("click", () => store.methods.signOut());
    }

    #UI() {
        return `
        <div id="commentsSection">
        ${ store.data.loggedInUser?.id ? `${JSON.stringify(store.data.loggedInUser)}<br/><br/><button id="signOutBtn">Sign Out</button>` : Authentication.render() }
        <br /><br /><br />
        ${store.data.comments.map(comment => {
            return Comment.render({ comment: comment })
        })
        .join("")}
        <div>
        `
    }

    render() {
        setTimeout(async() => {
            await this.initiate()
            this.handler();
        });
        return this.#UI();
    }

    rerender() {
        setTimeout(() => this.handler());
        this.select("#commentsSection").innerHTML = "";
        this.select("#commentsSection").insertAdjacentHTML("afterbegin", this.#UI());
    }
}

export default new Comments();