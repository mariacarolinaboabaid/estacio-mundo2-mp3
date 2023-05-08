import Head from "next/head";
import { Menu } from "../../componentes/Menu";




export default function Home() {
  return (
    <div className="bg-white p-30 min-h-screen flex-grow">
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Loja virtual em Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={`bg-white p-30 min-h-[calc(100vh-56px)]`}>
        <h1 className={`text-40 text-center m-0 display-1 text-black`}>Página Inicial</h1>
      </main>
    </div>
  );
}
