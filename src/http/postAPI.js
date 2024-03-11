import { $authHost} from "./index";

export const getPosts = async (id) => {
    const {data} = await $authHost.get(`api/post/${id}`)
    return data
}

export const createPost = async (postNumber, executed, postDate, article, description, estimatedPrice, payment, company, contractDate, additionalInformation, organizationId) => {
    const {data} = await $authHost.post('api/post', {postNumber, executed, postDate, article, description, estimatedPrice, payment, company, contractDate, additionalInformation, organizationId})
    return data
}

export const deletePost = async (postId) => {
    const {data} = await $authHost.post('api/post/delete', {postId})
    return data
}

export const updatePost = async (id, post) => {
    const {data} = await $authHost.put(`api/post/${id}`, post)
    return data
}

export const getByUserId = async (id) => {
    const {data} = await $authHost.post('api/post/getByUserId', {id})
    return data
}

