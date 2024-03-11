import {$authHost} from "./index";

export const createFile = async (formData) => {
    const {data} = await $authHost.post('api/file', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data
}

export const deleteFile = async (id) => {
    const {data} = await $authHost.delete(`api/file/delete/${id}`)
    return data
}

