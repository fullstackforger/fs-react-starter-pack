import config from './internals/config'
import { fetchOpts } from './internals/defaults'
import { parseResponseToJSON, checkResponseStatus } from './internals/utils'
import { setToken, getToken, removeToken } from './shared'

export const signup = (userData, options) => {
	let {baseUrl, signupUrl} = config
	let url = baseUrl + signupUrl
	let opts = Object.assign(fetchOpts, {
		body: JSON.stringify(userData)
	})

	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))		
}

export const login = (userData, options) => {
	let {baseUrl, loginUrl} = config
	let url = baseUrl + loginUrl
	let opts = Object.assign(fetchOpts, {
		body: JSON.stringify(userData)
	})
	
	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))
}

export const logout = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!!getToken()) {
				removeToken()
				resolve({success: true})
			} else {
				reject(new Error('You are trying to log out unauthenticated user.'))
			}
		})
	})
}