"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { CartDropdown } from "@/components/cartDropdown";

export const Navbar = () => {

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">ECOMMERCE</p>
          </NextLink>
        </NavbarBrand>
        <NavbarItem>
          <CartDropdown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
