import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { db } from './db.js'
import bookkeeping from './mongodb_models/bookkeeping.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logsDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

db().then(async () => {
    console.log('可以开始操作数据库了')
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
    console.log(`服务已经启动，地址为 http://192.168.1.2:${PORT}`)
  })
}).catch(async (error) => {
  console.error('数据库连接失败:', error);
  process.exit(1); // 退出进程
})

app.get('/api/documents', async (req, res) => {
  try{
    const documents = await bookkeeping.find().sort({date:-1})
    res.json(documents)
    console.log(documents)
  }catch(error){
    res.status(500).json({error: error})
  }
})

app.post('/add', async (req, res) => {
  try{
    await bookkeeping.create(req.body)
    res.end()
    console.log('添加成功')
  }catch(error){
    console.error(error)
    res.status(500).end()
  }
})

app.post('/del', async (req, res) => {
  try{
    await bookkeeping.deleteOne({
      _id:req.body.id
    })
    console.log(req.body)
    res.end()
    console.log('删除成功')
  }catch(error){
    console.error(error)
    res.status(500).end()
  }
})

app.get(/^(?!\/api).*/, (req, res) => {
  const validRoutes = ['/', '/edit']
  if (!validRoutes.includes(req.path)){
    res.status(404)
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//   console.log(`服务已经启动，地址为 http://192.168.1.2:${PORT}`)
// })
