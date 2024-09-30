import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Heart, Instagram, Share2 } from 'lucide-react';

export function Bazar() {
  const handleShare = async () => {
    const imageUrl = 'https://i.imgur.com/mIQT70l.png'; // URL da imagem que você quer compartilhar
    const title = 'Confira essa imagem!';
    const text = 'Dê uma olhada nessa imagem incrível.';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: imageUrl, // URL para compartilhar, que pode ser um link da imagem ou página
        });
        console.log('Compartilhamento bem-sucedido!');
      } catch (error) {
        console.error('Erro no compartilhamento:', error);
      }
    } else {
      alert('Compartilhamento não suportado no seu navegador');
    }
  };
  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-end gap-4 pb-16 pt-8">
          <img
            className="sm:h-[388px] w-full h-[180px] rounded-md border-2 shadow-md bg-"
            src="https://i.imgur.com/mIQT70l.png"
            width={160}
          />
          <div className="rounded-md border-2 bg-white p-8 shadow-md">
            <h1 className="text-center text-2xl font-semibold">
              I Bazar Solidário - NINA
            </h1>

            <p className="my-3 text-lg font-light">
              É com grande entusiasmo que anunciamos o I Bazar Solidário NINA,
              que acontecerá no{' '}
              <strong>dia 16 de outubro de 2024, no Campus VII da UEPB</strong>,
              na cidade de Patos, Paraíba.
              <br />
              <br />
              Entre os dias 01 e 14 de outubro, estaremos recebendo doações de
              roupas e calçados (masculinos, femininos e infantis) em bom estado
              de uso. Sua contribuição é fundamental para o sucesso do evento e
              para ajudar os animais acolhidos no campus.
            </p>
            <h2 className="text-xl my-4 font-semibold">Sobre o evento</h2>
            <p className="my-3 text-lg font-light">
              O <b>I Bazar Solidário NINA</b> tem como objetivo principal
              arrecadar fundos para financiar a castração e a compra de
              medicamentos essenciais, como antibióticos, antifúngicos e
              carrapaticidas, destinados aos animais acolhidos no campus. A
              iniciativa visa promover o bem-estar animal, contribuindo para o
              controle populacional responsável e o tratamento adequado dos
              animais resgatados.
              <br /> <br />
              A proposta do evento é oferecer à comunidade a oportunidade de
              adquirir roupas, calçados e acessórios seminovos, de boa
              qualidade, a preços acessíveis. Serão vendidos itens para públicos
              infantil, masculino e feminino, com preços simbólicos de R$ 2,00,
              R$ 5,00 e R$ 10,00 (apenas para peças diferenciadas). Dessa forma,
              o bazar torna-se acessível a todos, permitindo que a comunidade
              participe ativamente da causa.
              <br /> <br />
              Toda a renda arrecadada será destinada à compra de medicamentos e
              à realização de castrações, ações fundamentais para a saúde e o
              bem-estar dos animais do campus. O <b>
                I Bazar Solidário NINA
              </b>{' '}
              é, portanto, uma oportunidade para unir solidariedade e
              responsabilidade social, envolvendo a comunidade em um esforço
              coletivo para melhorar a vida dos animais que precisam de cuidados
              urgentes. Ao participar, cada pessoa contribui diretamente para um
              futuro mais saudável e digno para esses animais.
            </p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <a
                className="flex items-center gap-2 py-2 px-3 rounded-md bg-red-500 text-white font-bold uppercase"
                href="https://link.mercadopago.com.br/bazarsolidarionina"
              >
                <Heart /> Doe aqui
              </a>
              <a
                className="flex items-center gap-2 py-2 px-3 rounded-md bg-gradient-to-tl from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white font-bold uppercase"
                href="https://www.instagram.com/bazarsolidarionina"
              >
                <Instagram /> Conheça nosso instagram
              </a>
              <button
                className="flex items-center gap-2 rounded-md py-2 px-3 bg-slate-200 text-black"
                onClick={handleShare}
              >
                <Share2 />
                Compartilhar
              </button>
            </div>
          </div>
        </main>
      </Container>
    </>
  );
}
