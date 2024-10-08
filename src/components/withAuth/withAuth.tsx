/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import { ComponentType } from "react";
import Swal from "sweetalert2";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const user = useAppSelector(selectCurrentUser);

    useEffect(() => {
      if (!user) {
        Swal.fire("You need to login first!");
        router.replace("/login");
      }
    }, [user, router]);

    if (!user) {
      Swal.fire("You need to login first!");
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
