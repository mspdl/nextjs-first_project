import { Users } from "@/utils/users";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const urlUserId = req.query.id;
  const currentUser = Users.find((user) => user.id?.toString() === urlUserId);
  currentUser ? res.json(currentUser) : res.json({ error: "User not found" });
};

export default handler;