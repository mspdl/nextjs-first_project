import { Users } from "@/utils/users";
import { NextApiHandler } from "next";

const getAllUsers: NextApiHandler = async (req, res) => {
  res.json(Users);
};
const insertNewUser: NextApiHandler = async (req, res) => {
  res.json({ status: true });
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getAllUsers(req, res);
      break;
    case "POST":
      insertNewUser(req, res);
      break;
  }
};

export default handler;
