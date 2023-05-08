import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';
import Livro from './modelo/Livro';


function LivroDados() {

    const opcoes = ControleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);
    const navigate = useNavigate();

    function tratarCombo(event) {
        setCodEditora(Number(event.target.value));
      }
    
      function incluir(event) {
        event.preventDefault();
        const autoresArray = autores.split("\n").filter((autor) => autor.trim() !== '');
        const livro = new Livro(0, codEditora, titulo, resumo, autoresArray );
        ControleLivro.incluir(livro);
        navigate("/");
      }
    
      return (
        <main>
          <h1>Dados do Livro</h1>
          <form onSubmit={incluir}>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resumo">Resumo</label>
              <textarea
                className="form-control"
                id="resumo"
                rows="3"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="autores">Autores (um por linha)</label>
              <textarea
                className="form-control"
                id="autores"
                rows="3"
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="editora">Editora</label>
              <select
                className="form-control"
                id="editora"
                value={codEditora}
                onChange={tratarCombo}
              >
                {opcoes.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.text}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "30px"}}>
              Incluir
            </button>
          </form>
        </main>
      );
}

export default LivroDados;
