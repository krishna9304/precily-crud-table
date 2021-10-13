import { Button, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CellData from "../components/cellData";
import Header from "../components/header";
import { BACKEND_URL } from "../constants";
const Table = () => {
  const [data, setData] = useState({
    headers: [],
    rows: [],
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}api/v1/table/getTable`, { id })
      .then((res) => {
        if (res.data.res) {
          setData(res.data.table);
        } else {
          notification.error({
            message: "Failed",
            description: "Something went wrong!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Failed",
          description: "No such table found!",
        });
      });
    return () => {};
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (data.headers.length) {
      axios
        .post(`${BACKEND_URL}api/v1/table/update`, { data, id })
        .then((res) => {
          if (!res.data.res) {
            notification.error({
              message: "Error",
              description: "Something went wrong!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Failed",
            description: "No such table found!",
          });
        });
    }
    return () => {};
    // eslint-disable-next-line
  }, [data]);
  return data ? (
    <div className="w-screen flex flex-col items-center gap-2 px-3 py-2">
      <h1>Table id : {id}</h1>
      <table className="table-auto border">
        <thead className="border">
          <tr className="bg-gray-100">
            {data.headers.map((item, idx) => {
              return (
                <Header
                  cellID={idx}
                  setData={setData}
                  key={idx}
                  heading={item}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx1) => {
            return (
              <tr key={idx1}>
                {row.map((item, idx2) => {
                  return (
                    <CellData
                      setData={setData}
                      rowID={idx1}
                      cellID={idx2}
                      key={idx2}
                      data={item}
                    />
                  );
                })}
                <button
                  onClick={() => {
                    setData(({ rows, headers }) => {
                      rows = rows.filter((val, idx) => {
                        return idx !== idx1;
                      });
                      return {
                        headers,
                        rows,
                      };
                    });
                  }}
                  className="rounded-full text-lg font-bold text-white bg-red-500 hover:bg-red-700 w-8 h-8 m-1"
                >
                  -
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setData((prevData) => ({
              headers: [...prevData.headers, "Click to edit"],
              rows: (() => {
                let finalRows = [];
                prevData.rows.forEach((row) => {
                  finalRows.push([...row, "Enter data"]);
                });
                return finalRows;
              })(),
            }));
          }}
        >
          + Column
        </Button>
        <Button
          onClick={() => {
            setData((prevData) => ({
              ...prevData,
              rows: [
                ...prevData.rows,
                prevData.headers.map(() => {
                  return "Enter data";
                }),
              ],
            }));
          }}
        >
          + Row
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center md:text-5xl text-3xl w-screen h-screen">
      No table found
    </div>
  );
};

export default Table;
