import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const renderLink = (link: string, title: string) => {
  return (
    <Menu.Item key={link}>
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </Menu.Item>
  );
};

const BaseLayout: React.FC<{
  title: string;
  link?: string;
}> = React.memo((props) => {
  const { title, link = '/', children } = props;

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <Layout.Sider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[link]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100vh' }}
          >
            {renderLink('/', '主页')}
            <Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="工具箱">
              {renderLink('/tools/ocr', '百度识图')}
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout.Content
          style={{
            padding: '12px 24px 0',
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Power by <a href="http://moonrailgun.com">moonrailgun</a> with ❤
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </div>
  );
});

export default BaseLayout;
