type EmbeddedAppProps = {
  url: string;
};

const EmbeddedApp = ({ url }: EmbeddedAppProps) => {
  return (
    <div className="hub-main">
      <iframe src={url} title="SECO Application Hub"></iframe>
    </div>
  );
};

export default EmbeddedApp;
