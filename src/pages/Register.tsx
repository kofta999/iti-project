import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <h2 className="text-3xl text-center font-bold">
        Register a new account
      </h2>
      <RegisterForm />
    </div>
  );
}
