import express from 'express';

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"

    },
    {
        id: 2,
        descricao: "Outro post interessante",
        imagem: "https://placecats.com/felix/300/200"
    },
    {
        id: 3,
        descricao: "Mais um post sobre gatos",
        imagem: "https://placecats.com/garfield/300/150"
    },
    {
        id: 4,
        descricao: "Um post sobre paisagens",
        imagem: "https://picsum.photos/300/200"
    },
    {
        id: 5,
        descricao: "Um post sobre comida",
        imagem: "https://picsum.photos/300/200?random=2"
    },
    {
        id: 6,
        descricao: "Um post sobre tecnologia",
        imagem: "https://source.unsplash.com/random/300x200/?tech"
    }
];

const app = express();

app.use(express.json());
app.listen(3000, () => {
    console.log("Servidor escutando..."); 
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
};

app.get("/posts/:id", (req, res) => {
    const index = buscarPostID(req.params.id);
    res.status(200).json(posts[index]);

});