import express from 'express';
import ArticleModel from '../models/article.js';//importar el modelo de articulo

const router = express.Router();//estamos instanciando un router de express
//router es un middleware de express que nos permite crear rutas
router.post('/articles', async (req, res) => {
    const article = new ArticleModel(req.body); //req de request
    try {
        await article.save(
            res.send(article)
        );
    } catch (error) {
        res.status(500).send(error);//res de respuesta, status de estado, 500 es un error interno del servidor
    };
});

router.get('/articles', async (req, res) => {//async es una funcion asincrona, que nos ayuda a trabajar con promesas
    try {
        const articles = await ArticleModel.find({});//await es una palabra clave que se puede usar para esperar a que se resuelva una promesa
        res.send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/articles/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await ArticleModel.findById(id)
        if (!article) {
            return res.status(404).send('Article not found')
        }
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/articles/:id', async (req, res) => {
    try {
        
        const articleId = req.params.id;
        if (!articleId) {
            return res.status(404).send('Article not found');
        }
        const updateArticle = await ArticleModel.findByIdAndUpdate(articleId, req.body, { new: true })
        res.json(updateArticle);
    } catch (error) {
        res.status(500).send(error);
    }
})
//edita todos los campos 
router.put('/articles/:id', async (req,res)=>{
    const article = new ArticleModel(req.body);
    const requiredFiels = ['title','description','content'];
    for (const field of requiredFiels){
        if(!req.body[field]){
            return res.status(400).json({message:`${field} is required`})
        }
    }
    try{
        await article.save();
        res.send(article);
    }catch(error){
        res.status(500).send(error);
    }
});

router.delete('/articles/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        if (!articleId) {
            return res.status(404).send('Article not found');
        }
        const deleteArticle = await ArticleModel.findByIdAndDelete(articleId);
        res.json(deleteArticle);
    } catch (error) {
        res.status(500).send(error);
    } 
});


export default router;


