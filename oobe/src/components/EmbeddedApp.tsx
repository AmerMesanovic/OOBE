type EmbeddedAppProps = {
  url: string;
  title?: string;
};

const EmbeddedApp = ({ url, title }: EmbeddedAppProps) => {
  return (
    <div className="h-100 overflow-hidden">
      <iframe src={url} title={title} className="h-100 w-100"></iframe>
    </div>
  );
};

export default EmbeddedApp;
