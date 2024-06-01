import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const urlUserId = req.query.id;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(urlUserId as string), active: true },
    select: { id: true, name: true, email: true },
  });

  user
    ? res.json({ status: true, user })
    : res.status(404).json({ error: "User not found" });
};

const handlerPut: NextApiHandler = async (req, res) => {
  const { name, active } = req.body;
  const { id } = req.query;

  let data: { name?: string; active?: boolean } = {};
  if (name) data.name = name;
  if (active) {
    switch (active) {
      case "true":
        data.active = true;
        break;
      case "false":
        data.active = false;
        break;
    }
  }

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id as string) },
      data,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const handlerDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id as string),
      },
    });
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
