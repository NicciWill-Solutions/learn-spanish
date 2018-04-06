import React from 'react';

class Chart extends React.Component {

    componentDidMount() {
        var chart = new CanvasJS.Chart("chartContainer", {
            title:{
                text:"Chart Your Progress"
            },
            animationEnabled: true,
           
            data: [
            {     
                type: "doughnut",
                dataPoints: [
                  {y: 10, label: "Cerveza"  },
                  {y: 10, label: "Izquierda"  },
                  {y: 10, label: "Esquina"  },
                  {y: 10, label: "Buenos dias"  },
                  {y: 10, label: "Buenas noches"  },
                  {y: 10, label: "Gracias"  },
                  {y: 10, label: "Hola"  },
                  {y: 10, label: "Derecha"  },
                  {y: 10, label: "Ensalada"  },
                  {y: 10, label: "Bebida"  }
                ]
            }

            ]
        });
    chart.render();
  }
  render() {
    return (
      <div id="chartContainer" style={{height: 450 + "px", width: 100 + "%"}}>
      </div>
    );
  }

}

export default Chart;