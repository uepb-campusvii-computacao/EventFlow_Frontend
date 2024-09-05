import { api } from '@/lib/api';
import { Activities, UserSubscription } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateUserParams {
  user_id: string;
  user_data: UserSubscription | null;
}

export function EditActivities({ user_id, user_data }: UpdateUserParams) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: 'all',
  });

  const [atividades, setAtividades] = useState<Activities>();

  const fetchData = async () => {
    try {
      const { data } = await api.get(
        `/events/53883b5b-bfcc-41a2-b5ac-d07514f40e27/atividades`
      );
      setAtividades(data);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {
    if (user_data?.atividades) {
      const oficina = user_data.atividades.find(
        (a) => a.tipo_atividade === 'OFICINA'
      );
      const minicurso = user_data.atividades.find(
        (a) => a.tipo_atividade === 'MINICURSO'
      );
      const workshop = user_data.atividades.find(
        (a) => a.tipo_atividade === 'WORKSHOP'
      );

      setValue('oficina', oficina?.uuid_atividade || '');
      setValue('minicurso', minicurso?.uuid_atividade || '');
      setValue('workshop', workshop?.uuid_atividade || '');
    }
  }, [user_data, setValue]);

  useEffect(() => {
    fetchData();
  }, []);

  // Mapeamento explícito entre o nome do campo e a propriedade de `atividades`
  const fieldMapping: { [key: string]: keyof Activities } = {
    minicurso: 'minicursos',
    workshop: 'workshops',
    oficina: 'oficinas',
  };

  async function onSubmit(data: any) {
    try {
      // Envia os dados atualizados do usuário
      await api.put(`/user/${user_id}`, {
        nome: user_data?.user_name,
        nome_cracha: user_data?.nome_cracha,
        email: user_data?.email,
        instituicao: user_data?.instituicao,
        status_pagamento: user_data?.inscricao.status,
        minicurso: data.minicurso,
        workshop: data.workshop,
        oficina: data.oficina,
      });

      // Após o envio, busca as atividades novamente
      await fetchData();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 max-w-sm bg-white p-7 rounded-lg text-black shadow"
    >
      <div className="flex flex-col">
        <p className="text-lg font-bold">Atividades</p>
        <div className="flex flex-col gap-4 w-full">
          {['minicurso', 'workshop', 'oficina'].map((field) => (
            <select
              key={field}
              className={`select text-gray-900 bg-white shadow border border-gray-300 rounded p-3 ${
                isSubmitting ? 'blurred' : ''
              }`}
              {...register(field)}
              disabled={isSubmitting}
            >
              <option value="">{`${field.charAt(0).toUpperCase() + field.slice(1)}...`}</option>
              {atividades?.[fieldMapping[field]]?.map((item) => (
                <option key={item.uuid_atividade} value={item.uuid_atividade}>
                  {item.nome} - Vagas ({item._count}/{item.max_participants})
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary inline-flex items-center justify-center rounded h-10 bg-green-400 w-60 text-white font-bold"
        >
          {isSubmitting ? 'Aguarde...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
