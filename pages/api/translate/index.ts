import { NextApiHandler } from 'next';
// import translate from 'google-translate-api';
import {
  getGoogleTranslateToken,
  setGoogleTranslateToken,
} from '../../db/models/google-translate';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { text, from, to = 'zh-cn' } = req.query;

    if (Array.isArray(text) || Array.isArray(from) || Array.isArray(to)) {
      res.status(500).send('error type!');
      return;
    }

    if (!text) {
      res.status(500).send('require text!');
      return;
    }

    const token = await getGoogleTranslateToken();
    if (token === null) {
      await setGoogleTranslateToken(new Date().valueOf());
    }

    // const result = await translate(text, { from, to });
    res.status(200).json({ result: token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export default handler;
