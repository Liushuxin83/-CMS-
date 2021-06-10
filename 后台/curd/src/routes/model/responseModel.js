// 定义数据模型
class baseModel {
	constructor(data, message) {
		if (typeof data === 'string') {
			this.message = data
			data = null
			message = null
		}
		if (data) {
			this.data = data
		}
		if (message) {
			this.message = message
		}
	}
}

// 成功的模型
class SuccessModel extends baseModel {
	constructor(data, message) {
		super(data, message)
		this.successNum = 0
		this.msg = '操作成功'
	}
}
//  失败的模型
class ErrorModel extends baseModel {
	constructor(data, message) {
		super(data, message)
		this.errorNum = -1
		this.msg = '操作失败'
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}