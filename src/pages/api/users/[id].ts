import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";

const handler: NextApiHandler = async (req, res) => {
  const urlUserId = req.query.id;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(urlUserId as string), active: true },
  });

  user
    ? res.json({ status: true, user })
    : res.status(404).json({ error: "User not found" });
};

export default handler;
