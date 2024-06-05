import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
  const { page } = req.query;

  const take = 3;
  let skip = 0;

  if (page) {
    skip = (parseInt(page as string) - 1) * take;
  }

  const users = await prisma.user.findMany({
    skip,
    take,
    where: { active: true },
    select: { id: true, name: true, email: true },
    orderBy: { id: "asc" },
  });

  res.status(200).json({ status: true, users });
};

const handlerPost: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({ data: { name, email } });
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
