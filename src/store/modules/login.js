/*
 * @Author: 曹捷
 * @Date: 2019-08-20 09:45:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-07-15 15:01:36
 * @Description: 用户权限
 */

const login = {
    state: {
        userInfo: {}
    },
    mutations: {
        setLogin: (state, value) => {
            state.userInfo = value
        },
    },
    actions: {

    },
    getters: {
        userInfo: state => state.userInfo,
    }
}

export default login


