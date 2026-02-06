import { Nav } from "react-bootstrap";
import { defineMessages, FormattedMessage } from "react-intl";

export type SidebarSection = "overview" | "reports" | "vitalSigns";

const sidebarSectionMessages = defineMessages({
  overview: { id: "overview", defaultMessage: "Patient Overview" },
  reports: { id: "reports", defaultMessage: "Medical Reports" },
  vitalSigns: { id: "vitalSigns", defaultMessage: "Vital Signs" },
});

type SidebarProps = {
  value: SidebarSection;
  onChange: (value: SidebarSection) => void;
};

const Sidebar = ({ value, onChange }: SidebarProps) => {
  return (
    <Nav className="flex-column  ps-3">
      {(Object.keys(sidebarSectionMessages) as SidebarSection[]).map(
        (section) => {
          const active = value === section;

          return (
            <Nav.Link
              key={section}
              onClick={() => onChange(section)}
              className={[
                "px-3",
                "py-2",
                "rounded-0",
                active ? "border-start border-3 border-primary" : "",
                active ? "fw-semibold text-primary" : "text-secondary",
              ].join(" ")}
            >
              <FormattedMessage id={sidebarSectionMessages[section].id} />
            </Nav.Link>
          );
        },
      )}
    </Nav>
  );
};

export default Sidebar;
