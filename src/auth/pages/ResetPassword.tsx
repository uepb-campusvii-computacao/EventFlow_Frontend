import { api, checkError } from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react'; // Certifique-se de ter essa biblioteca instalada
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await api.post('/reset-password', { token, newPassword: password });
      setSuccess(true);
    } catch (erro) {
      checkError(
        erro,
        (message) => toast.error(message),
        () =>
          toast.error('Erro ao redefinir senha: ' + (erro || 'Ocorreu um erro.'))
      );
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-accent p-4">
      <div className="rounded-lg border bg-white p-8 sm:p-10 md:p-16 shadow-md w-full max-w-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 border-b pb-4">
          <Link to="/" className="pb-3">
            <img
              width={64}
              height={64}
              src="/logo.png"
              className="h-12 w-auto max-sm:h-10"
              alt="logo"
            />
          </Link>
          <h1 className="text-2xl font-bold text-center">Redefinir Senha</h1>
        </div>
        {success ? (
          <p className="text-green-500">Senha redefinida com sucesso!</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordReset();
            }}
            className="flex flex-col gap-4 w-full max-w-sm mt-4"
          >
            {error && <p className="text-red-500">{error}</p>}
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Nova Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-6 w-6 text-gray-600" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirme a Nova Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff className="h-6 w-6 text-gray-600" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
              Redefinir Senha
            </button>
          </form>
        )}
      </div>
    </main>
  );
}