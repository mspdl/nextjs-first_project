import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({ message: "You are not allowed." });
    return;
  } else {
    res.json({
      message: "You have access to this page.",
      session,
    });
  }
};

export default handler;
