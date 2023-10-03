import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .nonempty("khong duoc bo trong")
    .min(4, "nhap 4 ki tu tro len"),
});
