import sercompLogo from '@/assets/SERCOMP-logo.png';
import activitiesIcon from '@/assets/activities-icon.png';
import calendarIcon from '@/assets/calendar-icon.png';
import emojiIcon from '@/assets/emoji-icon.png';
import graphIcon from '@/assets/graph-icon.png';
import messageIcon from '@/assets/message-icon.png';

export const navbar_links: { title: string; href: string }[] = [
  {
    title: 'Eventos',
    href: '/eventos',
  }
];

// Usado na home page, para listar eventos que já passaram pelo Eventflow
export const events = [{
  imgUrl: sercompLogo,
  imgAlt: 'logo do evento sercomp',
  description: null
}, {
  imgUrl: emojiIcon,
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}, {
  imgUrl: emojiIcon,
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}, {
  imgUrl: emojiIcon,
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}];

// Usando na home page para listar os recursos da plataforma
export const recursos = [{
  imgUrl: messageIcon,
  imgAlt: 'Ícone de mensagem com um usuário',
  title: 'Gerenciamento de Inscrições',
  description: 'Otimize as inscrições e o acompanhamento dos participantes, garantindo uma experiência fluida para os usuários.'
}, {
  imgUrl: calendarIcon,
  imgAlt: 'Ícone de calendário com marcador de localização',
  title: 'Agendamento de Locais',
  description: 'Simplifique a reserva de espaços, agendamento de datas e horários, melhorando o funcionamento do evento.'
}, {
  imgUrl: activitiesIcon,
  imgAlt: 'Ícone de três listas de tarefas',
  title: 'Gestão de Atividades e Suporte',
  description: 'Coordene e organize todas as atividades e sessões do evento, garantindo um cronograma claro e eficiente.'
}, {
  imgUrl: graphIcon,
  imgAlt: 'Ícone de gráfico com linha ascendente',
  title: 'Gerenciamento de Relatórios',
  description: 'Visualize insights detalhados sobre o desempenho do evento, garantindo o aperfeiçoamento de futuras edições.'
}]