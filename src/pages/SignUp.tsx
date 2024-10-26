import { SignUpForm } from "@/components/shared/forms/SignUpForm";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-accent p-4 sm:py-8">
      <div className="rounded-lg border bg-white p-8 sm:p-10 md:p-16 shadow-md w-full max-w-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 border-b-2 pb-4">
          <Link to="/" className="pb-3">
            <img
              width={64}
              height={64}
              src="/logo.png"
              className="h-12 w-auto max-sm:h-10"
              alt="logo"
            />
          </Link>
          <h1 className="text-2xl font-bold text-center">Crie sua conta!</h1>
          <p className="text-center text-sm font-light max-w-[340px]">
            Preencha seus dados e desfrute de todos os benefícios da plataforma
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}