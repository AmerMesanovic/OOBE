import { Container, Image } from "react-bootstrap";
import "./SmartBuilding.scss";
import CardComponent from "../components/CardComponent";
import { falling, interactiveSpace, logo, warning } from "../assets/images";
import { FormattedMessage } from "react-intl";

const SmartBuilding = () => {
  return (
    <Container fluid className="smartBuilding-container p-3">
      <Image src={logo} alt="SECO Logo" fluid className="smartBuilding-logo" />

      <div>
        <h1 className="smartBuilding-title">
          <FormattedMessage
            id="pages.general.title"
            defaultMessage="What would you like to do?"
          />
        </h1>

        <h3 className="smartBuilding-desc">
          <FormattedMessage
            id="pages.general.desc"
            defaultMessage="Choose one of the options below to get started."
          />
        </h3>
      </div>

      <div className="cards-wrapper">
        <CardComponent
          icon={interactiveSpace}
          title={
            <FormattedMessage
              id="pages.SmartBuilding.smartLobby.title"
              defaultMessage="Smart Lobby"
            />
          }
          description={
            <FormattedMessage
              id="pages.SmartBuilding.smartLobby.desc"
              defaultMessage="Recognize residents and access condo info."
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
          icon={falling}
          title={
            <FormattedMessage
              id="pages.SmartBuilding.detection.title"
              defaultMessage="Crowd and fall detection"
            />
          }
          description={
            <FormattedMessage
              id="pages.SmartBuilding.detection.desc"
              defaultMessage="Count people and detect falls in common areas."
            />
          }
        />
      </div>
    </Container>
  );
};

export default SmartBuilding;
