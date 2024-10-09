
/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function withAuth(WrappedComponent: any) {
  return function WithAuth(props: any) {
    const user = useAppSelector(selectCurrentUser);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient && !user) {
        Swal.fire("You need to login first!");
        redirect("/login");
      }
    }, [isClient, user]);

    if (!isClient || !user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
