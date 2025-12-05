import { Container, Image } from "react-bootstrap";
import "./Medical.scss";
import CardComponent from "../components/CardComponent";
import { cardiology, logo, settingsEthernet, warning } from "../assets/images";
import { FormattedMessage } from "react-intl";

const Medical = () => {
  return (
    <Container fluid className="medical-container p-3">
      <Image src={logo} alt="SECO Logo" fluid className="medical-logo" />

      <div>
        <h1 className="medical-title">
          <FormattedMessage
            id="pages.general.title"
            defaultMessage="What would you like to do?"
          />
        </h1>

        <h3 className="medical-desc">
          <FormattedMessage
            id="pages.general.desc"
            defaultMessage="Choose one of the options below to get started."
          />
        </h3>
      </div>

      <div className="cards-wrapper">
        <CardComponent
          icon={cardiology}
          title={
            <FormattedMessage
              id="pages.Medical.smartClinicalRecord.title"
              defaultMessage="Smart Clinical Record"
            />
          }
          description={
            <FormattedMessage
              id="pages.Medical.smartClinicalRecord.desc"
              defaultMessage="Access patient data and request info and updates."
            />
          }
        />

        <CardComponent
          icon={warning}
          title={
            <FormattedMessage
              id="pages.general.alertManagement.title"
              defaultMessage="Alert Management"
            />
          }
          description={
            <FormattedMessage
              id="pages.general.alertManagement.desc"
              defaultMessage="View and resolve machine alerts."
            />
          }
        />

        <CardComponent
          icon={settingsEthernet}
          title={
            <FormattedMessage
              id="pages.Medical.check.title"
              defaultMessage="Sample Integrity Check"
            />
          }
          description={
            <FormattedMessage
              id="pages.Medical.check.desc"
              defaultMessage="Detect defects and verify sample integrity."
            />
          }
        />
      </div>
    </Container>
  );
};

export default Medical;
