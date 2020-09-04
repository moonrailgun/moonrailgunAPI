import React, { useState, useCallback, useMemo } from 'react';
import BaseLayout from '../../components/Layout';
import jwtDecode from 'jwt-decode';
import { Input, Row, Col } from 'antd';
const { TextArea } = Input;

const JWTDecodePage: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const result = useMemo(() => {
    try {
      return jwtDecode(value);
    } catch (e) {
      return '';
    }
  }, [value]);

  return (
    <BaseLayout title="JWT解包" link="/tools/jwt-decode">
      <Row>
        <Col sm={16}>
          <TextArea rows={6} value={value} onChange={handleChange} />
          <pre>{JSON.stringify(result)}</pre>
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default JWTDecodePage;
