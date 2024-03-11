import {$authHost} from "./index";

export const getOrganizations = async () => {
    const {data} = await $authHost.get('api/organization')
    return data
}

export const getOrganization = async (id) => {
    const {data} = await $authHost.get(`api/organization/${id}`)
    return data
}

export const createOrganization = async (name) => {
    const {data} = await $authHost.post('api/organization', {name})
    return data
}

export const deleteOrganization = async (name) => {
    const {data} = await $authHost.delete('api/organization', { data: { name } })
    return data
}
