import { SingInForm } from '@/components/shared/forms/SignInForm';

export function SignIn() {

 
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-accent">
      <div className="rounded-lg border bg-white p-16 shadow-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 border-b pb-4">
          <h1 className="text-2xl font-bold">Seja bem-vindo!</h1>
          <p className="max-w-[340px] text-center text-sm font-light">
            Preencha seu dados e disfrute de todas os beneficios da plataforma
          </p>
        </div>
        <SingInForm />
      </div>
    </main>
  );
}
