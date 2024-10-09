/* eslint-disable @typescript-eslint/no-explicit-any */

import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function withAdminAuth(WrappedComponent: any) {
  return function WithAdminAuth(props: any) {
    const user = useAppSelector(selectCurrentUser) as { role: string } | null;
    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!user) {
        Swal.fire("You are not authorized!");
        redirect("/login");
      } else if (user.role !== "admin") {
        dispatch(logout());
        redirect("/login");
      }
    }, [isClient, user, dispatch]);

    if (!isClient || !user || user.role !== "admin") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
