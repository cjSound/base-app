/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-07-16 13:14:31
 * @Description: file content
 */

const modulesFiles = require.context("./api", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    return Object.assign(modules, value.default);
}, {});
export default modules
