import React, { useState, useCallback } from 'react';
import BaseLayout from '../../components/Layout';
import { Upload, message, Row, Col, Select, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getFileBase64, isPasteImage } from '../../utils/image-helper';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { usePaste } from '../../utils/hooks/usePaste';
import axios from 'axios';

const { Dragger } = Upload;

const UploadInner = styled.div`
  .upload-drag-icon {
    margin-bottom: 20px;

    .anticon {
      color: #40a9ff;
      font-size: 48px;
    }
  }

  .upload-text {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  .upload-hint {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
`;

const OcrPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [language, setLanguage] = useState('CHN_ENG');
  const [resultList, setResultList] = useState<string[]>([]);

  usePaste((e) => {
    if (e.clipboardData && e.clipboardData.items) {
      const image = isPasteImage(e.clipboardData.items);
      if (image) {
        // 上传图片
        e.preventDefault();
        const rawFile = image.getAsFile()!;
        // const uploadEl = this.$refs.upload;
        const uploadFile: UploadFile = {
          uid: Date.now().toString(),
          size: rawFile.size,
          name: rawFile.name,
          type: rawFile.type,
          originFileObj: rawFile,
          status: 'done',
        };

        setFileList([uploadFile]);
      }
    }
  });

  const handleChange = useCallback(
    async (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.fileList[0]) {
        setFileList([info.fileList[0]]); // 只显示一个
      } else {
        setFileList([]);
      }

      const { status } = info.file;

      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (fileList.length !== 1) {
      return;
    }

    const base64 = await getFileBase64(fileList[0].originFileObj!);

    const { data } = await axios.post('/api/ai/ocr', {
      language,
      imageBase64: base64,
    });

    const result = data.result.words_result.map((w: any) => w.words);

    setResultList(result);
  }, [fileList, language]);

  return (
    <BaseLayout title="百度识图" link="/tools/ocr">
      <Row gutter={8}>
        <Col sm={12}>
          <Dragger
            name="file"
            multiple={false}
            listType="picture"
            fileList={fileList}
            beforeUpload={(file) => {
              if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
              }
              return file.type === 'image/png';
            }}
            onChange={handleChange}
          >
            <UploadInner>
              <p className="upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="upload-text">点击或拖拽文件到该区域</p>
              <p className="upload-hint">只支持上传图片格式</p>
            </UploadInner>
          </Dragger>

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
                <Button type="primary" onClick={handleSubmit}>
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
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default OcrPage;
