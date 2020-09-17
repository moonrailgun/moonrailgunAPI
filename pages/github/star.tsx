import { Input, List } from 'antd';
import Axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import BaseLayout from '../../components/Layout';
import { isNil } from 'lodash';
import Fuse from 'fuse.js';

interface GithubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

const GithubStarList: React.FC<{ allStarItem: GithubRepoItem[] }> = (props) => {
  const [search, setSearch] = useState('');
  const fuse = useMemo(
    () =>
      new Fuse(props.allStarItem, {
        keys: [
          {
            name: 'name',
            weight: 1,
          },
          {
            name: 'full_name',
            weight: 0.7,
          },
          {
            name: 'description',
            weight: 0.5,
          },
        ],
      }),
    [props.allStarItem]
  );

  const list = useMemo(() => fuse.search(search), [search]);

  return (
    <div>
      <Input
        placeholder="输入文本以搜索 github 收藏项目"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <List
        dataSource={list.slice(0, 9)}
        renderItem={({ item }) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href={item.html_url} target="_blank">
                  {item.full_name}
                </a>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
GithubStarList.displayName = 'GithubStarList';

const GithubStarPage: React.FC = () => {
  const { value: allStarItem } = useAsync(async () => {
    const { data } = await Axios.get('/api/github/moonrailgun/stars');

    return data.repos as GithubRepoItem[];
  }, []);

  return (
    <BaseLayout title="DEV" link="/github/star">
      {isNil(allStarItem) ? (
        <div>正在获取所有的收藏...</div>
      ) : (
        <GithubStarList allStarItem={allStarItem} />
      )}
    </BaseLayout>
  );
};

export default GithubStarPage;
