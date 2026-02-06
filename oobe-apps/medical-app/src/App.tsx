import { JSX, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Sidebar, { SidebarSection } from "./components/Sidebar";

export type AppProps = {
  astarteUrl: URL;
  realm: string;
  deviceId: string;
  token: string;
};

const App = ({ astarteUrl, realm, deviceId, token }: AppProps) => {
  const [dataFetching, _] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<SidebarSection>("overview");

  const handleSectionChange = (e: SidebarSection) => {
    setSelectedSection(e);
  };

  const sectionContent: Record<SidebarSection, JSX.Element> = {
    overview: (
      <div>
        <h3>
          <FormattedMessage id="overview" defaultMessage="Patient overview" />
        </h3>
      </div>
    ),
    reports: (
      <div>
        <h3>
          <FormattedMessage id="reports" defaultMessage="Medical reports" />
        </h3>
      </div>
    ),
    vitalSigns: (
      <div>
        <h3>
          <FormattedMessage id="vitalSigns" defaultMessage="Vital signs" />
        </h3>
      </div>
    ),
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center p-4">
      <Container fluid className="d-flex justify-content-center">
        <Card className="shadow-sm p-3 w-100 h-100 mw-100">
          <Row className="h-100">
            <Col
              xs={4}
              xl={2}
              className="border-end position-relative overflow-auto"
            >
              <Sidebar value={selectedSection} onChange={handleSectionChange} />
            </Col>

            <Col xs={8} xl={10} className="px-4">
              {dataFetching ? (
                <div className="text-center">
                  <div className="d-inline-flex align-items-center justify-content-center m-3">
                    <Spinner
                      animation="border"
                      variant="primary"
                      className="me-2"
                    />
                    <FormattedMessage
                      id="loading"
                      defaultMessage="Loading..."
                    />
                  </div>
                </div>
              ) : (
                sectionContent[selectedSection]
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default App;
