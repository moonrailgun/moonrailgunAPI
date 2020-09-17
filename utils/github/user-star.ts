import { Octokit } from '@octokit/rest';
import { pick } from 'lodash';
import { repoFields } from './fields';
const octokit = new Octokit();

async function getStarRepoList(username: string, page: number, per_page = 100) {
  const { data } = await octokit.activity.listReposStarredByUser({
    username: String(username),
    per_page,
    page,
  });

  return data;
}

/**
 * 获取用户所有的star
 * @param username 用户
 */
export async function getAllStarRepo(username: string) {
  const repos = [];
  const per_page = 100;
  let page = 1;

  // 最大获取页数
  while (page < 20) {
    console.log(`开始获取第 ${page} 页`);
    const list = await getStarRepoList(username, page, per_page);
    console.log(`结束获取第 ${page} 页, 获取到 ${list.length} 条数据`);
    repos.push(...list);

    if (list.length < per_page) {
      // 获取到的数量小于预计获取数量
      // 表示没有更多内容了
      break;
    }

    page++;
  }

  console.log('获取完毕');

  return repos.map((item) => pick(item, repoFields));
}
