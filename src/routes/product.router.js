import { Router } from 'express'
import ProductManager from '../manager/producManager.js'
import multer from 'multer'

const router = Router()
const productManager = new ProductManager()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/thumbnail')
    }, filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
}) 
const loader = multer({storage})

router.post('/uploader', loader.single('file'), (req, res) => {
    if(!req.file) return res.send({message: 'error'})
    res.send({status: 'File uploaded'})
})

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const result = await productManager.list()
    
    if(limit) {
        const productLimit = result.slice(0, limit);
        res.send(productLimit)
    }else{
        res.send(result)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await productManager.getById(id)
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const result = await productManager.getById(id)
    res.send(result)
})

router.post('/', async (req, res) => {
    const data = req.body
    const result = await productManager.create(data)
    res.send(result)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await productManager.delete(id)
    res.send(result)
})



export default router