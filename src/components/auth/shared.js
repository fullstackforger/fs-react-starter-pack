import storage from './internals/storage'
import config from './internals/config'

export const setToken = (token) => {
    return storage.set(config.tokenName, token)
}

export const getToken = () => {
    return storage.get(config.tokenName)
}

export const removeToken = () => {
    storage.remove(config.tokenName)
}

export const getAuthHeader = () => {
    let token;
    if (isAuthenticated() && config.authHeader && config.authToken) {
        let token = config.authToken + ' ' + getToken()
        return {[config.authHeader]: token }
    }
    return {}    
}

export const isAuthenticated = () => {
    const token = getToken()

    if (!token) {
        return false
    }
    let claims = token.split('.')
    if (claims.length != 3) {
        return false
    }

    try {        
        let public64 = claims[1]
        let publicClaims = JSON.parse(atob(claims[1]))
        
        if (!publicClaims.exp) {
            return true
        }

        let isExpTimestamp = typeof publicClaims.exp === 'number'
        if (!isExpTimestamp) {
            return false
        }
        
        return Math.round(new Date().getTime() / 1000) < exp
        
    } catch (e) {
        return false
    }
}