import ControleEditora from "../../../../classes/controle/ControleEditora";
import { NextApiRequest, NextApiResponse } from 'next';

export const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const editoras = await ControleEditora.getEditoras();
            res.status(200).json(editoras);
        } else {
            res.status(405).end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
