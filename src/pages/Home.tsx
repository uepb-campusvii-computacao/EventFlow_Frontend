import sponsor1 from '@/assets/sponsor-1.webp';
import sponsor2 from '@/assets/sponsor-2.webp';
import sponsor3 from '@/assets/sponsor-3.webp';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { events, recursos } from '@/lib/constants';

export function Home() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col bg-primary">
        <section className="flex flex-col justify-between w-full bg-black bg-opacity-80 bg-gradient-to-r from-primary from-30% to-95%% to-transparent">
          <Container className="flex gap-8 sm:gap:4 py-28 flex-col-reverse items-center sm:flex-row">
            <div className="flex-1 flex justify-center items-center">
              <img className="w-full" src="./src/assets/logo-v2.png" alt="" />
            </div>
            <div className="w-6/12  text-white text-right max-sm:text-center max-sm:w-full">
              <h1 className="text-4xl font-bold lg:text-6xl md:text-5xl  max-sm:text-center pb-4">
                Simplificando cada etapa do seu evento
              </h1>
              <p className="text-lg font-light max-md:mt-4 max-sm:text-lg">
                Bem-vindos ao eventflow. Nós somos uma startup dedicada a
                transformar a organização do seu evento acadêmico ou
                corporativo.
              </p>
            </div>
          </Container>

          <div className="flex h-24 items-center justify-around bg-black bg-opacity-60">
            {[sponsor1, sponsor2, sponsor3].map((imageSrc) => {
              return (
                <img
                  className="max-h-16 w-1/3 sm:w-auto"
                  src={imageSrc}
                  alt=""
                />
              );
            })}
          </div>
        </section>

        <section className=" w-full bg-secondary">
          <Container className="flex items-end gap-4 p-16 pb-0 max-[1000px]:flex-col max-sm:p-8">
            <div className="flex flex-1 flex-col gap-4 pb-14">
              <h1 className="text-center text-6xl font-bold max-sm:text-4xl">
                Porque escolher o{' '}
                <strong className="text-primary">eventflow</strong>?
              </h1>
              <p className="text-xl font-light max-md:mt-4 max-sm:text-lg">
                Por proporcionarmos uma melhor performasse do processo de
                organização de eventos, economizando tempo e recursos, além de
                fornecermos uma solução abrangente e intuitiva para os
                organizadores.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-center">
                <div className="flex w-48 flex-col rounded-[10px] border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">
                    <span className="text-primary">+</span>200
                  </strong>
                  <span>
                    certificados <br /> gerados
                  </span>
                </div>

                <div className="flex w-48 items-center justify-center flex-col rounded-[10px] border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">
                    <span className="text-primary">+</span>1000
                  </strong>
                  <span>
                    usuarios <br /> cadastrados
                  </span>
                </div>

                <div className="flex w-48 flex-col rounded-[10px] border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">
                    <span className="text-primary">+</span>20
                  </strong>
                  <span>
                    Profissionais <br /> certificados
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <img
                className="max-h-max"
                src="./src/assets/why-man.png"
                alt="Homem pensativo segurando um notebook, cercado por três interrogações"
              />
            </div>
          </Container>
        </section>

        <section className="w-full bg-black bg-opacity-80 bg-gradient-to-r from-primary from-30% to-95%% to-transparent py-28 text-white">
          <Container>
            <h1 className="mb-16 text-center text-5xl font-bold max-sm:text-4xl">
              Nossos recursos:
            </h1>
            <div className="grid grid-cols-2 place-items-center gap-14 max-[990px]:grid-cols-1 max-sm:grid-cols-1">
              {recursos.map(({ imgUrl, imgAlt, title, description }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center max-sm:flex-col max-sm:items-start max-sm:w-full max-w-lg"
                >
                  <img className="min-w-32" src={imgUrl} alt={imgAlt} />
                  <div>
                    <p className="font-bold text-2xl mb-2">{title}</p>
                    <p className="text-lg">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className=" w-full bg-secondary">
          <Container className="flex items-end gap-4 p-16 pb-0 max-[1000px]:flex-col max-sm:p-8">
            <div className="flex-1 flex justify-center items-center">
              <img
                className="max-h-max"
                src="./src/assets/man-poiting-to-sticker.png"
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 pb-14">
              <h1 className="text-center text-5xl font-bold max-sm:text-4xl">
                Conheça alguns eventos com o selo{' '}
                <strong className="text-primary">eventflow</strong>
              </h1>

              <div className="mt-4 grid grid-cols-2 max-sm:grid-cols-1 flex-wrap max-w-md mx-auto justify-center gap-4 text-center">
                {events.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className="flex max-w-56 h-40 flex-1 flex-col justify-center items-center rounded-[10px] border bg-background p-4 shadow-md "
                    >
                      <img src={event.imgUrl} alt={event.imgAlt} />
                      {event.description && <p className='drop-shadow-sm text-xl'>{event.description}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
