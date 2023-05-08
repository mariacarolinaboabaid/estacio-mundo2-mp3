import { NextApiRequest, NextApiResponse } from 'next';
import  ControleLivro  from "../../../../classes/controle/ControleLivros";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Método ${req.method} não permitido` });
    return;
  }

  try {
    const codigo = Number(req.query.codLivro);
    ControleLivro.excluir(codigo);
    res.status(200).json({ message: 'Livro excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao excluir o livro.' });
  }
};
