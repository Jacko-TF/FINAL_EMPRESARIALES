import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/ciclos/";

const ShowCiclo = () => {
  const [ciclos, setCiclos] = useState([]);

  useEffect(() => {
    getCiclos();
  }, []);

  const getCiclos = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCiclos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ciclo</th>
                  <th>Semestre</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {ciclos.map((ciclo, index) => (
                  <tr key={ciclo.id}>
                    <td>{index + 1}</td>
                    <td>{ciclo.nombre}</td>
                    <td>{ciclo.semestre.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCiclo;
