import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CuposCicloList() {
  const [cuposCiclo, setCuposCiclo] = useState([]);

  useEffect(() => {
    getCuposCiclo();
  }, []);

  const getCuposCiclo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cupos-ciclo/');
      setCuposCiclo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <h1>Cupos por Ciclo</h1>
      <div className="row mt-3 col-12">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ciclo</th>
                  <th>Semestre</th>
                  <th>Cupos</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {cuposCiclo.map((cupo) => (
                  <tr key={cupo.id}>
                    <td>{cupo.id}</td>
                    <td>{cupo.ciclo}</td>
                    <td>{cupo.semestre}</td>
                    <td>{cupo.cupos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuposCicloList;