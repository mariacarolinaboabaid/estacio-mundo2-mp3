import  ControleLivro  from "../../../../classes/controle/ControleLivros";
import { NextApiRequest, NextApiResponse } from 'next';

export const controleLivro = new ControleLivro();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      switch (req.method) {
        case 'GET': {
          const livros = ControleLivro.obterLivros();
          res.status(200).json(livros);
          break;
        }
        case 'POST': {
          const livro = req.body;
          ControleLivro.incluir(livro);
          res.status(200).json({ message: 'Livro incluído com sucesso!' });
          break;
        }
        default: {
          res.setHeader('Allow', ['GET', 'POST']);
          res.status(405).json({ message: `Método ${req.method} não permitido` });
          break;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
}
  
  
  
  
  
  