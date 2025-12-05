import { Container, Image } from "react-bootstrap";
import "./IndustrialAutomation.scss";
import CardComponent from "../components/CardComponent";
import { logo, settingsEthernet, warehouse, warning } from "../assets/images";
import { FormattedMessage } from "react-intl";

const IndustrialAutomation = () => {
  return (
    <Container fluid className="industrial-container p-3">
      <Image src={logo} alt="SECO Logo" fluid className="industrial-logo" />

      <div>
        <h1 className="industrial-title">
          <FormattedMessage
            id="pages.general.title"
            defaultMessage="What would you like to do?"
          />
        </h1>

        <h3 className="industrial-desc">
          <FormattedMessage
            id="pages.general.desc"
            defaultMessage="Choose one of the options below to get started."
          />
        </h3>
      </div>

      <div className="cards-wrapper">
        <CardComponent
          icon={warehouse}
          title={
            <FormattedMessage
              id="pages.IndustrialAutomation.plant.title"
              defaultMessage="Plant Management"
            />
          }
          description={
            <FormattedMessage
              id="pages.IndustrialAutomation.plant.desc"
              defaultMessage="Get reports and insights as the plant manager."
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
              id="pages.IndustrialAutomation.qualityInspection.title"
              defaultMessage="Quality Inspection"
            />
          }
          description={
            <FormattedMessage
              id="pages.IndustrialAutomation.qualityInspection.desc"
              defaultMessage="Inspect objects and analyze their faults and conformity."
            />
          }
        />
      </div>
    </Container>
  );
};

export default IndustrialAutomation;
