import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';


const socket = io('wss://le-18262636.bitzonte.com', {
  path: '/stocks'
});

//Funcion para cerrar y abrir conexion al socket 
function cerrar_conexion() {
  if (socket.connected){
    console.log('Desactivando conexion');
    socket.close();
  }
  else{
    console.log('Activando conexion');
    socket.connect();
  }
};

//Definir una funcion para que cree graficos dependiendo de la info del stock

//Pensar en como distribuir los datos que me llegan. 

function App() {

  const [data, setData] = useState([]); 
  // Listen de event and update the state
  useEffect(()=> {
    socket.on('UPDATE', data => {
      setData(currentdata => [...currentdata, data]);
      console.log(data.ticker);
    });
    
  },  []);
}


  return (
   <div>
     
     <h1>Me rendí uwu</h1>
     <button onClick = {cerrar_conexion}> Server Conectado </button>
     <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
     
   </div>
  )

export default App;
