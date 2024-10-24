import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string().email('informe um endereço de email valido'),
  senha: z.string().min(8, 'este campo deve ter no minimo 8 caracteres'),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SingInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['token']);

  async function handleSignIn(data: SignInFormSchema) {
    try {
      const response = await api.post('/login', data);
      setCookie('token', response.data.token, { path: '/' });
      navigate('/');
    } catch (error) {
      // setError('email', {
      //     type: 'registeredValue',
      //     message: 'esse email já foi cadastrado',
      // });
      console.error('Error:', error);
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4">
      <div className="flex w-full flex-col gap-1">
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}
        <Input
          className={`${errors.email ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
          required
          placeholder="E-mail"
          type="email"
          {...register('email')}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        {errors.senha && (
          <div className="text-sm text-red-500">{errors.senha.message}</div>
        )}
        <div className="relative mb-6 flex items-center justify-center">
          <Input
            className={`${errors.senha ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
            required
            placeholder="Senha"
            {...register('senha')}
            type={isVisiblePassword ? 'text' : 'password'}
          />
          <a
            className="text-blue-primary absolute -bottom-6 right-0 text-xs font-light"
            href="#"
          >
            Esqueceu senha?
          </a>
          <button
            className="absolute right-2 text-gray-700"
            type="button"
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
          >
            {isVisiblePassword ? (
              <Eye className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="mt-4 flex items-center justify-center rounded-md bg-purple-500 px-3 py-2 text-center text-white transition-colors hover:bg-purple-600 disabled:bg-purple-800"
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
      <span className="mt-4 text-center text-sm font-light">
        Não está cadastrado?{' '}
        <a href="/sign-up" className="text-blue-primary font-medium">
          Cadastre-se
        </a>
      </span>
    </form>
  );
}
