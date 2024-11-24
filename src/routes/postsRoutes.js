import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions ={
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    file: function(req, file, cb){
        cb(null.originalname);
    }
})

const upload = multer({dest:"./uploads", storage});

const routes = (app) => {
    app.use(express.json()); // Habilita o middleware para analisar o corpo das requisições JSON
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts); // Rota para buscar todos os posts
    app.post("/posts", postarNovoPost); // Rota para criar um post
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;