"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { requireUser } from "@/app/utils/hooks";
import { onboardingSchema } from "@/app/utils/zodSchemas";
import prisma from "@/app/utils/db";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}
