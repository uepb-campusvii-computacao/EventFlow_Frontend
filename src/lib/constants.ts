export const navbar_links: { title: string; href: string }[] = [
  {
    title: 'Eventos',
    href: '/eventos',
  },
  {
    title: 'Contrate',
    href: '#',
  },
  {
    title: 'Buscar evento',
    href: '#',
  },
  {
    title: 'Documentacao',
    href: '#',
  },
];

// usado na home page, para listar eventos que já passaram pelo Eventflow
export const events = [{
  imgUrl: './src/assets/SERCOMP-logo.png',
  imgAlt: 'logo do evento sercomp',
  description: null
}, {
  imgUrl: './src/assets/emoji-icon.png',
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}, {
  imgUrl: './src/assets/emoji-icon.png',
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}, {
  imgUrl: './src/assets/emoji-icon.png',
  imgAlt: 'Emoji muito estiloso, com óculos escuro',
  description: 'Em andamento...'
}];

// usando na home page para listar os recursos da plataforma
export const recursos = [{
  imgUrl: './src/assets/message-icon.png',
  imgAlt: 'Ícone de mensagem com um usuário',
  title: 'Gerenciamento de Inscrições',
  description: 'Otimize as inscrições e o acompanhamento dos participantes, garantindo uma experiência fluida para os usuários.'
}, {
  imgUrl: './src/assets/calendar-icon.png',
  imgAlt: 'Ícone de calendário com marcador de localização',
  title: 'Agendamento de Locais',
  description: 'Simplifique a reserva de espaços, agendamento de datas e horários, melhorando o funcionamento do evento.'
}, {
  imgUrl: './src/assets/activities-icon.png',
  imgAlt: 'Ícone de três listas de tarefas',
  title: 'Gestão de Atividades e Suporte',
  description: 'Coordene e organize todas as atividades e sessões do evento, garantindo um cronograma claro e eficiente.'
}, {
  imgUrl: './src/assets/graph-icon.png',
  imgAlt: 'Ícone de gráfico com linha ascendente',
  title: 'Gerenciamento de Relatórios',
  description: 'Visualize insights detalhados sobre o desempenho do evento, garantindo o aperfeiçoamento de futuras edições.'
}]