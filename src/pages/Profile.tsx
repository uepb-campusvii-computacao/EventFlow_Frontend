import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { profileLinks } from '@/lib/links';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export function Profile() {
  const token = Cookies.get('token');

  const formSchema = z.object({
    nome: z
      .string()
      .trim()
      .refine(
        (val) => {
          if (val === '') return true;

          return /^[a-zA-Z\sÀ-ÿ']+(\s[a-zA-Z\sÀ-ÿ']+)+$/.test(val);
        },
        {
          message: 'Insira seu nome completo.',
        }
      )
      .optional(),
    nome_cracha: z
      .string()
      .trim()
      .refine(
        (val) => {
          if (val === '') return true; // Allow empty string
          // Regex for names: letters, spaces, accented characters, apostrophe, hyphen, and numbers
          return /^[a-zA-Z0-9\sÀ-ÿ'-]+$/.test(val);
        },
        {
          message:
            'Nome de crachá inválido. Apenas letras, espaços, hifens, apóstrofos e números são permitidos.',
        }
      )
      .optional(),
    email: z
      .string()
      .trim()
      .refine(
        (val) => {
          if (val === '') return true; // Allow empty string
          // Zod's email validation for non-empty strings
          return z.string().email().safeParse(val).success;
        },
        { message: 'E-mail inválido.' }
      )
      .optional(),
    instituicao: z
      .string()
      .trim()
      .refine(
        (val) => {
          if (val === '') return true; // Allow empty string
          // Regex for institution: alphanumeric, spaces, accented, and common symbols
          return /^[a-zA-Z0-9\sÀ-ÿ.,'&()-]+$/.test(val);
        },
        {
          message:
            "Instituição inválida. Apenas letras, números, espaços, e os símbolos .,'&()- são permitidos.",
        }
      )
      .optional(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const [user, setUser] = useState<{
    id?: string;
    nome?: string;
    nome_cracha?: string;
    email?: string;
    instituicao?: string;
    cpf?: string;
    active?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      nome: user?.nome || '',
      nome_cracha: user?.nome_cracha || '',
      email: user?.email || '',
      instituicao: user?.instituicao || '',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        setUser(data);
        setLoading(false);
        reset();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUserUpdate = async (data: FormSchema) => {
    if (!data.nome && !data.nome_cracha && !data.email && !data.instituicao) {
      toast.error('Por favor, preencha pelo menos um campo.');
      return;
    }

    const initialNome = user?.nome || '';
    const initialNomeCracha = user?.nome_cracha || '';
    const initialEmail = user?.email || '';
    const initialInstituicao = user?.instituicao || '';

    if (
      (data.nome === initialNome || data.nome === '') &&
      (data.nome_cracha === initialNomeCracha || data.nome_cracha === '') &&
      (data.email === initialEmail || data.email === '') &&
      (data.instituicao === initialInstituicao || data.instituicao === '')
    ) {
      toast.error('Nenhum dado foi alterado.');
      reset();
      return;
    }

    const newUserData: {
      nome?: string;
      nome_cracha?: string;
      email?: string;
      instituicao?: string;
    } = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );

    try {
      const response = await api.put(`/user/${user?.id}`, newUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { user: updatedUser } = await response.data;
      setUser({
        ...user,
        nome: updatedUser.nome,
        nome_cracha: updatedUser.nome_cracha,
        email: updatedUser.email,
        instituicao: updatedUser.instituicao,
      });
      reset();
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil.');
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col gap-4 w-full h-full items-center xl:p-16">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex flex-col gap-6 p-8 border-2 rounded-xl border-gray-400 w-6/12">
                <h1 className="font-semibold text-5xl">Meu Perfil</h1>
                <div>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleUserUpdate)}
                  >
                    <div>
                      <label htmlFor="nome" className="text-lg font-normal">
                        Nome:
                      </label>
                      <Input
                        type="text"
                        id="nome"
                        defaultValue={user?.nome}
                        className="w-full p-2 border border-gray-400 rounded-md"
                        {...register('nome')}
                      />
                      {errors.nome && (
                        <span className="text-red-500 text-lg">
                          {errors.nome.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="nome_cracha"
                        className="text-lg font-normal"
                      >
                        Nome de crachá:
                      </label>
                      <Input
                        type="text"
                        id="nome_cracha"
                        defaultValue={user?.nome_cracha}
                        className="w-full p-2 border border-gray-400 rounded-md"
                        {...register('nome_cracha')}
                      />
                      {errors.nome_cracha && (
                        <span className="text-red-500 text-lg">
                          {errors.nome_cracha.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-lg font-normal">
                        E-mail:
                      </label>
                      <Input
                        type="email"
                        id="email"
                        defaultValue={user?.email}
                        className="w-full p-2 border border-gray-400 rounded-md"
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-lg">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="instituicao"
                        className="text-lg font-normal"
                      >
                        Instituição:
                      </label>
                      <Input
                        type="text"
                        id="instituicao"
                        defaultValue={user?.instituicao}
                        className="w-full p-2 border border-gray-400 rounded-md"
                        {...register('instituicao')}
                      />
                      {errors.instituicao && (
                        <span className="text-red-500 text-lg">
                          {errors.instituicao.message}
                        </span>
                      )}
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mt-4 self-end w-fit rounded-md bg-purple-500 px-6 py-2 text-center font-semibold text-white transition-colors hover:bg-purple-600 disabled:bg-purple-800"
                    >
                      {isSubmitting ? 'Atualizando...' : 'Editar'}
                    </button>
                  </form>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="cpf"
                      className="text-lg text-center font-semibold"
                    >
                      CPF:
                    </label>
                    <Input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={user?.cpf}
                      className="w-full p-2 text-lg rounded-md"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Main>
      </div>
    </>
  );
}
