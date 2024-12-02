"use client";

import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} className="w-full">
          <Loader2Icon className="mr-2 size-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Submit
        </Button>
      )}
    </>
  );
};
