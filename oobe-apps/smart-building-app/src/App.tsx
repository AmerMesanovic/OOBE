import Sidebar from "./components/Sidebar";
import AstarteAPIClient from "./api/AstarteAPIClient";
import { useEffect, useMemo, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export type AppProps = {
  astarteUrl: URL;
  realm: string;
  deviceId: string;
  token: string;
};

const App = ({ astarteUrl, realm, deviceId, token }: AppProps) => {
  const [dataFetching, setDataFetching] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("history");
  const [cameraIds, setCameraIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSectionChange = (e: string) => {
    setSelectedSection(e);
  };

  const astarteClient = useMemo(() => {
    return new AstarteAPIClient({ astarteUrl, realm, token });
  }, [astarteUrl, realm, token]);

  useEffect(() => {
    setDataFetching(true);

    astarteClient
      .getCameraIds(deviceId)
      .then((ids) => {
        setCameraIds(ids);
      })
      .catch(() => {
        setError("Failed to fetch data.");
      })
      .finally(() => {
        setDataFetching(false);
      });
  }, [astarteClient, deviceId]);

  return (
    <Row className="app-container p-4">
      <Col xs={4} xl={2} className="border-end position-relative overflow-auto">
        <Sidebar
          activeTab={selectedSection}
          onChange={handleSectionChange}
          cameraIds={cameraIds}
        />
      </Col>
      <Col xs={8} xl={10} className="px-4">
        {dataFetching ? (
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center m-3">
              <Spinner
                animation="border"
                variant="primary"
                style={{ marginRight: "10px" }}
              />
              <FormattedMessage id="loading" defaultMessage="Loading..." />
            </div>
          </div>
        ) : (
          <>
            {selectedSection === "history" ? (
              <h6>
                <FormattedMessage
                  id="historyTitle"
                  defaultMessage="All Cameras History"
                />
              </h6>
            ) : (
              <h6>
                <FormattedMessage
                  id="cameraTitle"
                  defaultMessage="{cameraId}"
                  values={{ cameraId: selectedSection }}
                />
              </h6>
            )}
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default App;
