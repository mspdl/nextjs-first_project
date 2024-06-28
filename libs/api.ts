/* eslint-disable import/no-anonymous-default-export */
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

  addUser: async (name: string, email: string) => {
    return await prisma.user.create({ data: { name, email } });
  },

  getUserById: async (userId: number) => {
    return await prisma.user.findFirst({
      where: { id: userId, active: true },
      select: { id: true, name: true, email: true },
    });
  },

  getUserByEmail: async (userEmail: string) => {
    return await prisma.user.findFirst({
      where: { email: userEmail, active: true },
      select: { id: true, name: true, email: true, role: true },
    });
  },

  updateUser: async (id: number, name?: string, active?: string) => {
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
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  deleteUser: async (userId: number) => {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },
};
