// 创建服务器   服务器配置
const http = require('http')

const serverHandeler = require('../app')

const PORT = 3000

const server = http.createServer(serverHandeler)

server.listen(PORT, () => {
	console.log('server running at 3000...');
 })