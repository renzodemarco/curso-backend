import * as productServices from '../services/product.services.js'

export const GETProducts = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, query = [], all } = req.query;
        const options = {
            limit: all ? 100 : Number(limit), 
            page: Number(page), 
            sort, 
            query
        }
        const products = await productServices.getProducts(options)
        const { docs, ...data} = products

        if (!req.user) return res.render('products', { products: docs })

        const {first_name, last_name, role, cart, _id} = req.user 

        const showAll = !all

        if (role === 'admin') {
            return res.render('products-admin', { admin: true, products: docs, first_name, last_name, showAll })
        }

        if (role === 'premium') {
            const ownProducts = docs.filter(prod => prod.owner === _id.toString())
            const otherProducts = docs.filter(prod => prod.owner !== _id.toString())
            return res.render('products-premium', { products: otherProducts, ownProducts, first_name, last_name, premium: true, cart: cart?._id, user: _id, showAll })
        }

        return res.render('products-user', { products: docs, first_name, last_name, cart: cart?._id, user: _id, showAll })
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const GETCreateProduct = (req, res) => {
    return res.render('create-product')
}

export const GETEditProduct = async (req, res, next) => {
    try {
        const product = await productServices.getProductById(req.params.pid)
        return res.render('edit-product', {product})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}