import { Container } from "@/components/shared/Container";
import { Header } from "@/components/shared/Header";
import { Link, useParams } from "react-router-dom";

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-end gap-4 pb-16 pt-8">
          <img
            className="sm:h-[388px] w-full h-[180px] rounded-md border-2 shadow-md bg-"
            src="https://even3.blob.core.windows.net/banner/CAPAPARASITE.72d02a733c034fb18316.png"
            width={160}
          />
          <div className="rounded-md border-2 bg-white p-8 shadow-md">
            <h1 className="text-center text-3xl font-semibold">
              IX Seminário Internacional de Habilidades Sociais
            </h1>
            <h3 className="text-center text-sm font-medium">
              I Congresso de Internacional de Relações Interpessoais e
              Habilidades Sociais
            </h3>
            <p className="my-3 text-xl">
              É com grande entusiasmo que anunciamos o 9º Seminário
              Internacional de Habilidades Sociais (SIHS) e o 1º Congresso
              Internacional de Relações Interpessoais e Habilidades Sociais, que
              acontecerá de 25 a 27 de setembro de 2024 na cidade de João
              Pessoa, Paraíba.
            </p>
            <h2 className="text-2xl font-semibold">Sobre o evento</h2>
            <p className="my-3 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores
              <strong> error corporis </strong>dicta ad id nam quis eveniet
              placeat obcaecati, nesciunt alias officiis quam non omnis
              explicabo recusandae officia natus illo?
            </p>
          </div>
          <Link to={`/eventos/${slug}/inscricao`} className="button-primary">
            Increva-se
          </Link>
        </main>
      </Container>
    </>
  );
}
