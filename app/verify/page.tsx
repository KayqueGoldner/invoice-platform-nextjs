import Link from "next/link";
import { AlertCircleIcon, ArrowLeftIcon, MailIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const VerifyPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-blue-100">
            <MailIcon className="size-12 text-blue-500" />
          </div>

          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md border-yellow-300 bg-yellow-50 p-4">
            <div className="flex items-center">
              <AlertCircleIcon className="size-5 text-yellow-400" />

              <p className="ml-3 text-sm font-medium text-yellow-700">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyPage;
