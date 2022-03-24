import React, { useState, useEffect } from "react";
import "./App.css";

/*
{
  "2019-03-01": {
    "bytes": 4294967296,
    "maxBytes": 10737418240
  },
  "2019-04-01": {
    "bytes": 2147483648,
    "maxBytes": 10737418240
  },
  "2019-05-01": {
    "bytes": 5368709120,
    "maxBytes": 10737418240
  },
  "2019-06-01": {
    "bytes": 1288490188,
    "maxBytes": 10737418240
  }
}
 */

/*
  [Prev] 2019-03-01 [Next]
            20%
*/

function App() {
  const [response, setResponse] = useState([]);
  const [prevData, setPrevData] = useState("");
  const [index, setIndex] = useState(0);
  const [percentagee, setPercentagee] = useState(0);
  const [jsonData, setJsonData] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const onHandlePrev = () => {
    if (index != 0) {
      setPrevData(response[index - 1]);
      setIndex(index - 1);

      let percentage =
        (jsonData[response[index - 1]].bytes /
          jsonData[response[index - 1]].maxBytes) *
        100;
      setPercentagee(percentage);
    }
  };
  const onHandleNext = () => {
    if (index != response.length - 1) {
      setPrevData(response[index + 1]);
      setIndex(index + 1);

      let percentage =
        (jsonData[response[index + 1]].bytes /
          jsonData[response[index + 1]].maxBytes) *
        100;
      setPercentagee(percentage);
    }
  };
  useEffect(() => {
    fetch("https://www.mocky.io/v2/5e8db2dc310000bf90429b49")
      .then((response) => response.json())
      .then((data) => {
        let tempArr = [];
        for (let key in data) {
          tempArr.push(key);
        }
        setJsonData(data);
        setResponse(tempArr);
        setPrevData(tempArr[0]);
        setIndex(0);
        setPercentagee(
          (data[tempArr[0]].bytes / data[tempArr[0]].maxBytes) * 100
        );
      });
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {index == 0 ? (
          <button
            onClick={onHandlePrev}
            style={{
              borderRadius: "4px",
              width: "100px",
              marginRight: "20px",
            }}
            disabled
          >
            Previous
          </button>
        ) : (
          <button
            onClick={onHandlePrev}
            style={{
              borderRadius: "4px",
              width: "100px",
              marginRight: "20px",
            }}
          >
            Previous
          </button>
        )}
        <p>{prevData}</p>
        {index == response.length - 1 && index != 0 ? (
          <button
            onClick={onHandleNext}
            style={{
              borderRadius: "4px",
              width: "100px",
              marginLeft: "20px",
            }}
            disabled
          >
            Next
          </button>
        ) : (
          <button
            onClick={onHandleNext}
            style={{
              borderRadius: "4px",
              width: "100px",
              marginLeft: "20px",
            }}
          >
            Next
          </button>
        )}{" "}
      </div>
      <p style={{ display: "flex", justifyContent: "center" }}>{percentagee}</p>
    </div>
  );
}

export default App;
