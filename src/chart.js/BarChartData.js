import { useEffect, useState } from "react";
import BarChart from "./BarChart";

function BarChartData(props) {
  const {
    maleHousehold,
    femaleHousehold,
    maleSingle,
    femaleSingle,
  } = props;
  const [maleData, setMaleData] = useState();
  const [femaleData, setFemaleData] = useState();

  useEffect(() => {
    const dataMale = {
      label: "男",
      data: [maleHousehold, maleSingle],
      fill: true,
      backgroundColor: `rgba(85, 66, 54, 0.7)`,
      borderColor: `rgba(85, 66, 54, 0.7)`,
      pointBackgroundColor: `rgba(85, 66, 54, 0.7)`,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: `rgba(85, 66, 54, 0.7)`,
    };
    const dataFemale = {
      label: "女",
      data: [femaleHousehold, femaleSingle],
      fill: true,
      backgroundColor: `rgba(181, 73, 91, 0.4)`,
      borderColor: `rgba(181, 73, 91, 0.4)`,
      pointBackgroundColor: `rgba(181, 73, 91, 0.4)`,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: `rgba(181, 73, 91, 0.4)`,
    };
    setMaleData(dataMale);
    setFemaleData(dataFemale);
  }, [maleSingle]);

  const [chartData, setChartData] = useState({
    labels: ["共同生活戶", "獨立生活戶"],
    datasets: [maleData, femaleData],
  });
  useEffect(() => {
    setChartData({
      labels: ["共同生活戶", "獨立生活戶"],
      datasets: maleData&&femaleData&&[maleData, femaleData],
    });
  }, [maleSingle]);

  

  return <BarChart chartData={chartData} />;
}

export default BarChartData;
