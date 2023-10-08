function parseCSV(text) {
  // Obtenemos las lineas del texto
  let lines = text.replace(/\r/g, "").split("\n");
  return lines.map((line) => {
    // Por cada linea obtenemos los valores
    let values = line.split(",");
    return values;
  });
}

function reverseMatrix(matrix) {
  let output = [];
  // Por cada fila
  matrix.forEach((values, row) => {
    // Vemos los valores y su posicion
    values.forEach((value, col) => {
      // Si la posición aún no fue creada
      if (output[col] === undefined) output[col] = [];
      output[col][row] = value;
    });
  });
  return output;
}

function generateChart(data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data[0].slice(1), // Usamos la primera fila como etiquetas excluyendo el primer valor
      datasets: [
        {
          label: data[1][0], // Etiqueta para el conjunto de datos
          data: data[1].slice(1), // Datos numéricos a partir de la segunda posición
          backgroundColor: "rgba(231, 255, 14, 0.49)",
          borderColor: "rgba(231, 255, 14, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "white", // Configura el color del texto en el eje Y
          },
        },
        y: {
          min: 0, // Establece el valor mínimo en el eje y
          max: 9, // Establece el valor máximo en el eje y
          beginAtZero: true,
          ticks: {
            color: "white", // Configura el color del texto en el eje Y
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white", // Configura el color del texto en la leyenda
          },
        },
      },
    },
  });
}

function readFileFromFixedDirectory() {
  // Especifica la ruta de tu archivo CSV en el directorio fijo
  const filePath = "./prediction/df_predictions.csv";

  // Realiza una solicitud AJAX para cargar el archivo CSV
  fetch(filePath)
    .then((response) => response.text())
    .then((csvData) => {
      // Cuando se cargue el archivo CSV, realiza el procesamiento
      let lines = parseCSV(csvData);
      let output = reverseMatrix(lines);

      // Llama a la función para generar el gráfico con los datos procesados
      generateChart(output);
    })
    .catch((error) => {
      console.error("Error al cargar el archivo CSV:", error);
    });
}

// Llama a la función para cargar el archivo CSV desde el directorio fijo
readFileFromFixedDirectory();
