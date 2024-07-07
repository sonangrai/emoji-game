import LoginPage from "@/components/page/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

function page() {
  return <LoginPage />;
}

export default page;
