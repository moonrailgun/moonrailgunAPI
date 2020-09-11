import React, { useState, useCallback } from 'react';
import BaseLayout from '../../components/Layout';
import { Row, Col, Select, Button } from 'antd';
import { getFileBase64 } from '../../utils/image-helper';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import { ImageUploader } from '../../components/ImageUploader';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import { useAsync } from 'react-use';
import Axios from 'axios';

const OcrPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [language, setLanguage] = useState('CHN_ENG');
  const [resultList, setResultList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (fileList.length !== 1) {
      return;
    }

    setLoading(true);
    const base64 = await getFileBase64(fileList[0].originFileObj!);

    const { data } = await axios.post('/api/ai/ocr', {
      language,
      imageBase64: base64,
    });

    const result = data.result.words_result.map((w: any) => w.words);
    setResultList(result);

    setLoading(false);
  }, [fileList, language]);

  useAsync(async () => {
    setTranslate(null);
    if (language !== 'CHN_ENG' && resultList) {
      const { data } = await Axios.get('/api/translate', {
        params: {
          from: 'auto',
          to: 'zh-cn',
          text: resultList.join('\n'),
        },
      });

      setTranslate(data.result?.text);
    }
  }, [resultList, language]);

  return (
    <BaseLayout title="百度识图" link="/tools/ocr">
      <Row gutter={8}>
        <Col sm={12}>
          <ImageUploader fileList={fileList} onChange={setFileList} />

          {fileList.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Row>
                <Col sm={6}>
                  <p>识别语言:</p>
                </Col>

                <Col>
                  <Select value={language} onChange={(val) => setLanguage(val)}>
                    <Select.Option value="CHN_ENG">中英文混合</Select.Option>
                    <Select.Option value="ENG">英文</Select.Option>
                    <Select.Option value="POR">葡萄牙语</Select.Option>
                    <Select.Option value="FRE">法语</Select.Option>
                    <Select.Option value="GER">德语</Select.Option>
                    <Select.Option value="ITA">意大利语</Select.Option>
                    <Select.Option value="SPA">西班牙语</Select.Option>
                    <Select.Option value="RUS">俄语</Select.Option>
                    <Select.Option value="JAP">日语</Select.Option>
                    <Select.Option value="KOR">韩语</Select.Option>
                  </Select>
                </Col>
              </Row>

              <Row>
                <Button type="primary" loading={loading} onClick={handleSubmit}>
                  文本识别
                </Button>
              </Row>
            </div>
          )}
        </Col>

        <Col>
          <div>识图结果:</div>
          <div>
            {resultList.map((item, i) => (
              <div key={i}>{String(item)}</div>
            ))}
          </div>

          {_isString(translate) && (
            <>
              <div>自动翻译:</div>
              <div>{translate}</div>
            </>
          )}
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default OcrPage;
