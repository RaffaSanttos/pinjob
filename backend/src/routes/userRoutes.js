import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("rota users funcionando");
});

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const user = await User.create({ nome, email, senha });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default router;
