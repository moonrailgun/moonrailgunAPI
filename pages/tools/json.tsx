import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BaseLayout from '../../components/Layout';
import { Button, Col, Input, Row, Space, Tooltip } from 'antd';
import dynamic from 'next/dynamic';
import { SnippetsOutlined, MergeCellsOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function useCachedJSON() {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(localStorage.getItem('tools/json/data') ?? '');
  }, []);

  useEffect(() => {
    localStorage.setItem('tools/json/data', text);
  }, [text]);

  const object = useMemo(() => {
    try {
      return JSON.parse(text ?? '');
    } catch (e) {
      return { error: String(e) };
    }
  }, [text]);

  return { text, setText, object };
}

const JSONPage: React.FC = () => {
  const { text, setText, object } = useCachedJSON();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleFormat = useCallback(() => {
    try {
      setText(JSON.stringify(JSON.parse(text ?? ''), null, 4));
    } catch (e) {}
  }, [text]);

  const handleCompact = useCallback(() => {
    try {
      setText(JSON.stringify(JSON.parse(text ?? '')));
    } catch (e) {}
  }, [text]);

  return (
    <BaseLayout title="JSON解析" link="/tools/json">
      <Container>
        <Row style={{ marginBottom: 8 }}>
          <Space>
            <Tooltip title="格式化">
              <Button icon={<SnippetsOutlined />} onClick={handleFormat} />
            </Tooltip>
            <Tooltip title="压缩">
              <Button icon={<MergeCellsOutlined />} onClick={handleCompact} />
            </Tooltip>
          </Space>
        </Row>
        <Row gutter={8} style={{ overflow: 'auto', flex: 1 }}>
          <Col sm={12}>
            <Input.TextArea
              key="input"
              style={{ height: '100%' }}
              value={text}
              onChange={handleChange}
            />
          </Col>
          <Col sm={12} style={{ height: '100%' }}>
            <ReactJson
              style={{ maxHeight: '100%', overflow: 'auto' }}
              name={false}
              displayDataTypes={false}
              src={object}
            />
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default JSONPage;
