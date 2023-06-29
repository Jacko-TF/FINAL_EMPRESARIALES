import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/departamentos/";

const EditDepartamento = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    getDepartamento();
  }, []);

  const getDepartamento = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      const response = await axios.get(`${baseUrl}${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const departamento = response.data;
      setName(departamento.nombre);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDepartamento = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}${id}/`, { nombre: name });
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Editar departamento</div>
            <div className="card-body">
              <form onSubmit={updateDepartamento}>
                <label>Nombre: </label>
                <input
                  type="text"
                  id="nombre"
                  maxLength="80"
                  className="form-control"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-success mt-3">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartamento;
