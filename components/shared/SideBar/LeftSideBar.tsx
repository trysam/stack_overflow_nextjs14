"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/constants";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <section
      className={`background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 h-screen overflow-y-scroll border-r shadow-light-200 dark:text-light-900 dark:shadow-none max-sm:hidden lg:w-[266px]`}
    >
      <div className="relative m-6 mt-36 ">
        <div className="flex flex-1 flex-col gap-6 max-md:items-center ">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 ${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"} `}
                />
                <p
                  className={`${isActive ? "base-bold" : "base-medium"} pr-5 max-lg:hidden`}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-dark300_light900 flex items-center justify-start gap-4 rounded-lg bg-transparent py-2"
            >
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none  ">
                <Image
                  src="/assets/icons/account.svg"
                  alt="Sign In"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Button>
            </Link>
            <Link
              href="/sign-up"
              className="text-dark300_light900 flex items-center justify-start gap-4 rounded-lg bg-transparent py-2"
            >
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="Sign In"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
