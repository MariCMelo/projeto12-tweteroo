import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const user = [
    {
        username: "Gato",
        avatar: "https://www.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-260nw-1701332881.jpg"
    }
]

const tweet = [
    {
        username: "Gato",
        tweet: "Miau",
        avatar: "https://www.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-260nw-1701332881.jpg"
    }
]

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    const userTweets = tweet.filter((t) => t.username === username);
    res.send(userTweets);
});


app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios!!!" });
    }

    const newUser = { username, avatar };
    user.push(newUser);
    res.sendStatus(201);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));