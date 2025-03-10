import { Input } from '@/components/ui/input';
import { api, checkError } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import { MaskedInput } from '../maskinput';

const signUpFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email('email invalido'),
    cpf: z.string(),
    nickname: z.string(),
    organization: z.string(),
    password: z.string().min(8, 'Este campo deve ter pelo menos 8 caracteres'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ['confirm_password'],
  })
  .refine((data) => cpf.isValid(limparCPF(data.cpf)) == true, {
    message: "Cpf não é valido",
    path: ['cpf'],
  },

  
);

 function limparCPF(cpf:string) {
 
  return cpf.replace(/\D/g, ''); 
  
}
 
  

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;



export function SignUpForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisiblePasswordConfirmation, setIsVisiblePasswordConfirmation] =
    useState(false);
 

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function handleRegisterUser(data: SignUpFormSchema) {
    try {
      await api.post('/register', data);
      navigate("/sign-in")
    } catch (error) {
      checkError(error, 
        (message) => toast.error(message),
        () => toast.error('Erro ao buscar atividades: ' + error || 'Ocorreu um erro.')
      );
    }
  }


  return (
    <form
      onSubmit={handleSubmit(handleRegisterUser)}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full flex-col gap-1">
        {errors.name && (
          <div className="text-sm text-red-500">{errors.name.message}</div>
        )}
        <Input
          className={`${errors.name ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
          required
          placeholder="Nome completo"
          type="text"
          {...register('name')}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
    
          {errors.cpf && (
            <div className="text-sm text-red-500">{errors.cpf.message}</div>
             )}
          < MaskedInput
            className={`${errors.cpf ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
            required
            placeholder="CPF"
            mask="000.000.000-00"
            {...register('cpf')}
            />



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
        {errors.nickname && (
          <div className="text-sm text-red-500">{errors.nickname.message}</div>
        )}
        <Input
          className={`${errors.nickname ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
          required
          placeholder="Nome do crachá"
          type="text"
          {...register('nickname')}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        {errors.organization && (
          <div className="text-sm text-red-500">
            {errors.organization.message}
          </div>
        )}
        <Input
          className={`${errors.organization ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
          required
          placeholder="Instituição"
          type="text"
          {...register('organization')}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
       
       
        
        <div className="relative flex items-center justify-center">
          <Input
            className={`${errors.password ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
            required
            placeholder="Senha"
            {...register('password')}
            type={isVisiblePassword ? 'text' : 'password'}
          />
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
      <div className="flex w-full flex-col gap-1">
        {errors.confirm_password && (
          <div className="text-sm text-red-500">
            {errors.confirm_password.message}
          </div>
        )}
        <div className="relative flex items-center justify-center">
          <Input
            className={`${errors.confirm_password ? 'focus:!ring-red-500' : 'focus:!ring-purple-500'}`}
            required
            placeholder="Confirme sua senha"
            {...register('confirm_password')}
            type={isVisiblePasswordConfirmation ? 'text' : 'password'}
          />
          <button
            className="absolute right-2 text-gray-700"
            type="button"
            onClick={() =>
              setIsVisiblePasswordConfirmation(!isVisiblePasswordConfirmation)
            }
          >
            {isVisiblePasswordConfirmation ? (
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
        {isSubmitting ? 'Carregando...' : 'Criar conta'}
      </button>
      <span className="mt-2 text-center text-sm font-light">
        Já está cadastrado?{' '}
        <a href="/sign-in" className="text-blue-primary font-medium">
          Entre na sua conta
        </a>
      </span>
    </form>
  );
}
