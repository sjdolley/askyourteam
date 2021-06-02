import React from 'react';

//const [data,setData]=useState([]);

// const getData=()=>{
//   fetch('data.json'
//   ,{
//     headers : { 
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//      }
//   }
//   )
//     .then(function(response){
//       console.log(response)
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//       setData(myJson)
//     });
// }


export default function Dashboard() {
  return(
    <div className="App dashboard-wrapper">
      <p>Dashboard/</p>
      <h2>Quiz Dashboard</h2>
      <div className="dashboard-grid">
        <div className="grid-item item1">
          <p className="grid-title">Quiz Title</p>
          <p>Status: Draft</p>
          <p className="quiz-creation-date">Created: dd/mm/yyyy</p>
        </div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
      </div>
    </div>
  );
}

      