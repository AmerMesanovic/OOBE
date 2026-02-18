import AstarteAPIClient from "./api/AstarteAPIClient";
import { useEffect, useMemo, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import HistoryCameraTable from "./components/CameraHistroyTable";
import { CameraHistoryData } from "types";

export type AppProps = {
  astarteUrl: URL;
  realm: string;
  deviceId: string;
  token: string;
};

const App = ({ astarteUrl, realm, deviceId, token }: AppProps) => {
  const [dataFetching, setDataFetching] = useState(false);
  const [_cameraIds, setCameraIds] = useState<string[]>([]);
  const [historyData, setHistoryData] = useState<CameraHistoryData[]>([]);

  const astarteClient = useMemo(() => {
    return new AstarteAPIClient({ astarteUrl, realm, token });
  }, [astarteUrl, realm, token]);

  useEffect(() => {
    setDataFetching(true);

    astarteClient
      .getCameraIds(deviceId)
      .then((ids) => {
        setCameraIds(ids);

        return Promise.all(
          ids.map((cameraId) =>
            astarteClient.getCameraHistory({ deviceId, cameraId }),
          ),
        ).then((results) => {
          const combined: CameraHistoryData[] = results
            .flat()
            .sort(
              (a, b) =>
                new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
            );

          setHistoryData(combined);
        });
      })
      .catch(() => {
        [];
      })
      .finally(() => {
        setDataFetching(false);
      });
  }, [astarteClient, deviceId]);

  return (
    <Row className="app-container p-4">
      <Col className="px-4">
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
            <h5>
              <FormattedMessage id="appTitle" defaultMessage="People counter" />
            </h5>
            <HistoryCameraTable data={historyData} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default App;
