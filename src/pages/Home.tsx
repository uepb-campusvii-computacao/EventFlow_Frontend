import { Header } from "@/components/shared/Header";

export function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <section className="flex min-h-[calc(100dvh-10rem)] w-full items-center gap-4 p-16 max-md:flex-col-reverse max-sm:p-8 bg-accent">
          <div className="flex-1">
            <h1 className="text-7xl font-bold max-sm:text-5xl">
              Simplificando cada etapa do seu evento
            </h1>
            <p className="text-xl font-light max-md:mt-4 max-sm:text-lg">
              Bem-vindos ao eventflow! Nós somos uma startup dedicada a
              transformar a maneira como eventos acadêmicos e corporativos são
              planejados e executados.
            </p>
          </div>
          <div className="flex-1">
            <img
              width={64}
              height={64}
              className="h-32 w-auto max-md:h-24"
              src="/vite.svg"
              alt=""
            />
          </div>
        </section>

        <div className="flex h-24 items-center justify-around bg-purple-400">
          <img
            width={64}
            height={64}
            className="h-12 w-auto"
            src="/vite.svg"
            alt=""
          />
          <img
            width={64}
            height={64}
            className="h-12 w-auto"
            src="/vite.svg"
            alt=""
          />
          <img
            width={64}
            height={64}
            className="h-12 w-auto"
            src="/vite.svg"
            alt=""
          />
        </div>

        <section className="min-h-dvh w-full bg-background p-16 max-sm:p-8">
          <h1 className="mb-8 text-center text-7xl font-bold max-sm:mb-4 max-sm:text-5xl">
            Nossos recursos
          </h1>
          <div className="grid w-full grid-cols-3 place-items-center gap-8 max-md:grid-cols-1 max-md:gap-4">
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
        </section>

        <section className="flex w-full items-center gap-4 bg-accent p-16 max-md:flex-col-reverse max-sm:p-8">
          <div className="flex-1">
            <img
              width={64}
              height={64}
              className="h-32 w-auto max-md:h-24"
              src="/vite.svg"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-center text-6xl font-bold max-sm:text-4xl">
              Porque escolher o{" "}
              <strong className="text-purple-400">eventflow</strong>
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
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <div className="flex w-48 flex-col rounded-md border bg-background p-4 shadow-md">
                <strong className="text-5xl font-bold">+200</strong>
                <span>
                  certificados <br /> gerados
                </span>
              </div>

              <div className="flex w-48 flex-col rounded-md border bg-background p-4 shadow-md">
                <strong className="text-5xl font-bold">+1000</strong>
                <span>Usuarios cadastrados</span>
              </div>

              <div className="flex w-48 flex-col rounded-md border bg-background p-4 shadow-md">
                <strong className="text-5xl font-bold">+20</strong>
                <span>Profissionais certificados</span>
              </div>
            </div>
          </div>
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