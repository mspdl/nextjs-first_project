import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const urlUserId = req.query.id;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(urlUserId as string), active: true },
  });

  user
    ? res.json({ status: true, user })
    : res.status(404).json({ error: "User not found" });
};

const handlerPut: NextApiHandler = async (req, res) => {
  const { name, active } = req.body;
  const { id } = req.query;

  let user, error;

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
    user = await prisma.user.update({
      where: { id: parseInt(id as string) },
      data,
    });
  } catch (dbError) {
    error = dbError;
  }

  user ? res.status(200).json({ user }) : res.status(404).json({ error });
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handlerGet(req, res);
      break;
    case "PUT":
      handlerPut(req, res);
      break;
  }
};

export default handler;
