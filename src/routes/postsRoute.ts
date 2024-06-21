import express from 'express'
import { PostService } from '../service/postService.js';
import { PostRepository } from '../repository/postRepository.js';

const route = express.Router();

//INJETANDO O SERVICE
const postRepository = new PostRepository(); 
const postService = new PostService(postRepository); 


route.get('/posts', async (req, res) => {

    try {
        const posts = await postService.listaDePost();

        if (posts.length === 0) {
            return res.status(204).send(); // Retorna status 204 se não houver posts
        }

        res.json(posts); // Retorna os posts como JSON se houver dados
    } catch (error) {
        console.error('Erro ao obter posts:', error);
        res.status(500).json({ error: 'Erro ao buscar posts' }); // Retorna um erro HTTP 500 com detalhes em JSON
    }
});


route.post('/posts', (req, res) => {
    res.send("teste 2");
});

export default route;