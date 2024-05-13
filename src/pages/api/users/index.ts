import { Users } from "@/utils/users";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.json(Users);
};

export default handler;
