"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { SubmitButton } from "@/app/components/submit-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardUser } from "@/app/actions";
import { onboardingSchema } from "@/app/utils/zodSchemas";

const OnboardingPage = () => {
  const [lastResult, action] = useActionState(onboardUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  key={fields.firstName.key}
                  name={fields.firstName.name}
                  placeholder="John"
                  defaultValue={fields.firstName.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  key={fields.lastName.key}
                  name={fields.lastName.name}
                  placeholder="Doe"
                  defaultValue={fields.lastName.initialValue}
                />
                <p className="text-sm text-red-500">{fields.lastName.errors}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                key={fields.address.key}
                name={fields.address.name}
                placeholder="Chad street 123"
                defaultValue={fields.address.initialValue}
              />
              <p className="text-sm text-red-500">{fields.address.errors}</p>
            </div>

            <SubmitButton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
