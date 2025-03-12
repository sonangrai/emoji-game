import UserHeader from "@/components/common/user-header";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserHeader />
      {children}
    </div>
  );
}

export default LoginLayout;
