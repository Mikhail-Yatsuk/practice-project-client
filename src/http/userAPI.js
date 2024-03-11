import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login, password, lastName, firstName, patronymic, organizationId, position) => {
    const {data} = await $authHost.post('api/user/registration', {login, password, role: 'USER', lastName, firstName, patronymic, organizationId, position})
    return data
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getLogins = async () => {
    const {data} = await $authHost.get('api/user/get')
    return data
}

export const deleteUser = async (login) => {
    const {data} = await $authHost.delete('api/user/delete', { data: { login } })
    return data
}


