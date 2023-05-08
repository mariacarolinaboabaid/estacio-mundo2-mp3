import { NextApiRequest, NextApiResponse } from "next";
import { controleEditora } from "./index";
import ControleEditora from "../../../../classes/controle/ControleEditora";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const codEditora = Number(req.query.codEditora);
      const nomeEditora = ControleEditora.getNomeEditora(codEditora);
      res.status(200).json({ nome: nomeEditora });
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter nome da editora." });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
};

