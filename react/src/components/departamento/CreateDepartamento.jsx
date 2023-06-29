import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/departamentos/";

const CreateDepartamento = () => {
  const [nombre, setNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(baseUrl, { nombre });
      console.log(response.data); // Log the response for testing purposes
      navigate("/departamento"); // Redirect to home page after successful creation
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Añadir Departamento</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label>Nombre: </label>
                <input
                  type="text"
                  id="nombre"
                  maxLength="80"
                  className="form-control"
                  required={true}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <button className="btn btn-success mt-3" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartamento;
