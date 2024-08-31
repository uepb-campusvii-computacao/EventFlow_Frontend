export type Event = {
  uuid_evento: string;
  uuid_user_owner: string;
  nome: string;
  slug: string;
  date: string;
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
  inscricao: {
    status: "PENDENTE" | "REALIZADO" | "EXPIRADO" | "GRATUITO";
    nome_lote: string;
    preco: number;
  },
  payment: {
    date_created: string | undefined;
    date_approved: string | undefined;
    status: string;
    qr_code_base64: string;
    qr_code: string;
    ticket_url: string;
  }
};
