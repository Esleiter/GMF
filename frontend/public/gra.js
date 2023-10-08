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
    type: "bar", // Tipo de gráfico (en este caso, de barras)
    data: {
      labels: data[0], // Primera fila como etiquetas del eje x
      datasets: [
        {
          label: data[1][0], // Etiqueta para el conjunto de datos
          data: data[1].slice(1), // Datos numéricos a partir de la segunda posición
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo de las barras
          borderColor: "rgba(75, 192, 192, 1)", // Color del borde de las barras
          borderWidth: 1, // Ancho del borde de las barras
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
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
