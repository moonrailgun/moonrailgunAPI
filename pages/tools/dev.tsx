import React, { useEffect, useState, useRef } from 'react';
import BaseLayout from '../../components/Layout';

const packages: { [packageName: string]: any } = {
  lodash: import('lodash'),
  moment: import('moment'),
  slate: import('slate'),
};

Object.entries(packages).forEach(([name, promise]) => {
  promise.then((module) => {
    (window as any)[name] = module;
  });
});

const DevPage: React.FC = () => {
  return (
    <BaseLayout title="DEV" link="/tools/dev">
      <p>使用方式: 打开控制台在window全局变量下找到想要调试的包</p>
      <p>目前可用于调试的包:</p>

      <ul>
        {Object.keys(packages).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default DevPage;
