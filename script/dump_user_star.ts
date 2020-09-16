require('dotenv').config({
  // 加载mongo url
  path: require('path').resolve(__dirname, '../.env.local'),
});

import { prompt } from 'inquirer';
import { setGithubData } from '../utils/db/models/github-data';
import { getAllStarRepo } from '../utils/github/user-star';

prompt({
  type: 'input',
  name: 'username',
  message: '用户名',
}).then(async (input) => {
  const { username } = input;

  try {
    console.log(`开始获取 ${username} 的star数据`);
    const repos = await getAllStarRepo(username);
    console.log('开始写入数据...');
    await setGithubData(username, 'starrepo', repos);

    console.log(`写入数据库完毕, 共 ${repos.length} 条数据`);
  } catch (err) {
    console.error(err);
  }
});
