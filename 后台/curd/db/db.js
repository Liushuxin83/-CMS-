const mysql = require('mysql')
// 创建连接对象
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	port: 3306,
	database: "blogdata"
})
// 开始连接
connection.connect();
// 执行sql语句
// const sql = `select * from blogs`
// connection.query(sql, (err, res) => {
// 	if (err) {
// 		console.log(111);
// 		console.log(err);
// 		return
// 	}
// 	console.log(res);
// })

// 封装mysql
function execSQL(sql) {
	const promise = new Promise((resolve, reject) => {
		connection.query(sql, (err, res) => {
			if (err) {
				reject(err)
				return
			}
			resolve(res)
		})
	})
	return promise
}
module.exports = {
	execSQL
}
 // 关闭连接
// connection.end()