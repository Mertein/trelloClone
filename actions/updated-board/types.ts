import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdatedBoard } from "./schema";

export type InputType = z.infer<typeof UpdatedBoard>;
export type ReturnType = ActionState<InputType, Board>;
