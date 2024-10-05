"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import logo from "../../app/logo.png";

const NavBar = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [theme, setTheme] = useState("pastel");

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    if (localTheme) {
      document.querySelector("html")?.setAttribute("data-theme", localTheme);
    }
  }, [theme]);

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
    setIsMenuOpen(false);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dracula");
    } else {
      setTheme("pastel");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = (
    <>
      <li className="text-lg hover:text-gray-400">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li className="text-lg hover:text-gray-400">
        <Link href="/posts/create" onClick={() => setIsMenuOpen(false)}>
          Create Post
        </Link>
      </li>
      {isHydrated &&
        (user ? (
          <>
            <li className="text-lg hover:text-gray-400">
              <Link
                href=""
                onClick={handleLogOut}
                className="focus:outline-none"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li className="text-lg hover:text-gray-400">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        ))}
      <li className="text-lg hover:text-gray-400">
        <Link href="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
      </li>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={theme === "pastel" ? false : true}
        />

        <svg
          className="swap-on h-8 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <svg
          className="swap-off h-8 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </>
  );

  return (
    <nav className="font-short-stack border-b ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            alt="Pet Tales Logo"
            className="object-contain"
            height={100}
            src={logo}
            width={300}
          />
        </div>

        <ul className="hidden lg:flex space-x-6 items-center">{navLinks}</ul>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-16 6h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="space-y-4 p-4">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
