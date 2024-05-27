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

  try {
    user = await prisma.user.update({
      where: { id: parseInt(id as string) },
      data: { name, active: active === "true" ? true : false },
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
