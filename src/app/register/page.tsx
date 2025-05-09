import { redirect } from "next/navigation";
import { RegisterForm } from "../../components/RegisterForm";
import { cookies } from "next/headers";

export default function LoginPage() {
  const token = cookies().get("token");

  if (token && token.value !== "") {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center my-14 justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
