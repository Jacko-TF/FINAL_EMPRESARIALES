import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/departamentos/";

const ShowDepartamento = () => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    getDepartamentos();
  }, []);

  const getDepartamentos = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Handle unauthorized access
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setDepartamentos(response.data);
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
                  <th>Departamento</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {departamentos.map((departamento, index) => (
                  <tr key={departamento.id}>
                    <td>{index + 1}</td>
                    <td>{departamento.nombre}</td>
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

export default ShowDepartamento;
