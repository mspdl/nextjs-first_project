import { NextApiHandler } from "next";
import api from "../../../../libs/api";

const handlerGet: NextApiHandler = async (req, res) => {
  const { page } = req.query;

  try {
    const users = await api.getAllUsers(parseInt(page as string));
    res.status(200).json({ status: true, users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await api.addUser(name, email);
    res.status(201).json({ status: true, user: newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handlerGet(req, res);
      break;
    case "POST":
      handlerPost(req, res);
      break;
  }
};

export default handler;
