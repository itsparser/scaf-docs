"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {ThemeToggle} from "@/components/theme-toggle";
import {UserProfile} from "@/components/user-profile";

export function SiteHeader() {
    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

    useEffect(() => {
        const html = document.querySelector("html");
        if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
    }, [hamburgerMenuIsOpen]);

    useEffect(() => {
        const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
        window.addEventListener("orientationchange", closeHamburgerNavigation);
        window.addEventListener("resize", closeHamburgerNavigation);

        return () => {
            window.removeEventListener("orientationchange", closeHamburgerNavigation);
            window.removeEventListener("resize", closeHamburgerNavigation);
        };
    }, [setHamburgerMenuIsOpen]);

    return (
        <>
            <header
                className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b opacity-0 backdrop-blur-[12px] [--animation-delay:600ms]">
                <div className="container flex h-[3.5rem] items-center justify-between">
                    <Link className="text-md flex items-center" href="/">
                        <b>Scaf</b>
                    </Link>

                    <div className="ml-auto flex h-full items-center">
                        <Link className="mr-6 text-sm" href="/templates">
                            Browse Templates
                        </Link>
                        <ThemeToggle className="mr-6 text-sm"/>
                        <UserProfile/>
                    </div>
                    {/*<button*/}
                    {/*  className="ml-6 md:hidden"*/}
                    {/*  onClick={() => setHamburgerMenuIsOpen((open) => !open)}*/}
                    {/*>*/}
                    {/*  <span className="sr-only">Toggle menu</span>*/}
                    {/*  {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}*/}
                    {/*</button>*/}
                </div>
            </header>
            {/*<AnimatePresence>*/}
            {/*  <motion.nav*/}
            {/*    initial="initial"*/}
            {/*    exit="exit"*/}
            {/*    variants={mobilenavbarVariant}*/}
            {/*    animate={hamburgerMenuIsOpen ? "animate" : "exit"}*/}
            {/*    className={cn(*/}
            {/*      `fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] `,*/}
            {/*      {*/}
            {/*        "pointer-events-none": !hamburgerMenuIsOpen,*/}
            {/*      }*/}
            {/*    )}*/}
            {/*  >*/}
            {/*    <div className="container flex h-[3.5rem] items-center justify-between">*/}
            {/*      <Link className="text-md flex items-center" href="/">*/}
            {/*        Scaf*/}
            {/*      </Link>*/}

            {/*      <button*/}
            {/*        className="ml-6 md:hidden"*/}
            {/*        onClick={() => setHamburgerMenuIsOpen((open) => !open)}*/}
            {/*      >*/}
            {/*        <span className="sr-only">Toggle menu</span>*/}
            {/*        {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*    <motion.ul*/}
            {/*      className={`flex flex-col md:flex-row md:items-center uppercase md:normal-case ease-in`}*/}
            {/*      variants={containerVariants}*/}
            {/*      initial="initial"*/}
            {/*      animate={hamburgerMenuIsOpen ? "open" : "exit"}*/}
            {/*    >*/}
            {/*      {menuItem.map((item) => (*/}
            {/*        <motion.li*/}
            {/*          variants={mobileLinkVar}*/}
            {/*          key={item.id}*/}
            {/*          className="border-grey-dark pl-6 py-0.5 border-b md:border-none"*/}
            {/*        >*/}
            {/*          <Link*/}
            {/*            className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${*/}
            {/*              hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""*/}
            {/*            }`}*/}
            {/*            href={item.href}*/}
            {/*          >*/}
            {/*            {item.label}*/}
            {/*          </Link>*/}
            {/*        </motion.li>*/}
            {/*      ))}*/}
            {/*    </motion.ul>*/}
            {/*  </motion.nav>*/}
            {/*</AnimatePresence>*/}
        </>
    );
}
