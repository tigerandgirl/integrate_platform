import * as home from './action-type';

/*
 * action 创建函数
 */

export function toggleSidebar(state) {
    return { type: home.TOGGLE_SIDEBAR, state }
}

export function toggleMenuDown(index) {
    return { type: home.TOGGLE_MENU_DOWN, index }
}

export function toggleMenuUp(index) {
    return { type: home.TOGGLE_MENU_UP, index }
}

export function setUserName(state) {
    return { type: home.USER_NAME, state }
}
