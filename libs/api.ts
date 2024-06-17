import prisma from "./prisma";

export default {
  getAllUsers: async (page: number) => {
    const take = 3;
    let skip = 0;

    if (page) {
      skip = (page - 1) * take;
    }

    return await prisma.user.findMany({
      skip,
      take,
      where: { active: true },
      select: { id: true, name: true, email: true },
      orderBy: { id: "asc" },
    });
  },
};
