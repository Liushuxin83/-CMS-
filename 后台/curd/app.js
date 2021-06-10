const querystring = require('querystring')
const handelBlogRoute = require('./src/routes/blogRouter')

// 处理post数据  异步过程
const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		if (req.method !== "POST") {
			resolve({})
			return
		}
		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}
		let postData = '';
		req.on('data', (chunk) => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if (!postData) {
				resolve({})
				return
			}
			resolve(JSON.parse(postData))
		})
	})
}
const serverHandeler = (req, res) => {
	// 解决中文乱码
	// res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
	// 解析query
	req.query = querystring.parse(req.url.split('?')[1])
	getPostData(req).then((postData) => {
		req.body = postData

	// 初始化路由
	const blogData = handelBlogRoute(req, res)
	// console.log(blogData);
		if (blogData) {
			blogData.then(blogdata => {
				if (Object.keys(blogdata).length <= 1) {
					res.writeHead(404, { 'Content-Type': 'text/plain'})
					res.end('404 Not found')
				} else {
					res.end(JSON.stringify(blogdata))
				}
			})
			return
		// res.end(JSON.stringify(blogData))
		// return
	   }
	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.end('404 Not found')
	})
}
module.exports = serverHandeler