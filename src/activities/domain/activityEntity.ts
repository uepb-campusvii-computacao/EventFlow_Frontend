export type Activity = {
  _count: number;
  nome: string;
  uuid_atividade: string;
  max_participants: number | null;
  tipo_atividade: string;
};

export type Activities = {
  [tipo in 'MINICURSO' | 'OFICINA' | 'WORKSHOP' | 'PALESTRA']?: {
    [turno: string]: Activity[];
  };
};

export const activityDetails: {
    key: keyof Activities;
    label: string;
    color: string;
  }[] = [
    { key: 'MINICURSO', label: 'Minicursos', color: 'blue' },
    { key: 'OFICINA', label: 'Oficinas', color: 'green' },
    { key: 'WORKSHOP', label: 'Workshops', color: 'purple' },
    { key: 'PALESTRA', label: 'Palestras', color: 'orange' },
  ];