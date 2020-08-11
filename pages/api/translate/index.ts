import { NextApiHandler } from 'next';
import translate from 'google-translate-api';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { text, from, to = 'zh-cn' } = req.query;

    if (Array.isArray(text) || Array.isArray(from) || Array.isArray(to)) {
      return res.status(500).send('error type!');
    }

    if (!text) {
      return res.status(500).send('require text!');
    }

    const result = await translate(text, { from, to });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export default handler;
