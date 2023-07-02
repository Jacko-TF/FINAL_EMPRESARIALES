import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/estudiantes/";

const CreateEstudiante = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log("Unauthorized access");
        return;
      }

      await axios.post(baseUrl, { nombre, apellido, fecha_nacimiento:fechaNacimiento, direccion, dni, telefono}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      navigate("/estudiante");
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
            <div className="card-header bg-dark text-white">Añadir Estudiante</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <label>Nombre: </label>
                <input type="text" id="nombre" maxLength="200" className="form-control" required={true}value={nombre}onChange={(e) => setNombre(e.target.value)} />

                <label>Apellido: </label>
                <input type="text" id="apellido" maxLength="200" className="form-control" required={true} value={apellido} onChange={(e) => setApellido(e.target.value)} />

                <label>Fecha de nacimiento: </label>
                <input type="date" id="fechaNacimiento" className="form-control" required={true} value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                
                <label>Direcccion: </label>
                <input type="text" id="direccion" maxLength="200" className="form-control" required={true} value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                
                <label>Dni: </label>
                <input type="text" id="dni" maxLength="8" className="form-control" required={true} value={dni} onChange={(e) => setDni(e.target.value)}/>
                
                <label>Telefono: </label>
                <input type="text" id="telefono" maxLength="9" className="form-control" required={true} value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                
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

export default CreateEstudiante;