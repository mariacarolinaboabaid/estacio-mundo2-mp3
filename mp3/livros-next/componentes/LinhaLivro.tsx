import Livro from '../classes/modelo/Livro';
import ControleEditora from '../classes/controle/ControleEditora';

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const editora = ControleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => excluir()}>
          Excluir
        </button>
      </td>
      <td>{livro.resumo}</td>
      <td>{editora}</td>
      <td>{livro.autores}</td>
    </tr>
  );
};

export default LinhaLivro;
