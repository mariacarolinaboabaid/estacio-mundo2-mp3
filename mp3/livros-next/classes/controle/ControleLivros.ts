import Livro  from "../modelo/Livro";

let livros: Livro[] = [
  { codigo: 1, codEditora: 1, titulo: "Livro 1", resumo: "Resumo do Livro 1", autores: ["Autor 1", "Autor 2"] },
  { codigo: 2, codEditora: 2, titulo: "Livro 2", resumo: "Resumo do Livro 2", autores: ["Autor 3", "Autor 4"] },
  { codigo: 3, codEditora: 1, titulo: "Livro 3", resumo: "Resumo do Livro 3", autores: ["Autor 2", "Autor 4"] },
];

export default class ControleLivro {

  public static obterLivros(): Livro[] {
    return livros;
  }

  public static incluir(livro: Livro): void {
    const codigoMaisAlto = Math.max(...livros.map((livro) => livro.codigo));
    livro.codigo = codigoMaisAlto + 1;
    livros.push(livro);
  }

  public static excluir(codigo: number): void {
    const copiaLivros = [...livros];
    const indice = copiaLivros.findIndex((livro) => livro.codigo === codigo);
    copiaLivros.splice(indice, 1);
    livros = copiaLivros;
  }
}

