import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { SearchPayment } from '@/components/shared/payments/SearchPayment';

export function Event() {
  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-end gap-4 pb-16 pt-8">
          <img
            className="sm:h-[388px] w-full h-[180px] rounded-md border-2 shadow-md bg-"
            src="https://i.imgur.com/yyMWmIB.png"
            width={160}
          />
          <div className="rounded-md border-2 bg-white p-8 shadow-md">
            <h1 className="text-center text-2xl font-semibold">
              IV Semana da Administração - SEMAD 2024
            </h1>

            <p className="my-3 text-lg font-light">
              É com grande entusiasmo que anunciamos a 4ª Semana da
              Administração, que acontecerá de 11 a 13 de setembro de 2024 no
              Campus VII da UEPB na cidade de Patos, Paraíba.
            </p>
            <h2 className="text-xl font-semibold">Sobre o evento</h2>
            <p className="my-3 text-lg font-light">
              Em um mundo onde a evolução tecnológica avança a passos largos, o
              mercado de trabalho não permanece estático. Esse fluxo contínuo de
              mudanças resignifica o conceito de trabalho e desafia
              profissionais a adaptarem-se constantemente. É neste contexto, que
              a 4ª Semana da Administração vem discutir sobre{' '}
              <b>GESTÃO DE CARREIRA, INOVAÇÃO E MERCADO </b> buscando trabalhar
              o <b>MINDSET</b> de crescimento: aprender sempre, se desenvolver
              tecnicamente e evoluir aperfeiçoando suas habilidades não
              importando sua área de atuação.
            </p>
          </div>
          <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
            <h1 className="text-center text-2xl font-semibold pb-10">Inscrições <span className='text-red-500'>ENCERRADAS</span>!</h1>
            <p className='pb-10'>Se você ainda não escolheu sua atividade, acesso o link abaixo! 😺</p>
            {/*<SubscribeForm />
            
            <img
              className="h-[280px] sm:h-[400px] w-auto my-auto mx-auto"
              src="https://img.freepik.com/vetores-gratis/prancheta-estilo-cartoon-3d-com-icone-de-documento-suporte-de-papel-realista-com-ilustracao-vetorial-plana-de-contrato-ou-acordo-gestao-informacao-conceito-de-atribuicao_778687-986.jpg?t=st=1724694837~exp=1724698437~hmac=6dac47bed6d824b3bb02d2bceac2ea613a1fe452cf10d3674fbf32b7f7dc9342&w=740"
              alt="eventflow"
            />*/}
            <SearchPayment />
          </div>

          {/* <Link to={`/eventos/${slug}/inscricao`} className="button-primary">
            Inscreva-se
          </Link> */}
        </main>
      </Container>
    </>
  );
}
