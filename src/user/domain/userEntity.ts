export type User = {
  user_name: string;
  email: string;
  nome_cracha: string;
  instituicao: string;
  inscricao: {
    status: 'PENDENTE' | 'REALIZADO' | 'EXPIRADO' | 'GRATUITO';
    nome_lote: string;
    preco: number;
    uuid_evento: string;
  };
  payment: {
    date_created: string | undefined;
    date_approved: string | undefined;
    status: string;
    qr_code_base64: string;
    qr_code: string;
    ticket_url: string;
  };
  atividades: { nome: string; tipo_atividade: string; uuid_atividade: string }[];
};