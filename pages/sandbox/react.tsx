import BaseLayout from '../../components/Layout';

const SandboxReact: React.FC = () => {
  return (
    <BaseLayout title="React 沙盒" link="/sandbox/react">
      <iframe
        src="https://codesandbox.io/embed/react-playground-bo1gm?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: 4,
          overflow: 'hidden',
        }}
        title="React-Playground"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </BaseLayout>
  );
};

export default SandboxReact;
