import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <h2 className="text-3xl text-center font-bold">Log into your account</h2>
      <LoginForm />
    </div>
  );
}
