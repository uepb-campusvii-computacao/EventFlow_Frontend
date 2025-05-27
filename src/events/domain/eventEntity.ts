export type Event = {
  uuid_evento: string;
  uuid_user_owner: string;
  nome: string;
  slug: string;
  date: string;
  conteudo: string;
  banner_img_url?: string;
  background_img_url?: string;
  isPrivate?: boolean;
  colors?: string;
  active: boolean;
};