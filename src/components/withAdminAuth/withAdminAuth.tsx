/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser) as any;

    useEffect(() => {
      if (!user) {
        // If no user is logged in, redirect to login page
        Swal.fire("You are not authorized!");
        router.replace("/login");
      } else if (!user.role || user.role !== "admin") {
        // If user is not an admin, log them out and redirect to login page
        Swal.fire("You are not authorized!");
        dispatch(logout());
        router.replace("/login");
      }
    }, [user]);

    if (!user || user.role !== "admin") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
