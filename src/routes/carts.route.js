import {Router} from 'express';
import {ProductManager, CartManager} from '../dao/index.js';
import {addProductToCard, removeProductFromCard} from '../controllers/cart.controller.js'
// import cartModel from '../dao/models/cart.model.js';
// import CartManager from '../dao/file-managers/cart.manager.js';

const cartsRouter = Router();

// let filePathCart = './src/dao/file-managers/files/carts.json'
let cart = new CartManager()
let product = new ProductManager();

cartsRouter.post('/', async(req,res) =>{
    try {
        const newCart = await cart.createNewCart();
        res.status(201).send({status: 'ok',payload: newCart})
        
    } catch (error) {
        res.status(404).send({status: 'error', payload: error})
    }
});

cartsRouter.get('/', async(req,res) =>{
    try {
        const newCart = await cart.getAllCarts();
        res.send(newCart)
    } catch (error) {
        res.status(404).send(`${error}`)
    }
});

cartsRouter.get('/:cid', async(req,res) =>{
    try {
        const getCart = await cart.getCartId(req.params.cid);
        
        res.status(201).send({status: 'ok', payload: getCart})
        
    } catch (error) {
        res.status(404).send(`${error}`)
    }
})



cartsRouter.post("/:cid/product/:pid", addProductToCard);

cartsRouter.delete("/:cid/product/:pid", removeProductFromCard);

export default cartsRouter;