import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { userLogin2, userLogout } from '@/store/login/action';

class Login extends Component {
	static propTypes = {
    userState: PropTypes.object.isRequired,
    userLogin2: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  }
	render() {
		return (
			<div>
				<a className="hiddenanchor" id="signup"></a>
				<a className="hiddenanchor" id="signin"></a>

				<div className="login_wrapper">
					<div className="animate form login_form">
						<section className="login_content">
							<form onKeyPress={(e) => { if (e.key === 'Enter') { this.loginSubmit(e) } } }>
								<h1>集成平台管理系统</h1>
								<div>
									<input type="text" className="form-control" placeholder="用户名" ref="username" required />
								</div>
								<div>
									<input type="password" className="form-control" placeholder="密码" ref="password" required />
								</div>
								<div>
									<a className="btn btn-default submit" onClick={(e) => { this.loginSubmit(e) } }>登录</a>
								</div>

								<div className="clearfix"></div>

							</form>
						</section>
					</div>

				</div>
			</div>
		)
	}

	loginSubmit() {
		let that = this;
		const username = this.refs.username.value.trim()
		const password = this.refs.password.value.trim()
		console.log(JSON.stringify({username,password}).toString());
		if (username === undefined || password === undefined || username === '' || password === '') {
			Notify({
				title: '账户或密码不能为空',
				type: 'error'
			})
		} else {
			this.props.userLogin2({'username':username, 'password':password})
			sessionStorage.setItem('username', username)
		}

	}

	componentDidMount() {
		$('body').attr('class', 'login')
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.userState.loginState !== this.props.userState.loginState){
      const { userState } = nextProps
			console.log('login success to home')
			if(userState.loginState) {
				this.context.router.push('/home')
			} else{
				Notify({
					title: '账户或密码错误',
					type: 'error'
				})
				return
			}
		}

	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}

export default connect(state => ({
  userState: state.userState,
}), {
  userLogin2,
  userLogout
})(Login);
