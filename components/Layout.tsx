import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, CodeSandboxOutlined } from '@ant-design/icons';

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
            defaultOpenKeys={['tools', 'sandbox']}
            style={{ height: '100vh' }}
          >
            {renderLink('/', '主页')}
            <Menu.SubMenu
              key="tools"
              icon={<AppstoreOutlined />}
              title="工具箱"
            >
              {renderLink('/tools/ocr', '百度识图')}
              {renderLink('/tools/translate', '谷歌翻译')}
              {renderLink('/tools/nsfw', 'NSFW')}
              {renderLink('/tools/dev', 'Dev')}
              {renderLink('/tools/jwt-decode', 'JWT解包')}
              {renderLink('/tools/other-tools', '其他实用工具')}
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sandbox"
              icon={<CodeSandboxOutlined />}
              title="沙盒"
            >
              {renderLink('/sandbox/react', 'React 沙盒')}
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
BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
