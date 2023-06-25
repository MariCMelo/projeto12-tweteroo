import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = []

const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios!" });
    }

    const newUser = { username, avatar };
    users.push(newUser);
    res.sendStatus(201);
});

app.post("/tweets", (req, res) => {
    const { username, tweet} = req.body
  
    const user = users.find(user => user.username === username)
    if (!user) {
        return res.status(401).send({ message: "UNAUTHORIZED" });
    }
    if (!tweet) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios!" });
    }
    const newTweet = { username, tweet};
    tweets.push(newTweet)
    res.sendStatus(201)
})

app.get("/tweets", (req, res) => {
    const recentTweets = tweets.slice(-10).map(tweet => {
        const user = users.find(user => user.username === tweet.username);
        return {
            ...tweet,
            avatar: user ? user.avatar : null
        };
    });

    res.send(recentTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));