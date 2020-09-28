import React, { useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { routes, RouteItem } from '../routes';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';

const ContentMain = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const renderLink = ([link, title]: RouteItem): React.ReactElement => {
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
  const [collapsed, setCollapsed] = useLocalStorage('collapsed', false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const renderSidebar = () => {
    return (
      <Layout.Sider
        theme="light"
        width={200}
        collapsible={true}
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <Menu
          mode="inline"
          selectedKeys={[link]}
          defaultOpenKeys={Object.keys(routes)}
          style={{ height: '100vh' }}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">
              <a>主页</a>
            </Link>
          </Menu.Item>
          <Menu.SubMenu key="tools" icon={<AppstoreOutlined />} title="工具箱">
            {routes['tools'].map(renderLink)}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sandbox"
            icon={<CodeSandboxOutlined />}
            title="沙盒"
          >
            {routes['sandbox'].map(renderLink)}
          </Menu.SubMenu>
          <Menu.SubMenu key="github" icon={<GithubOutlined />} title="Github">
            {routes['github'].map(renderLink)}
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    );
  };

  const renderContent = () => {
    return (
      <Layout.Content
        style={{
          padding: '12px 24px 0',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <ContentMain>{children}</ContentMain>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Powered by <a href="http://moonrailgun.com">moonrailgun</a> with ❤
        </Layout.Footer>
      </Layout.Content>
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        {renderSidebar()}
        {renderContent()}
      </Layout>
    </div>
  );
});
BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
