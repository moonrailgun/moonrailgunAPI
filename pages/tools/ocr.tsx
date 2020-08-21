import React, { useState } from 'react';
import BaseLayout from '../../components/Layout';
import { Upload, message, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getFileBase64 } from '../../utils/image-helper';
import { UploadFile } from 'antd/lib/upload/interface';

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
            onChange={async (info) => {
              if (info.fileList[0]) {
                setFileList([info.fileList[0]]); // 只显示一个
              } else {
                setFileList([]);
              }

              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);

                console.log(await getFileBase64(info.file.originFileObj!));
              }

              if (status === 'done') {
                message.success(
                  `${info.file.name} file uploaded successfully.`
                );
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <UploadInner>
              <p className="upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="upload-text">点击或拖拽文件到该区域</p>
              <p className="upload-hint">只支持上传图片格式</p>
            </UploadInner>
          </Dragger>
        </Col>

        <Col>识图结果:</Col>
      </Row>
    </BaseLayout>
  );
};

export default OcrPage;
