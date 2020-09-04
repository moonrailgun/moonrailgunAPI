import React, { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as nsfwjs from 'nsfwjs';
import BaseLayout from '../../components/Layout';
import { Row, Col } from 'antd';
tf.enableProdMode();

interface NSFWPredictions {
  className: string;
  probability: number;
}

const NSFWPage: React.FC = () => {
  const [predictions, setPredictions] = useState<NSFWPredictions[] | null>(
    null
  );
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load the model.
    nsfwjs.load('/nsfw/quant_nsfw_mobilenet/').then((model) => {
      if (!imgRef.current) {
        return;
      }

      // Classify the image.
      model.classify(imgRef.current).then((p) => {
        setPredictions(p);
      });
    });
  }, [imgRef.current]);

  return (
    <BaseLayout title="NSFW" link="/tools/nsfw">
      <Row>
        <Col sm={16}>
          <div>
            <img
              ref={imgRef}
              src="https://i.imgur.com/Kwxetau.jpg"
              crossOrigin="anonymous"
              style={{
                maxWidth: '100%',
                maxHeight: 400,
              }}
            />
          </div>
          {predictions ? (
            JSON.stringify(predictions, null, 4)
          ) : (
            <div>正在处理中...</div>
          )}
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default NSFWPage;
