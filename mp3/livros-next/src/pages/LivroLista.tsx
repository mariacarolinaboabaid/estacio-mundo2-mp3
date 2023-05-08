import Head from "next/head";
import { Menu } from "../../componentes/Menu";
import ControleEditora from '../../classes/controle/ControleEditora';
import ControleLivro from "../../classes/controle/ControleLivros";
import editoras from "./api/editoras";
import { useEffect, useState } from "react";


const baseURL = "http://localhost:3000/api/livros";

const obter = async () => {
  const resposta = await fetch(baseURL);
  return resposta.json();
};

const excluirLivro = async (codigo: number) => {
  const resposta = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });
  return resposta.ok;
};

type Livro = {
  codigo: number;
  codEditora: number
  titulo: string;
  autores: Array<string>;
  resumo: string;
};

type LinhaLivroProps = {
  livro: Livro;
  excluir: (codigo: number) => void;
};

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const editora = ControleEditora.getNomeEditora(livro.codEditora);
  return (
    <tr key={livro.codigo} >
      <td>{livro.titulo}
        <button className="block bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{editora}</td>
      <td>
        <ul style={{ listStyleType: 'disc' }}>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor.trim()}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    obter().then((dados) => {
      setLivros(dados);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: number) => {
    await excluirLivro(codigo);
    setCarregado(false);
  };

  return (
    <div className="h-screen">
      <Head>
        <title>Lista de Livros</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className="bg-white p-30 min-h-[calc(100vh-56px)]">
        <h1 className="text-4xl text-black display-2 ml-44 mb-4 pt-4 px-4">Catálago de Livros</h1>
        <div className="flex justify-center items-center">
          <table className="table table-striped w-3/4" style={{ fontSize: "14" }}>
            <thead>
              <tr className="bg-dark text-left text-white text-sm font-light">
                <th>Título</th>
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
              ))}
            </tbody>
          </table >
        </div>
      </main>
    </div>
  );
};

export default LivroLista;
