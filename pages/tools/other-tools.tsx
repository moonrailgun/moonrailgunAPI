import React from 'react';
import BaseLayout from '../../components/Layout';
import { Button } from 'antd';

const OtherToolPage: React.FC = () => {
  const list = [
    {
      name: 'Nginx Config',
      url: 'https://www.digitalocean.com/community/tools/nginx',
    },
    {
      name: '网站SSL测试',
      url: 'https://www.ssllabs.com/ssltest/index.html',
    },
  ];

  return (
    <BaseLayout title="其他工具" link="/tools/other-tools">
      {list.map((item) => (
        <div key={`${item.name}#${item.url}`}>
          <Button type="link" onClick={() => window.open(item.url)}>
            {item.name}
          </Button>
        </div>
      ))}
    </BaseLayout>
  );
};

export default OtherToolPage;
