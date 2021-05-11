/*
 * @Date: 2021-04-21 13:34:16
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-10 16:03:15
 * @FilePath: \gra-project-sourcetree\src\http\api.js
 */
import Axios from './request'
export function addUser (data) {
    return Axios({
        url: '/addUser',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function getUser(data) {
    return Axios({
        url: "/getUser",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function getClass(data) {
    return Axios({
        url: "/getClass",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function joinClass(data) {
    return Axios({
        url: "/joinClass",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function queryPerson(data) {
    return Axios({
        url: "/queryPerson",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function updataPerson(data) {
    return Axios({
        url: "/updataPerson",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
