import RegisterPage from "@/components/page/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

function page() {
  return <RegisterPage />;
}

export default page;
