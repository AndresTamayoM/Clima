import React, { Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from'./components/Clima';
import Error from'./components/Error';
function App() {

  //state del formulario 
  const [ busqueda, guardarBusquda ] = useState({
      ciudad: '',
      pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [ resultado, guardarResultado] = useState({});
  const [ error, guardarError ] = useState(false);
  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consutlarAPI = async () => {

      if(consultar) {
        const appId = '270fb1e5ab7c0489e5fe70568c0b6a11';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //detecta si hubo resultados correctos en la consulta
        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
      
    }
    consutlarAPI();
    //eslint-disable-next-line
  },[consultar]);
  //deshabilita una dependencia, conciente que tienes una variable que sabes que es importante para nla consulta

  let componente; //lo podemos reasignar
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado ={resultado}
                />
  }


  return (
   <Fragment>
      <Header 
        titulo='Clima React App'
      />
      <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                  <Formulario 
                    busqueda={busqueda}
                    guardarBusquda={guardarBusquda}
                    guardarConsultar={guardarConsultar}
                  />
              </div>
              <div className="col m6 s12">
                  {componente}
              </div>
            </div>
          </div>
      </div>
   </Fragment>
  );
}

export default App;
