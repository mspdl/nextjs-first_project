import { Users } from "@/utils/users";
import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  res.status(200).json(Users);
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  const newUser = await prisma.user.create({ data: { name, email } });

  res.status(201).json({ status: true, user: newUser });
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
