import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    {
        username: "Gato",
        avatar: "https://www.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-260nw-1701332881.jpg"
    }
]

const tweets = [
    {
        username: "Gato",
        tweet: "Miau",
        avatar: "https://www.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-260nw-1701332881.jpg"
    }
]

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios!" });
    }

    const newUser = { username, avatar };
    users.push(newUser);
    console.log("testedddd")
    res.sendStatus(201);
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body

    const user = users.find(user => user.username === username)
    if (!user) {
        return res.status(401).send({ message: "UNAUTHORIZED" });
    }
    if (!tweet) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios!" });
    }
    const newTweet = { username, tweet };
  tweets.push(newTweet)
  res.sendStatus(201)
})

app.get("/tweets", (req, res) => {
    const recentTweets = tweets.slice(-10); // Retorna os 10 últimos tweets publicados

    if (recentTweets.length === 0) {
        return res.send([]);
    }

    res.send(recentTweets);
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));