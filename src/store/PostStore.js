import {makeAutoObservable} from "mobx";

export default class PostStore {
    constructor() {
        this._posts = []
        this._selectedPost = {}
        makeAutoObservable(this)
    }

    setPosts(posts) {
        this._posts = posts
    }

    setSelectedPost(post) {
        this._selectedPost = post
    }

    get posts() {
        return this._posts
    }

    get selectedPost() {
        return this._selectedPost
    }
}
