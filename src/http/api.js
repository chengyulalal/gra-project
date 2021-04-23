/*
 * @Date: 2021-04-21 13:34:16
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-22 14:37:37
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