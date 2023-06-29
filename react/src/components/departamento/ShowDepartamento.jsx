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
      const response = await axios.get(baseUrl);
      setDepartamentos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartamento = async (id) => {
    try {
      await axios.delete(`${baseUrl}${id}/`);
      getDepartamentos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <Link to="/departamento/create" className="btn btn-dark">Añadir</Link>
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
                  <th>Departamento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {departamentos.map((departamento, index) => (
                  <tr key={departamento.id}>
                    <td>{index + 1}</td>
                    <td>{departamento.nombre}</td>
                    <td>
                      <Link to={`/departamento/edit/${departamento.id}`} className="btn btn-warning">Editar</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => deleteDepartamento(departamento.id)}>Eliminar</button>
                    </td>
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
