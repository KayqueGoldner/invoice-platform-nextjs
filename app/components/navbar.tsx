import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />
        <h3 className="text-2xl font-semibold">
          Invoice <span className="text-blue-500">Platform</span>
        </h3>
      </Link>

      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
};
