export type Event = {
  uuid_evento: string;
  uuid_user_owner: string;
  nome: string;
  slug: string;
  date: string;
  conteudo: string;
  banner_img_url?: string;
};

export type EventBatch = {
  uuid_lote: string;
  uuid_evento: string;
  preco: number;
  nome: string;
  descricao: string;
  ativo: boolean;
};

export type UserSubscription = {
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

export type Activity = {
  _count: number;
  nome: string;
  uuid_atividade: string;
  max_participants: number | null;
  tipo_atividade: string;
};

export type Activities = {
  minicursos: Activity[];
  oficinas: Activity[];
  workshops: Activity[];
};
