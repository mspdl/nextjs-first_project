import { Users } from "@/utils/users";
import { NextApiHandler } from "next";

const handlerGet: NextApiHandler = async (req, res) => {
  res.status(200).json(Users);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { name, age } = req.body;
  res.status(201).json({ status: true, user: { name, age } });
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
