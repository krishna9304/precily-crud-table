import { Button, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const Home = () => {
  const [tables, setTables] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/v1/table/getAll`)
      .then((res) => {
        if (res.data.res) {
          setTables(res.data.tables);
        }
      })
      .catch(console.error);
    return () => {};
  }, []);
  return tables.length ? (
    <div className="w-screen h-screen flex flex-col p-3 items-center">
      <div className="text-3xl md:text-5xl">Your Records</div>
      <div className="mt-10 gap-3 flex flex-wrap justify-center items-center">
        {tables.map((table, idx) => {
          return (
            <div key={idx} className="flex gap-2">
              <Link
                to={`/table/${table._id}`}
                className="bg-gray-100 border p-3"
              >
                {table._id}
              </Link>
              <Button
                onClick={() => {
                  axios
                    .post(`${BACKEND_URL}api/v1/table/delete`, {
                      id: table._id,
                    })
                    .then((res) => {
                      if (res.data.res) {
                        setTables((prevTables) => {
                          prevTables = prevTables.filter((table, index) => {
                            return idx !== index;
                          });
                          return prevTables;
                        });
                        notification.success({
                          message: "Success",
                          description: "Table deleted successfully",
                        });
                      }
                    })
                    .catch(console.error);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
      <div className="p-4 fixed right-3 bottom-3">
        <Button
          type="primary"
          onClick={() => {
            axios
              .post(`${BACKEND_URL}api/v1/table/create`, {
                headers: [],
                rows: [],
              })
              .then((res) => {
                if (res.data.res) {
                  notification.success({
                    message: "success",
                    description: "Table created successfully!",
                  });
                  history.push(`/table/${res.data.table._id}`);
                } else {
                  notification.error({
                    message: "Failed",
                    description: "Something went wrong!",
                  });
                }
              })
              .catch(console.error);
          }}
        >
          Create a new table
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-6xl font-extralight">Create a record</h1>
      <Button
        onClick={() => {
          axios
            .post(`${BACKEND_URL}api/v1/table/create`, {
              headers: [],
              rows: [],
            })
            .then((res) => {
              if (res.data.res) {
                notification.success({
                  message: "success",
                  description: "Table created successfully!",
                });
                history.push(`/table/${res.data.table._id}`);
              } else {
                notification.error({
                  message: "Failed",
                  description: "Something went wrong!",
                });
              }
            })
            .catch(console.error);
        }}
      >
        Create
      </Button>
    </div>
  );
};

export default Home;
