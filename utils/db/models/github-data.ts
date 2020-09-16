import mongoose, { Schema } from 'mongoose';
import '../index';
import { get } from 'lodash';

const githubDataSchema = new Schema({
  username: String,
  type: String,
  data: Schema.Types.Mixed,
  updatedAt: Date,
});

const GithubData =
  mongoose.models['github_data'] ||
  mongoose.model('github_data', githubDataSchema);

export async function getGithubData(
  username: string,
  type: string
): Promise<{
  username: string | null;
  type: string | null;
  data: any;
  updatedAt: Date | null;
}> {
  const data = await GithubData.findOne({ username, type });

  return {
    username: get(data, 'username', null),
    type: get(data, 'type', null),
    data: get(data, 'data', null),
    updatedAt: get(data, 'updatedAt', null),
  };
}

/**
 * 设置抓取的github数据到数据库
 * @param username 用户名
 * @param type 数据类型
 * @param data 数据内容
 */
export async function setGithubData(username: string, type: string, data: any) {
  await GithubData.updateOne(
    {
      username,
      type,
    },
    {
      data,
      updatedAt: new Date(),
    },
    {
      upsert: true,
    }
  );
}
