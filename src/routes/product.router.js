import { Router } from 'express'
import ProductManager from '../manager/producManager.js'

const router = Router()
const productManager = new ProductManager()


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
    const  id  = parseInt(req.params.id);
    const data = req.body
   
   try {
       const result = await productManager.update(id, data)    
       !result ? res.send(`${result}, <p>Producto Actualizado ✅!!!</p>`)  : res.status(404).json({error404: `Producto ${id} no encontrado`})
   } catch (error) {
    res.status(404).json({error404: `Error`})
   }
    
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