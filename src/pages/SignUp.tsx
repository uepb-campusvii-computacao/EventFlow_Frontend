import { SignUpForm } from "@/components/shared/forms/SignUpForm";

export function SignUp() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-accent sm:py-8">
      <div className="rounded-lg border bg-white p-16 shadow-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 border-b-2 pb-4">
          <h1 className="text-2xl font-bold">Crie sua conta!</h1>
          <p className="max-w-[340px] text-center text-sm font-light">
            Preencha seu dados e disfrute de todas os beneficios da plataforma
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}