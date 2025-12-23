import { rgbPattern1, rgbPattern2 } from "../assets/images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const RGBPatternTestTool = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  const handleMediaClick = () => {
    if (currentIndex < 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/tool");
    }
  };

  return (
    <Container
      fluid
      className="bg-black vh-100 d-flex align-items-center justify-content-center p-0"
    >
      <img
        src={currentIndex == 0 ? rgbPattern1 : rgbPattern2}
        alt="icon"
        className="vh-100 vw-100"
        onClick={handleMediaClick}
      />
    </Container>
  );
};

export default RGBPatternTestTool;
