"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import logo from "../../app/logo.png";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
    setIsMenuOpen(false);
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
      {isHydrated && user ? (
        <>
          <li className="text-lg hover:text-gray-400">
            <Link href="" onClick={handleLogOut} className="focus:outline-none">
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
      )}
      <li className="text-lg hover:text-gray-400">
        <Link href="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
      </li>
    </>
  );

  return (
    <nav className="font-short-stack">
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
