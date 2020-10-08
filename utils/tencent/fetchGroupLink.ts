import got from 'got/dist/source';
import _ from 'lodash';

/**
 * http://www.oicqzone.com/pc/2019033024507.html
 *
 * 获取qq群加群链接
 * @param num qq群号
 */
export async function fetchGroupLink(num: number) {
  const t = new Date().valueOf();
  const url = `http://wp.qq.com/wpa/g_wpa_get?guin=${num}&t=${t}`;
  const { body } = await got.get(url, {
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
      Referer: url,
    },
  });

  const data = JSON.parse(body);

  if (data.retcode !== 0) {
    throw new Error(body);
  }

  const key = _.get(data, 'result.data.0.key');

  return `http://wp.qq.com/wpa/qunwpa?idkey=${key}`;
}
