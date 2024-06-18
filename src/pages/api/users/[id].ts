import { NextApiHandler } from "next";
import api from "../../../../libs/api";

const handlerGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const foundUser = await api.getUserById(parseInt(id as string));
    res.json({ status: true, user: foundUser });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

const handlerPut: NextApiHandler = async (req, res) => {
  const { name, active } = req.body;
  const { id } = req.query;

  try {
    const user = api.updateUser(parseInt(id as string), name, active);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const handlerDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    await api.deleteUser(parseInt(id as string));
    res.json("User with id " + id + " deleted successfully");
  } catch (error) {
    res.status(404).json({ error });
  }
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handlerGet(req, res);
      break;
    case "PUT":
      handlerPut(req, res);
      break;
    case "DELETE":
      handlerDelete(req, res);
      break;
  }
};

export default handler;
