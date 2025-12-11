import ReactApexChart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import { Card, Row, Col } from "react-bootstrap";
import "./DataStreamChart.scss";
import { Activity } from "react";

interface DataPoint {
  x: number;
  y: number;
}

type DataStreamChartProps = {
  chartType: "area" | "line";
  leftTitle?: string;
  rightTitle?: string;
  leftSubtitle?: string;
  rightSubtitle?: string;
  chartData1?: DataPoint[];
  chartData2?: DataPoint[];
};

type ChartInfo = {
  curveType: "straight" | "smooth" | "stepline" | "linestep" | "monotoneCubic";
  strokeWidth: number;
  markerSize: number;
  color: string;
  color2?: string;
};

const lineChartInfo: ChartInfo = {
  curveType: "straight",
  strokeWidth: 5,
  markerSize: 2,
  color: "#165BAA",
};

const areaChartInfo: ChartInfo = {
  curveType: "smooth",
  strokeWidth: 1,
  markerSize: 0,
  color: "#0FFF00",
  color2: "#00C2FF",
};

const DataStreamChart = ({
  chartType,
  leftTitle,
  rightTitle,
  leftSubtitle,
  rightSubtitle,
  chartData1,
  chartData2,
}: DataStreamChartProps) => {
  const series: ApexAxisChartSeries = [
    {
      name: "Data Set 1 (High Range)",
      data: chartData1 || [],
    },
    {
      name: "Data Set 2 (Low Range)",
      data: chartData2 || [],
    },
  ];

  const baseChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve:
        chartType === "line"
          ? lineChartInfo.curveType
          : areaChartInfo.curveType,
      width:
        chartType === "line"
          ? lineChartInfo.strokeWidth
          : areaChartInfo.strokeWidth,
    },
    grid: {
      show: chartType === "line" ? true : false,
      borderColor: "gray",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    fill: {
      type: chartType === "line" ? "solid" : "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      tickAmount: 7,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        datetimeFormatter: { hour: "HH:mm" },
        formatter: (val) => {
          const date = new Date(val);
          return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false },
    tooltip: {
      theme: "dark",
      x: { format: "HH:mm:ss" },
      y: { formatter: (val) => val.toFixed(1) },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    markers: {
      size:
        chartType === "line"
          ? lineChartInfo.markerSize
          : areaChartInfo.markerSize,
      colors: "#63ABFD",
      strokeColors: "#63ABFD",
    },
    colors:
      chartType === "line"
        ? [lineChartInfo.color]
        : [areaChartInfo.color, areaChartInfo.color2],
  };

  function capitalizeFirstLetter(val: string | undefined | object) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <Card className="production-graph-card rounded-5 border-secondary border-2">
      <Card.Body className="d-flex flex-column">
        <Card.Header className="d-flex justify-content-between align-items-center mb-1">
          <Card.Title className="fw-bold fs-5 mb-1 ms-1">
            {leftTitle}
          </Card.Title>

          <Activity mode={rightTitle === undefined ? "hidden" : "visible"}>
            <Card.Title className="fw-bold fs-5 mb-1 ms-5">
              {rightTitle}
            </Card.Title>
          </Activity>
        </Card.Header>

        <div className="usage-section d-flex flex-column">
          <Row className="subtitle-container align-items-center justify-content-between">
            <Col xs="auto" className="d-flex align-items-center ms-3 gap-3">
              <Activity mode={chartData2 === undefined ? "hidden" : "visible"}>
                <div className="dot dot-default" />
              </Activity>
              <span className="fw-semibold fs-1">
                {leftSubtitle || "Loading..."}
              </span>
            </Col>
            <Activity mode={chartType === "line" ? "hidden" : "visible"}>
              <Col xs="auto" className="d-flex align-items-center gap-3 me-3">
                <div
                  className={`dot ${chartData2 !== undefined ? "dot-discharge-pressure" : "dot-default"}`}
                />
                <small className="right-subtitle fw-semibold fs-1">
                  {rightSubtitle || "Loading..."}
                </small>
              </Col>
            </Activity>
          </Row>
          <ReactApexChart
            options={{ ...baseChartOptions }}
            series={
              chartData2 !== undefined && chartType === "area"
                ? series
                : [
                    {
                      name: capitalizeFirstLetter(leftTitle),
                      data: chartData1 || [],
                    },
                  ]
            }
            type={chartType}
            height={150}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataStreamChart;
