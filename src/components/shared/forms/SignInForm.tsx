import { Input } from '@/components/ui/input';
import { api, checkError } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string().email('Informe um endereço de email válido'),
  senha: z.string().min(8, 'Este campo deve ter no mínimo 8 caracteres'),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [emailForRecovery, setEmailForRecovery] = useState('');
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  
  const navigate = useNavigate();
  
  async function handleSignIn(data: SignInFormSchema) {
    try {
      const response = await api.post('/login', data);
      Cookies.set('token', response.data.token, { expires: 12/24, path: '/'});
      navigate('/');
    } catch (error) {
      checkError(
        error,
        (message) => toast.error(message),
        () => toast.error('Erro ao fazer login: ' + (error || 'Ocorreu um erro.'))
      );
    }
  }

  async function handlePasswordReset() {
    if (isRecoveringPassword) return;
    setIsRecoveringPassword(true);
    try {
      if (!emailForRecovery) {
        toast.error('Por favor, insira um endereço de email.');
        setIsRecoveringPassword(false);
        return;
      }
      
      await api.post('/request-password-reset', { email: emailForRecovery });
      toast.success('E-mail de recuperação de senha enviado!');
    } catch (error) {
      checkError(
        error,
        (message) => toast.error(message),
        () => toast.error('Erro ao enviar email de recuperação: ' + (error || 'Ocorreu um erro.'))
      );
    } finally {
      setIsRecoveringPassword(false);
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
          onChange={(e) => setEmailForRecovery(e.target.value)}
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
          <button
            type="button"
            className={`text-blue-primary absolute -bottom-6 right-0 text-xs font-light ${isRecoveringPassword ? 'pointer-events-none opacity-50' : ''}`}
            onClick={handlePasswordReset}
            disabled={isRecoveringPassword}
          >
            Esqueceu senha?
          </button>
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