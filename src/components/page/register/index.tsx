import Image from "next/image";
import RegisterForm from "./register-form";

function RegisterPage() {
  return (
    <div className="flex h-[100vh] items-center">
      <div className="w-1/2 h-full flex items-center bg-slate-600">
        <Image
          className="mx-auto"
          src="/login.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
