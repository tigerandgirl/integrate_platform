import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import '@/less/gentelella/animation.css'

/*
{
    icon: 'fa-wrench',
    text: '基础配置',
    childMenus: [{
        href: '/home/basic/system',
        text: '系统配置'
    }, {
        href: '/home/basic/service',
        text: '服务配置'
    }]
}, {
    icon: 'fa-wrench',
    text: '高级配置',
    childMenus: [{
        href: '/home/advanced/system',
        text: '高级系统配置'
    }, {
        href: '/home/advanced/service',
        text: '高级服务配置'
    }]
},
{
    icon: 'fa-sun-o',
    text: '任务管理',
    href: '/home/erp'
},
{
    icon: 'fa-sun-o',
    text: 'SSC系统管理',
    href: '/home/erp'
},
{
    icon: 'fa-sun-o',
    text: '定时任务',
    href: '/home/erp'
},
{
    icon: 'fa-sun-o',
    text: 'JSON转换配置',
    href: '/home/erp'
},
*/

const menus = [
{
    icon: 'fa-sun-o',
    text: 'ERP系统管理',
    href: '/home/erp'
},
{
    icon: 'fa-sun-o',
    text: '通道管理',
    href: '/home/channel'
}]

let locationLast = ''

export class SidebarList extends Component {
    render() {
        const that = this
        // 父组件传入onMenuToggle, isActivedMenu, isSidebarShown
        const { onMenuToggle, isActivedMenu, isSidebarShown } = that.props
        return (
            <ul className="nav side-menu">
                {
                    menus.map(function (menu, i) {
                        // 判断当前菜单路由是否激活状态
                        let isRouteActive = menu.href ? that.context.router.isActive(menu.href, true) : false
                        return (
                            // 若一级菜单有href，则进行跳转，并注销所有菜单的下拉状态
                            // 若没有，则进行子菜单的下拉或者收起
                            <li
                                onClick={() => { if (menu.href) { onMenuToggle(i, isRouteActive); that.context.router.push(menu.href) } else { onMenuToggle(i, isActivedMenu(i)) } } }
                                // 若激活状态，则添加激活样式
                                className={isActivedMenu(i) ? 'active' : (isRouteActive ? 'active' : '')}
                                key={i}>
                                <a>
                                    <i className={'fa ' + menu.icon}></i>
                                    {menu.text}
                                </a>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }
    // 检测路由激活状态，并更新
    checkActiveMenu() {
        const that = this
        menus.forEach((item, i) => {
            if (item.href) {
                let state = that.context.router.isActive(item.href, true)
                if (state) that.props.onMenuToggle(i, !state)
            } else if (item.childMenus) {
                item.childMenus.forEach(childMenu => {
                    let state = that.context.router.isActive(childMenu.href, true)
                    if (state) {
                        that.props.onMenuToggle(i, !state)
                    }
                })
            }
        })
    }

    componentDidMount() {
        this.checkActiveMenu()
    }
    componentDidUpdate(prevProps, prevStates, other) {
        // 路由更新后，触发路由检测
        if (other.router.location.pathname !== locationLast) {
            this.checkActiveMenu()
            locationLast = other.router.location.pathname
        }
    }
}

SidebarList.contextTypes = {
    router: React.PropTypes.object
}


export default SidebarList
