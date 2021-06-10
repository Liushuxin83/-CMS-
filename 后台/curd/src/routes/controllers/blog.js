const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { execSQL } = require('../../../db/db')

// 检测token是否合法
// function checkToken(token, fn) {
// 	jwt.verify(token, "secret", function (err, decode) {
// 		if (err) {
// 			// 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
// 			console.log(err)
// 			fn(false);
// 		} else {
// 			console.log(decode);
// 			fn(true);
// 		}
// 	})
// }

const getList = (author, keyword) => {
	// 从数据库拿数据
	let sql = `select * from blogs where 1=1 `;
	if (author) {
		sql += `and author='${author}' `;
	}
	if (keyword) {
		sql += `and title like '%${keyword}%'`;
	}
	// execSQL(sql, (err, res) => {
	// 	if (err) {
	// 		console.log('出错啦');
	// 		console.log(err);
	// 		return
	// 	}
	// 	console.log(res);
	// })
	return execSQL(sql)

	// return {
	// 	id: 1,
	// 	title: '标题1',
	// 	content: '标题1的内容',
	// 	author: 'zhangsan',
	// 	createTime: Date.now()
	// }
}

const getDetail = (id) => {
	let sql = `select * from blogs where id='${id}' `;
	return execSQL(sql).then((rows) => {
		console.log(rows);// 如果数据库中不存在 此id row[0]是undefined
		return rows[0]
	})
	// return {
	// 	id: 2,
	// 	title: '标题2',
	// 	content: '标题2的内容',
	// 	author: 'zhangsan',
	// 	createTime: Date.now()
	// }
}

// 创建新博客  返回新建博客的id
const createNewBlog = (newBlogPostData) => {
	const title = newBlogPostData.title
	const content = newBlogPostData.content
	const author = newBlogPostData.author
	const createtime = Date.now()
	let sql = `insert into blogs (title,author,content,createtime) values ('${title}','${author}','${content}',${createtime})`;
	return execSQL(sql).then((insertResult) => {
		if (insertResult.affectedRows == 1) {
			console.log(insertResult);
			return {
				id: insertResult.insertId
			}
		}
	})
	// return {
	// 	id:100
	// }
}

// 更新博客   更新成功返回true
const updateBlog = (id, updateBlogPostData = {}) => {
	console.log(id, updateBlogPostData);
	const title = updateBlogPostData.title;
	const content = updateBlogPostData.content;
	let sql = `update blogs set title='${title}',content='${content}' where id=${id}`
	return execSQL(sql).then(updateResult => {
		console.log(updateResult);
		if (updateResult.affectedRows > 0) {
			return true
		} else {
			return false
		}
	})
	// return true
}

// 删除博客   删除成功返回true
const deleteBlog = (id) => {
	// console.log(id);
	let sql = `delete from blogs where id=${id}`
	return execSQL(sql).then(deleteResult => {
		if (deleteResult.affectedRows > 0) {
			return true
		} else {
			return false
		}
	})
}
// 注册用户
const createNewUser = async (newUserData) => {
	const username = newUserData.username
	let password = newUserData.password
	const createtime = Date.now()
	// 加密密码 
	const bcryptPwd = await new Promise((resolve) => {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(password, salt);
		resolve(hash)
		// bcrypt.hash(password, 10, (err, hash) => {
		// 	// 在这个回调函数中执行sql语句  先加密
		// 	password = hash
		// 	resolve(password)
		// 	// 存数据之前先查找 看有没有相同的 
		// 	// let sql = `select * from users where username=${username} `;
		// })
	})
	console.log(bcryptPwd);
	let sql = `insert into users (username,password,createtime) values ('${username}','${bcryptPwd}','${createtime}')`
	return execSQL(sql).then((insertNewUserResult) => {
		if (insertNewUserResult.affectedRows == 1) {
			console.log(insertNewUserResult);
			return {
				id: insertNewUserResult.insertId
			}
		}
	})
}
// 登录功能
const loginUser = (loginUserData) => {
	const username = loginUserData.username
	// console.log(loginUserData);
	const password = loginUserData.password
	let sql = `select * from users where username='${username}'`
	return execSQL(sql).then((searchUser) => {
		// console.log(searchUser);
		if (searchUser.length > 0) {
			// 查到用户 之后匹配密码
			// 如匹配成功 就是true
			if (bcrypt.compareSync(password, searchUser[0].password)) {
				// 登录成功 生成token
				// console.log(searchUser[0].id);
				let content = {
					id: searchUser[0].id,
					username: searchUser[0].username,
					password: searchUser[0].password,
				}
				let token = jwt.sign(content, "secret", { expiresIn: 1000000000000 })
				return {
					isHave: true,
					username: searchUser[0].username,
					message: '该用户存在！且密码正确，返回token',
					token
				}
			} else return {
				isHave: false,
				message: '该用户存在！但是密码不正确！'
			}
		} else {
			return {
				isHave: false,
				message: '该用户不存在！'
			}
		}
	})
}
// 发放就诊卡sql
const sendCardSql = (sendCardReqBody) => {
	const cardid = sendCardReqBody.cardid
	const name = sendCardReqBody.name
	const sex = sendCardReqBody.sex
	const mobile = sendCardReqBody.mobile
	const idcard = sendCardReqBody.idcard
	let sql = `insert into clinic_card (cardid,name,sex,mobile,idcard) values (${cardid},'${name}','${sex}','${mobile}','${idcard}');`
	return execSQL(sql).then(insertResult => {
		// console.log(111);
		// console.log(insertResult);
		if (insertResult.affectedRows == 1) {
			console.log(insertResult);
			return {
				isSuccess: 1,
				id: parseInt(cardid)
			}
		} else {
			return {
				isSuccess: 0,
				message: '增加就诊卡失败!'
			}
		}
	}, err => {
		if (err) {
			return {
				message: '就诊卡卡号已存在，不能重复！'
			}
		}
	})
}

// 获取处方表
const getPrescriptionform = (pageQuery) => {
	// 前端传递给后端的参数可以是page_num(第几页)，page_size（每一页显示多少条数据），后端接收到page_num和page_size之后可以通过(page_num - 1) * page_size 表达式换算offset，查询条数(rows)就是page_size.
	const queryParams = pageQuery.query
	const pageNum = pageQuery.pageNum
	const pageSize = pageQuery.pageSize
	console.log(pageNum, pageSize);
	let offset = (pageNum - 1) * pageSize
	console.log(queryParams);
	if (queryParams === undefined) {
		let sql = `select * from prescription_form limit ${offset},${pageSize}`;
		let totalSql = `select * from prescription_form`;
		return execSQL(totalSql).then(totalRes => {
			// totalRes.length
			return execSQL(sql).then(queryRes => {
				// console.log(queryRes);
				if (queryRes.length >= 1) {
					return { queryRes, total: totalRes.length }
				} else {
					return {
						isSuccess: 0,
						msg: '查询失败！'
					}
				}
			})
		})
	} else {
		let sql = `select * from prescription_form where doctor like '%${queryParams}%' or clinic_card_number like '%${queryParams}%' or treatmentdepartment like '%${queryParams}%' or clinical_diagnosis like '%${queryParams}%' limit ${offset},${pageSize}`
		let totalsql = `select * from prescription_form where doctor like '%${queryParams}%' or clinic_card_number like '%${queryParams}%' or treatmentdepartment like '%${queryParams}%' or clinical_diagnosis like '%${queryParams}%'`
		return execSQL(totalsql).then(totalRes => {
			// console.log(totalRes);
			return execSQL(sql).then(queryRes => {
				console.log(queryRes);
				if (queryRes.length > 0) {
					return {
						data: queryRes,
						total: totalRes.length
					}
				} else {
					return {
						isSuccess: 0,
						msg: '查询不到数据！'
					}
				}
			})
		}, err => {
			return {
				isSuccess: 0,
				msg: '查询失败！'
			}
		})

		// execSQL(sql).then(queryRes => {
		// 	console.log(queryRes);
		// })
	}
}
// 增加处方
const addPrescription = (prescriptionBody) => {
	const prescription_number = prescriptionBody.prescription_number
	const clinic_card_number = prescriptionBody.clinic_card_number
	const treatmentdepartment = prescriptionBody.treatmentdepartment
	const prescription_time = Date.now()
	const clinical_diagnosis = prescriptionBody.clinical_diagnosis.join(',')
	const doctor = prescriptionBody.doctor
	const drug_amount = prescriptionBody.drug_amount
	let sql = `insert into prescription_form (prescription_number,clinic_card_number,treatmentdepartment,prescription_time,clinical_diagnosis,doctor,drug_amount) values (${prescription_number},${clinic_card_number},${treatmentdepartment},${prescription_time},'${clinical_diagnosis}','${doctor}',${drug_amount});`
	return execSQL(sql).then(addRes => {
		console.log(addRes);
		if (addRes.affectedRows > 0) {
			return {
				addPrescriptionId: addRes.insertId
			}
		} else {
			return {
				isSuccess: 0,
				msg: "增加处方失败！"
			}
		}
	}, err => {
		return {
			isSuccess: 0,
			msg: '处方编号不能相同！'
		}
	})
}
// 删除处方
const deletePrescription = (deletePrescriptionBody) => {
	const id = deletePrescriptionBody.prescription_number
	let sql = `delete from prescription_form where prescription_number=${id}`
	return execSQL(sql).then(deleteRes => {
		// console.log(deleteRes);
		if (deleteRes.affectedRows > 0) {
			return {
				msg: '删除数据成功!'
			}
		} else {
			return {
				isSuccess: 0,
				msg: '删除数据失败!'
			}
		}
	}, err => {
		return {
			isSuccess: 0,
			msg: '删除数据失败!'
		}
	})
}
// 更新处方数据
const updatePrescription = (updatePrescriptionBody) => {
	const id = updatePrescriptionBody.prescription_number
	const treatmentdepartment = updatePrescriptionBody.treatmentdepartment
	const clinical_diagnosis = updatePrescriptionBody.clinical_diagnosis.join(',')
	const doctor = updatePrescriptionBody.doctor
	const drug_amount = updatePrescriptionBody.drug_amount
	const prescription_time = Date.now()
	let sql = `update prescription_form set treatmentdepartment=${treatmentdepartment},clinical_diagnosis='${clinical_diagnosis}',doctor='${doctor}',drug_amount=${drug_amount},prescription_time=${prescription_time} where prescription_number=${id}`
	return execSQL(sql).then(updateRes => {
		console.log(updateRes);
		if (updateRes.affectedRows > 0) {
			return {
				msg: "更新处方数据成功!"
			}
		} else {
			return {
				isSuccess: 0,
				msg: '更新处方数据失败!'
			}
		}
	}, err => {
		console.log(err);
		return {
			isSuccess: 0,
			msg: '更新处方数据失败!'
		}
	})
}
const getClinicList = () => {
	let sql = `select * from clinic_card;`
	return execSQL(sql).then(getRes => {
		// console.log(getRes);
		if (getRes.length > 0) {
			return {
				data: getRes
			}
		} else {
			return {
				isSuccess: 0,
				data: [],
				msg: '数据库暂无数据'
			}
		}
	}, err => {
		return {
			isSuccess: 0,
			msg: '获取就诊卡列表数据失败！'
		}
	})
}
module.exports = {
	getList,
	getDetail,
	createNewBlog,
	updateBlog,
	deleteBlog,
	createNewUser,
	loginUser,
	sendCardSql,
	getPrescriptionform,
	addPrescription,
	deletePrescription,
	updatePrescription,
	getClinicList
}