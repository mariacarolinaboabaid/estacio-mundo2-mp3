import { Editora } from '../modelo/Editora';

const editoras: Editora[] = [
    new Editora(1, "Editora A"),
    new Editora(2, "Editora B"),
    new Editora(3, "Editora C")
  ];
  
export default class ControleEditora {
  public static getEditoras(): Editora[] {
    return editoras;
    }

  public static getNomeEditora(codEditora: number): string {
    const editora = editoras.filter(e => e.codEditora === codEditora)[0];
    return editora ? editora.nome : '';
  }
}

