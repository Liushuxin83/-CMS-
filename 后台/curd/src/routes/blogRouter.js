// const jwt = require('jsonwebtoken')
// 检测token是否合法
// function checkToken(token) {
// 	return jwt.verify(token, "secret", function (err, decode) {
// 		if (err) {
// 			// 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
// 			// console.log(err)
// 			return false
// 			// fn(false);
// 		} else {
// 			// console.log(decode);
// 			return true
// 			// fn(true);
// 		} 
// 	})
// }
const { checkToken } = require('../utils/jwt')
const { SuccessModel, ErrorModel } = require('./model/responseModel')
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog, createNewUser, loginUser, sendCardSql, getPrescriptionform, addPrescription, deletePrescription, updatePrescription,getClinicList } = require('./controllers/blog')
// 处理博客相关路由
const handelBlogRoute = (req, res) => {
	// 定义处理路由的逻辑
	const method = req.method;
	const url = req.url;
	const path = url.split('?')[0]
	// 获取请求头中的token
	let sliceToken = null
	if (req.headers.authorization) {
		const token = req.headers.authorization
		sliceToken = token.slice(7)
	}
	// const token = req.headers.authorization
	// console.log(token.slice(7));
	// 有token的情况下  注册没有token
	// console.log(sliceToken);
	const isTrueToken = checkToken(sliceToken)
	// 请求登录注册以外的其他接口需要携带token
	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		// /api/blog/list?author=zhangsan&keyword=123
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// console.log(author,keyword);
		const listData = getList(author, keyword);
		console.log(isTrueToken);
		if (isTrueToken) {
			// token正确
			// .then之后可以获取数据库中的数据 然后把得到的数据放到数据模型中
			return listData.then(blogdata => {
				console.log(blogdata); //返回数据库列表数据  是个数
				return new SuccessModel(blogdata)
			})
		} else {
			return new Promise((resolve) => {
				resolve(new ErrorModel('用户未授权！，无法访问'))
			})
		}
		// return new SuccessModel(listData)
		// return {
		// 	message: '获取博客列表的数据'
		// }
	}
	// 获取博客详情
	if (method === "GET" && path === "/api/blog/detail") {
		const id = req.query.id
		const detailData = getDetail(id)
		return detailData.then(detailData => {
			return new SuccessModel(detailData)
		})
	}
	// 新建博客
	if (method === 'POST' && path === '/api/blog/new') {
		const newBlogPostData = req.body
		const newBlog = createNewBlog(newBlogPostData)
		return newBlog.then((newBlogData) => {
			return new SuccessModel(newBlogData)
		})
		// return {
		// 	message: '新建博客的接口'
		// }
	}
	// 更新博客
	if (method === 'POST' && path === '/api/blog/update') {
		const updateBlogPostData = req.body
		const updateBlogData = updateBlog(req.query.id, updateBlogPostData)
		return updateBlogData.then((updateBlogDataResult) => {
			if (updateBlogDataResult) {
				return new SuccessModel('更新博客成功')
			} else {
				return new ErrorModel('更新博客失败')
			}
		})
		// return {
		// 	message: '更新博客的接口'
		// }
	}
	// 删除博客
	if (method === 'POST' && path === '/api/blog/delete') {
		const deleteBlogData = deleteBlog(req.query.id)
		return deleteBlogData.then(deleteBlogDataResult => {
			if (deleteBlogDataResult) {
				return new SuccessModel('删除博客成功')
			} else {
				return new ErrorModel('删除博客失败')
			}
		})
		// return {
		// 	message: '删除博客的接口'
		// }
	}

	// 注册接口
	if (method === 'POST' && path === '/api/register') {
		const newUserData = req.body
		const newUser = createNewUser(newUserData)
		return newUser.then((newUser) => {
			return new SuccessModel(newUser)
		})
	}
	// 登录接口
	if (method === 'POST' && path === '/api/login') {
		console.log(req.body);
		const loginUserData = req.body
		// console.log(loginUserData);
		const loginUsers = loginUser(loginUserData)
		return loginUsers.then((searchUser) => {
			if (searchUser.isHave) {
				return new SuccessModel(searchUser)
			} else {
				return new ErrorModel(searchUser)
			}
		})
	}
	// 发放就诊卡 
	if (method === 'POST' && path === '/api/sendcard') {
		const sendCardReqBody = req.body
		const sendCard = sendCardSql(sendCardReqBody)
		return sendCard.then(sendCardRes => {
			// console.log(sendCardRes);
			if (sendCardRes.isSuccess === 1) {
				return new SuccessModel(sendCardRes)
			} else {
				return new ErrorModel(sendCardRes)
			}
		})
	}
	// 获取处方数据
	if (method === 'POST' && path === '/api/prescriptionform') {
		const pageQuery = req.body
		const prescriptionform = getPrescriptionform(pageQuery)
		return prescriptionform.then(queryRes => {
			// console.log(queryRes);
			if (queryRes.isSuccess === 0) {
				return new ErrorModel(queryRes)
			} else {
				return new SuccessModel(queryRes)
			}
		})
	}
	// 添加处方
	if (method === 'POST' && path === '/api/addprescription') {
		const prescriptionBody = req.body
		const prescription = addPrescription(prescriptionBody)
		return prescription.then(addRes => {
			if (addRes.isSuccess === 0) {
				return new ErrorModel(addRes)
			} else {
				return new SuccessModel(addRes)
			}
		})
	}
	// 删除处方
	if (method === 'POST' && path === '/api/deleteprescription') {
		const deletePrescriptionBody = req.body
		const prescription = deletePrescription(deletePrescriptionBody)
		return prescription.then(deleteRes => {
			if (deleteRes.isSuccess === 0) {
				return new ErrorModel(deleteRes)
			} else {
				return new SuccessModel(deleteRes)
			}
		})
	}
	// 更新处方
	if (method === 'POST' && path === '/api/updateprescription') {
		const updatePrescriptionBody = req.body
		const prescription = updatePrescription(updatePrescriptionBody)
		return prescription.then(updateRes => {
			if (updateRes.isSuccess === 0) {
				return new ErrorModel(updateRes)
			} else {
				return new SuccessModel(updateRes)
			}
		})
	}
	// 获取就诊列表
	if (method === 'GET' && path === '/api/cliniclist') {
		const cliniclist = getClinicList()
		return cliniclist.then(getRes => {
			if (getRes.isSuccess === 0) {
				return new ErrorModel(getRes)
			} else {
				return new SuccessModel(getRes)
			}
		})
	}
	return null
}
module.exports = handelBlogRoute