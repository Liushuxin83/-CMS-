const jwt = require('jsonwebtoken')
// 检测token是否合法
function checkToken(token) {
	return jwt.verify(token, "secret", function (err, decode) {
		if (err) {
			// 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
			// console.log(err)
			return false
			// fn(false);
		} else {
			// console.log(decode);
			return true
			// fn(true);
		}
	})
}
exports.checkToken = checkToken