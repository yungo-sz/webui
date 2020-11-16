import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTime(oldTime){
  return oldTime.toLocaleDateString().replace(/\//g, "-") + " " + oldTime.toTimeString().substr(0, 8)
}

export function getExpiryTime(expiry){

  let genesis = new Date('2020-08-25 06:00:00')
  let Expiry = Date.parse(genesis)+expiry*30*1000
  var oldTime = new Date(Expiry)
  return getTime(oldTime)
}

export function getNowHeight(){

  let genesis = new Date('2020-08-25 06:00:00')
  let height = (Date.parse(new Date())-Date.parse(genesis))/30/1000
  return parseInt(height)-1
}