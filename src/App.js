import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import BarChartData from "./chart.js/BarChartData.js";

function App() {
  const [data, setData] = useState();
  const [siteId, setSiteID] = useState();
  const [optionValue, setOptionValue] = useState(0);
  const [optionKey, setOptionKey] = useState(0);
  const [maleHousehold, setMaleHousehold] = useState(0);
  const [femaleHousehold, setFemaleHousehold] = useState(0);
  const [maleSingle, setMaleSingle] = useState(0);
  const [femaleSingle, setFemaleSingle] = useState(0);

  useEffect(() => {
    fetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((obj) => {
        const NewObj = obj.responseData.map((v) => {
          return v.site_id;
        });
        const NewSiteId = NewObj.filter((d, i) => {
          return NewObj.indexOf(d) === i;
        });

        const test2 = NewSiteId.map((v, i) => {
          return obj.responseData.filter((i) => {
            return v === i.site_id;
          });
        });

        const ordinaryFemale = test2[optionKey]
          .map((v, i) => {
            return parseInt(v.household_ordinary_f);
          })
          .reduce((a, b) => {
            return a + b;
          });
        const ordinaryMale = test2[optionKey]
        .map((v, i) => {
          return parseInt(v.household_ordinary_m);
        })
        .reduce((a, b) => {
          return a + b;
        });
        const singleMale = test2[optionKey]
        .map((v, i) => {
          return parseInt(v.household_single_m);
        })
        .reduce((a, b) => {
          return a + b;
        });
        const singleFemale = test2[optionKey]
        .map((v, i) => {
          return parseInt(v.household_single_f);
        })
        .reduce((a, b) => {
          return a + b;
        });
        setData(obj.responseData);
        setSiteID(NewSiteId);
        setMaleHousehold(ordinaryMale);
        setFemaleHousehold(ordinaryFemale);
        setMaleSingle(singleMale);
        setFemaleSingle(singleFemale);
      });
  }, [optionKey]);

  return (
    <div className="App">
      <div className="taipeiLogo">
        <img src="/taipeilogo.png" width={"80%"}></img>
        <p>106年人口戶數及調查</p>
      </div>
      <div className="chartArea">
        <label className="area">地區</label>
        <select
        className="selectArea"
          onChange={(e) => {
            setOptionValue(e.target.value);
            setOptionKey(e.target.options.selectedIndex - 1);
          }}
        >
          <option value={0}>請選擇地區</option>
          {siteId &&
            siteId.map((v, i) => {
              return (
                <option value={v} key={i}>
                  {v}
                </option>
              );
            })}
        </select>
        <div className="chartDiv" >
        <BarChartData
        className="bar-chart"
          maleHousehold={maleHousehold}
          femaleHousehold={femaleHousehold}
          maleSingle={maleSingle}
          femaleSingle={femaleSingle}
        />

        </div>
        
      </div>
    </div>
  );
}

export default App;
