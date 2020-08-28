import BaseLayout from '../../components/Layout';
import { Row, Col, Radio, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import Axios from 'axios';
import styled from 'styled-components';

const TextArea = styled(Input.TextArea).attrs({
  rows: 6,
})`
  font-size: 24px;
`;

const TranslatePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [from, setFrom] = useState('auto');
  const [to, setTo] = useState('en');

  useDebounce(
    async () => {
      const text = String(input).trim();
      if (text === '') {
        return;
      }

      try {
        const { data } = await Axios.get('/api/translate', {
          params: {
            from,
            to,
            text: input,
          },
        });

        setOutput(data.result?.text);
      } catch (err) {
        console.error(err);
        message.error(String(err));
      }
    },
    600,
    [input, from, to]
  );

  return (
    <BaseLayout title="谷歌翻译" link="/tools/translate">
      <Row gutter={8}>
        <Col sm={12}>
          <Radio.Group
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="auto">自动检测</Radio.Button>
            <Radio.Button value="zh-cn">简体中文</Radio.Button>
            <Radio.Button value="en">英文</Radio.Button>
            <Radio.Button value="ja">日文</Radio.Button>
            <Radio.Button value="zh-tw">繁体中文</Radio.Button>
          </Radio.Group>
          <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
        </Col>
        <Col sm={12}>
          <Radio.Group
            value={to}
            onChange={(e) => setTo(e.target.value)}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="zh-cn">简体中文</Radio.Button>
            <Radio.Button value="en">英文</Radio.Button>
            <Radio.Button value="ja">日文</Radio.Button>
            <Radio.Button value="zh-tw">繁体中文</Radio.Button>
          </Radio.Group>
          <TextArea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            readOnly={true}
          />
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default TranslatePage;
