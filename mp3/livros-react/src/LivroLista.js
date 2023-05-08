import React, { useState, useEffect } from 'react';
import ControleLivro from '../src/controle/ControleLivros';
import ControleEditora from '../src/controle/ControleEditora';

function LivroLista() {
    const [livros, setLivros] = useState(ControleLivro.obterLivros());

    const excluirLivro = (codigo) => {
        ControleLivro.excluir(codigo);
        setLivros(ControleLivro.obterLivros());
    };

    return (
        <main className="container">
            <h1>Catálogo de Livros </h1>
            <table className="table table-striped w-3/4">
                <thead className="bg-dark text-left text-white text-sm font-light">
                    <tr >
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (

                        <tr>
                            <td>{livro.titulo}
                                <button
                                    style={{ display: 'block' }} className="btn btn-danger"
                                    onClick={() => excluirLivro(livro.codigo)}>
                                    Excluir
                                </button>
                            </td>
                            <td>{livro.resumo}</td>
                            <td>{ControleEditora.getNomeEditora(livro.codEditora)}</td>
                            <td>
                                {livro.autores.map((autor, index) => (
                                    <li key={index}>{autor}</li>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>



            </table >
        </main>
    );
}

export default LivroLista;
