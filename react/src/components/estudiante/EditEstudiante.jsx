import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/estudiantes/";

const EditEstudiante = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEstudiante();
  }, []);

  const getEstudiante = async () => {
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

      const estudiante = response.data;
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
      setFechaNacimiento(estudiante.fecha_nacimiento);
      setDireccion(estudiante.direccion);
      setDni(estudiante.dni);
      setTelefono(estudiante.telefono);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEstudiante = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Handle unauthorized access
        console.log("Unauthorized access");
        return;
      }
      
      await axios.put(
        `${baseUrl}${id}/`,
        { nombre , apellido, fecha_nacimiento , direccion, dni, telefono },
        {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }    
      );

      navigate("/estudiante"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">Editar Estudiante</div>
            <div className="card-body">
              <form onSubmit={updateEstudiante}>
                
                <label>Nombre: </label>
                <input type="text" id="nombre" name="nombre" maxLength="200" className="form-control" required={true}value={nombre}onChange={(e) => setNombre(e.target.value)} />

                <label>Apellido: </label>
                <input type="text" id="apellido" name="apellido" maxLength="200" className="form-control" required={true} value={apellido} onChange={(e) => setApellido(e.target.value)} />

                <label>Fecha de nacimiento: </label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" className="form-control" required={true} value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>

                <label>Direcccion: </label>
                <input type="text" id="direccion" name="direccion" maxLength="200" className="form-control" required={true} value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                
                <label>Dni: </label>
                <input type="text" id="dni" name="dni" maxLength="8" className="form-control" required={true} value={dni} onChange={(e) => setDni(e.target.value)}/>
                
                <label>Telefono: </label>
                <input type="text" id="telefono" name="telefono" maxLength="9" className="form-control" required={true} value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                
                <button className="btn btn-success mt-3">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEstudiante;