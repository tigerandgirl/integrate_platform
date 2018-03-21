import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Top from '@/components/home/Top.jsx'
import Sidebar from '@/components/home/Sidebar'
import '@/less/gentelella/animation.css'

class HomeContainer extends Component {
	render() {
		const that = this
		const { dispatch, isActivedMenu, isSidebarShown } = that.props
		return (
			<div className="container body" style={{"width":"100%","padding":"0"}}>
				<div className="main_container">
					<Sidebar dispatch={dispatch} isActivedMenu={isActivedMenu} isSidebarShown={isSidebarShown}></Sidebar>
					<Top dispatch={dispatch} isSidebarShown={isSidebarShown}></Top>
					<div className="right_col" role="main">
						<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
							<div key={this.props.location.pathname}>{that.props.children}</div>
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		// 判断如果未登陆则跳转
		if (!sessionStorage.getItem('username')) {
			Notify({
				title: '请先登录',
				type: 'error'
			})
			this.context.router.push('/login')
		}
		$('body').attr('class', 'nav-md')
		$('.right_col').css('min-height', $(window).height())
	}
}

HomeContainer.contextTypes = {
	router: React.PropTypes.object
}

function connectState(state) {
	return {
		isActivedMenu(index) {
			if (state.activeMenus.includes(index)) return true
			return false
		},
		isSidebarShown() {
			return state.isSidebarShown
		}
	}
}

// 使用connect，注入dispatch和userName
export default connect(connectState)(HomeContainer)
