import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";
import fs from 'fs';

export async function listarPosts(req, res) { // Define uma rota GET para a URL "/posts"
        const posts = await getTodosPosts(); // Chama a função getTodosPosts para obter todos os posts
        res.status(200).json(posts); // Envia os posts como resposta em formato JSON com o status 200 (sucesso)
}

export async function postarNovoPost(req, res) {
        const novoPost = req.body;
        try {
                const postCriado = await criarPost(novoPost);
                res.status(200).json(postCriado);
        } catch(erro) {
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição."});
        }
}

export async function uploadImagem(req, res) {
        const novoPost = {
                descricao: "",
                imgUrl: req.file.originalname,
                alt: ""
        };
        try{
                const postCriado = await criarPost(novoPost);
                const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
                fs.renameSync(req.file.path, imagemAtualizada);
                res.status(200).json(postCriado);
        }catch(erro){
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição"});
        }
        
};

export async function atualizarNovoPost(req, res) {
        const id = req.params.id;
        const urlImage = `http://localhost:3000/${id}.png`;

        try {
                const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
                const descricao = await gerarDescricaoComGemini(imgBuffer);
                
                const post = {
                        imgUrl: urlImage,
                        descricao: descricao,
                        alt: req.body.alt
                };
                
                const postCriado = await atualizarPost(id, post);

                res.status(200).json(postCriado);
        } catch(erro) {
                console.error(erro.message);
                res.status(500).json({"Erro":"Falha na requisição."});
        }
}