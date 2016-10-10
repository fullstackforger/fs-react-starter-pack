import { connect } from 'react-redux'

import auth from '../components/auth-redux'

import PageSignup from './UserSignup'
import history from '../config/history'

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleSignup: loginData => auth
		.signup(loginData)
		.then(() => history.push('/'))
		.catch(err => console.error(err)),
	onSignInSuccess: () => history.push('/')
})

export default connect(false, mapDispatchToProps)(PageSignup)