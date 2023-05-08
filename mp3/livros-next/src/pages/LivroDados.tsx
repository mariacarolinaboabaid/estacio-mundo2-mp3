import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../../componentes/Menu';
import ControleEditora from '../../classes/controle/ControleEditora';
import Livro from '../../classes/modelo/Livro';
import Router from 'next/router';

export default function LivroDados() {
    const controleEditora: ControleEditora = new ControleEditora();
    const baseURL: string = "http://localhost:3000/api/livros";

    const [titulo, setTitulo] = useState<string>("");
    const [resumo, setResumo] = useState<string>("");
    const [autores, setAutores] = useState<string>("");
    const [codEditora, setCodEditora] = useState<number>(0);

    const opcoes = ControleEditora.getEditoras().map(editora => {
        return {
            value: editora.codEditora.toString(),
            text: editora.nome
        }
    });

    const navigate = useRouter();

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    }

    const incluirLivro = async (livro: Livro): Promise<boolean> => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });
        const data = await response.json();
        return response.ok;
    }

    const incluir = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro: Livro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora
        };
        incluirLivro(livro).then(success => {
            if (success) {
                Router.push('/LivroLista');
            } else {
                alert('Não foi possível incluir o livro!');
            }
        });
    }

    return (
        <div className="h-screen">
            <Head>
                <title>Livros | Dados</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className="bg-white p-30 min-h-[calc(100vh-56px)]">
                <h1 className="text-4xl text-black display-2 ml-44 mb-4 pt-4 px-4">
                    Dados do Livro
                </h1>
                <div className='flex flex-col justify-center items-center'>

                    <form onSubmit={incluir} className=" w-[79%] bg-white rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="titulo">
                                Título
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="titulo" type="text" value={titulo} onChange={(event) => setTitulo(event.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="resumo">
                                Resumo
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="resumo" value={resumo} onChange={(event) => setResumo(event.target.value)}></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="codEditora">
                                Editora
                            </label>
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="codEditora" value={codEditora} onChange={tratarCombo}>
                                {opcoes.map((opcao, index) => (
                                    <option key={index} value={opcao.value}>{opcao.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="autores">
                                Autores (1 por linha)
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="autores" value={autores} onChange={(event) => setAutores(event.target.value)}></textarea>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                               Salvar Dados
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}