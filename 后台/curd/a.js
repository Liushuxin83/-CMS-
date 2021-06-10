const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
function p(qq) {
	return new Promise((resolve, rejct) => {
		if (qq === 'err') {
			rejct('出错')
			return
		}
		resolve(qq)
	 })
}
function b() {
	return p('success').then(res => {
	return res
})
}
b().then(res => {
	// console.log(res);
})

let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync('123456', salt);
console.log(hash);
const password = '123456'
console.log(bcrypt.compareSync('123456', '$2a$10$g83HLNb8fCXveKa9kEbXbu9pl2TSvWkSEmZ4BZ'));
	


function checkToken(token,fn){
jwt.verify(token, "secret", function (err, decode) {
if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
console.log(err)
console.log(fn(false));;
} else {
console.log(decode);
console.log(fn(true));;
}
})
}
function fn(a){
	if (a === true) {
		return true
	} else {
		return false
	}
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YiY6IiS5pawIiwicGFzc3dvcmQiOiIkMmEkMTAkL0pYdGtkSFM3eVRQNVNMQkJTTjVzLmw1VGVPQzFuTW5PQ1g4ZTZVT1RDb0Fyc2dLTmZWZHUiLCJpYXQiOjE2MjI1OTU5ODAsImV4cCI6MTAwMTYyMjU5NTk4MH0.a8dZwyc8sQiHXWCnE3Y7-DRbFllX8O2VI9WLgcDT7U0"
checkToken(token, fn)
const str = 'abc'
console.log(str.slice(1));