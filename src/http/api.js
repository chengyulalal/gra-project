/*
 * @Date: 2021-04-21 13:34:16
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-22 19:46:17
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
export function uploadFile(data) {
    return Axios({
        url: "/uploadFile",
        method: 'post',
        data: data
    })
}
export function list(data) {
    return Axios({
        url: "/list",
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        data: data
    })
}
export function download(data) {
    return Axios({
        url: "/download",
        method: 'post',
        responseType: 'blob',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        data: data
    })
}
export function addcourse(data) {
    return Axios({
        url: "/addcourse",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function getStudent(data) {
    return Axios({
        url: "/getStudent",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function updataGrade(data) {
    return Axios({
        url: "/updataGrade",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function teacherReload(data) {
    return Axios({
        url: "/teacherReload",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function outclass(data) {
    return Axios({
        url: "/outclass",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
export function onefile(data) {
    return Axios({
        url: "/onefile",
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
