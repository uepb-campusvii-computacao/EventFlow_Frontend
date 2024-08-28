import sponsor1 from '@/assets/sponsor-1.webp';
import sponsor2 from '@/assets/sponsor-2.webp';
import sponsor3 from '@/assets/sponsor-3.webp';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';

export function Home() {
  
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <section className="flex w-full min-h-[80vh] items-center bg-accent">
          <Container className="flex gap-8 sm:gap:4 py-28 flex-col-reverse items-center sm:flex-row">
            <div className="w-full sm:w-[65%]">
              <h1 className="sm:text-7xl font-bold max-sm:text-4xl max-sm:text-center pb-4">
                Simplificando cada etapa do seu evento
              </h1>
              <p className="text-xl font-light max-md:mt-4 max-sm:text-lg">
                Bem-vindos ao eventflow. Nós somos uma startup dedicada a
                transformar a maneira como eventos acadêmicos e corporativos são
                planejados e executados.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img
                width={64}
                height={64}
                className="h-32 w-auto max-md:h-24"
                src="/logo.png"
                alt=""
              />
            </div>
          </Container>
        </section>

        <div className="flex h-24 items-center justify-around bg-purple-700">
          <img
            className="h-20 w-auto"
            src={sponsor1}
            alt=""
          />
          <img
            className="h-16 w-auto"
            src={sponsor2}
            alt=""
          />
          <img
            className="h-16 w-auto"
            src={sponsor3}
            alt=""
          />
        </div>

        <section className="min-h-dvh w-full bg-background py-8 sm:py-16">
          <Container>
            <h1 className="mb-8 text-center text-7xl font-bold max-sm:text-4xl">
              Nossos recursos
            </h1>
            <div className="grid grid-cols-3 place-items-center  gap-8 max-[990px]:grid-cols-2 max-sm:grid-cols-1 max-md:gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="flex h-[360px] w-[300px] flex-col items-center justify-center gap-2 rounded-md border-2 bg-accent p-3 shadow-md"
                >
                  <img
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <p className="text-center">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum, dolores!
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className=" w-full bg-accent ">
          <Container className="flex items-center gap-4 p-16 max-[1000px]:flex-col max-sm:p-8">
            <div className="flex-1 flex justify-center items-center">
              <img
                width={500}
                height={500}
                className="h-[250px] w-auto max-md:h-24"
                src="/vite.svg"
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="text-center text-6xl font-bold max-sm:text-4xl">
                Porque escolher o{' '}
                <strong className="text-purple-700">eventflow</strong>
              </h1>
              <p className="text-xl font-light max-md:mt-4 max-sm:text-lg">
                Bem-vindos ao eventflow! Nós somos uma startup dedicada a
                transformar a maneira como eventos acadêmicos e corporativos são
                planejados e executados.
              </p>
              <p className="text-xl font-light max-md:mt-4 max-sm:text-lg">
                Bem-vindos ao eventflow! Nós somos uma startup dedicada a
                transformar a maneira como eventos acadêmicos e corporativos são
                planejados e executados.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-center">
                <div className="flex w-48 flex-col rounded-md border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">+200</strong>
                  <span>
                    certificados <br /> gerados
                  </span>
                </div>

                <div className="flex w-48 min-h-32 items-center justify-center flex-col rounded-md border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">+1000</strong>
                  <span>Usuarios cadastrados</span>
                </div>

                <div className="flex w-48 flex-col rounded-md border bg-background p-4 shadow-md">
                  <strong className="text-5xl font-bold">+20</strong>
                  <span>Profissionais certificados</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="min-h-dvh w-full bg-background p-16 max-sm:p-8">
          <h1 className="mb-8 text-center text-7xl font-bold max-sm:mb-4 max-sm:text-5xl">
            Conheça alguns de nossos eventos
          </h1>
        </section>
      </main>
    </>
  );
}
