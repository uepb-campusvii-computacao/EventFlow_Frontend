import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { profileLinks } from '@/lib/links';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function Profile() {
  const token = Cookies.get('token');

  const [user, setUser] = useState<{
    id: string;
    nome: string;
    nome_cracha: string;
    email: string;
    instituicao: string;
    cpf: string;
    active: boolean;
  } | null>(null);

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
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col gap-4">
            <div>
              <form className="flex flex-col gap-4">
                <div className="">
                  <label htmlFor="nome" className="text-sm font-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={user?.nome}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="nome_cracha"
                    className="text-sm font-semibold"
                  >
                    Nome de crachá
                  </label>
                  <input
                    type="text"
                    id="nome_cracha"
                    name="nome_cracha"
                    value={user?.nome_cracha}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="instituicao"
                    className="text-sm font-semibold"
                  >
                    Instituição
                  </label>
                  <input
                    type="text"
                    id="instituicao"
                    name="instituicao"
                    value={user?.instituicao}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <input type="submit" value="Atualizar Perfil" />
              </form>
            </div>
            <div>
              <form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="cpf" className="text-sm font-semibold">
                    CPF
                  </label>
                  <Input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={user?.cpf}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="active" className="text-sm font-semibold">
                    Ativo
                  </label>
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={user?.active}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </form>
            </div>
          </Container>
        </Main>
      </div>
    </>
  );
}
