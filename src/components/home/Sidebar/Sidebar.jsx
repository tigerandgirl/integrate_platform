import React, { Component, PropTypes } from 'react'
// 引入相关的action
import { toggleMenuDown, toggleMenuUp, toggleMenuFocus, toggleSidebar } from '@/store/home/action.js'
// 引入SidebarList组件
import SidebarList from './SidebarList.jsx'

export class Sidebar extends Component {
	render() {
		const that = this
		// 从父组件获得dispatch, isActivedMenu, isSidebarShown
		const { dispatch, isActivedMenu, isSidebarShown } = that.props
		return (
			<div className="col-md-3 left_col menu_fixed">
				<div className="left_col scroll-view">
					<div className="navbar nav_title" style={{ border: 0 }}>
						<a href="index.html" className="site_title"><span>集成平台</span></a>
					</div>
					<div className="navbar toggle ">
							<a id="menu_toggle"  onClick={() => { dispatch(toggleSidebar(isSidebarShown() ? false : true)); $('body').toggleClass('nav-md nav-sm') } }><i className="fa fa-bars"></i></a>
					</div>

					<div className="clearfix"></div>

					<div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
						<div className="menu_section">
							<SidebarList
							// 传入onMenuToggle, isActivedMenu, isSidebarShown给SidebarList
								isActivedMenu={index =>isActivedMenu(index)}
								isSidebarShown={isSidebarShown}
								onMenuToggle={(index, state) => {
									dispatch(state ? toggleMenuUp(index) : toggleMenuDown(index))
								}
								}>
							</SidebarList>
						</div>

					</div>
				</div>
			</div>
		)
	}
}

export default Sidebar
