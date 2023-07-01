import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/carreras/"; 

const ShowCarreras = () => {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    getCarreras();
  }, []);

  const getCarreras = async () => {
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

      setCarreras(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Carrera</th>
                  <th>Departamento</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {carreras.map((carrera, index) => (
                  <tr key={carrera.id}>
                    <td>{index + 1}</td>
                    <td>{carrera.nombre}</td>
                    <td>{carrera.departamento.nombre}</td>
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

export default ShowCarreras;
