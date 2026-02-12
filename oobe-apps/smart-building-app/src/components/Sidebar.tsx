import { Nav } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

type SidebarProps = {
  activeTab: string;
  onChange: (value: string) => void;
  cameraIds: string[];
};

const Sidebar = ({ activeTab, onChange, cameraIds }: SidebarProps) => {
  return (
    <Nav className="flex-column ps-3">
      <Nav.Link
        onClick={() => onChange("history")}
        className={[
          "px-3",
          "py-2",
          "rounded-0",
          activeTab === "history"
            ? "border-start border-3 border-primary fw-semibold text-primary"
            : "text-secondary",
        ].join(" ")}
      >
        <FormattedMessage id="history" defaultMessage="History" />
      </Nav.Link>

      {cameraIds.map((cameraId) => {
        const active = activeTab === cameraId;

        return (
          <Nav.Link
            key={cameraId}
            onClick={() => onChange(cameraId)}
            className={[
              "px-3",
              "py-2",
              "rounded-0",
              active
                ? "border-start border-3 border-primary fw-semibold text-primary"
                : "text-secondary",
            ].join(" ")}
          >
            <FormattedMessage
              id="camera"
              defaultMessage="Camera ({cameraId})"
              values={{ cameraId }}
            />
          </Nav.Link>
        );
      })}
    </Nav>
  );
};

export default Sidebar;
