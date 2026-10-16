"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var encabezados;
var filas;
var reporte;
document.getElementById("archivo").addEventListener('change', function (e) {
  var archivo = e.target.files[0];
  if (!archivo) return;
  var lector = new FileReader();

  lector.onload = function (evento) {
    var contenido = evento.target.result;
    var resultado = Papa.parse(contenido, {
      header: true,
      skipEmptyLines: true
    });
    encabezados = resultado.meta.fields;
    var opciones = encabezados.map(function (c) {
      return "<option>" + c + "</option>";
    }).join("");
    document.getElementById("selColumna").innerHTML = opciones;
    filas = resultado.data;
    mostrarTabla(filas);
    console.log(resultado);
    console.log("Encabezados:");
    console.log(encabezados);
    console.log("Filas:");
    console.log(filas);
  };

  lector.readAsText(archivo, "ISO-8859-1");
});

function mostrarTabla(datos) {
  if (datos.length === 0) {
    document.getElementById("tabla").innerHTML = "<p>No se encontraron resultados :(</p>";
    return;
  }

  var filasVisibles = datos.slice(0, 10);
  var aviso = "<p>Mostrando " + filasVisibles.length + " Filas de " + datos.length + "</p>";
  var encabezado = "<tr>" + encabezados.map(function (c) {
    return "<th>" + c + "</th>";
  }).join("") + "</tr>";
  var cuerpo = filasVisibles.map(function (f) {
    return "<tr>" + encabezados.map(function (c) {
      return "<td>" + f[c] + "</td>";
    }).join("") + "</tr>";
  }).join("");
  var html = aviso + "<table>" + encabezado + cuerpo + "</table>";
  document.getElementById("tabla").innerHTML = html;
}

var boton = document.getElementById("btnFiltrar");
var texto = document.getElementById("textoFiltro");
boton.addEventListener('click', function () {
  console.log(texto.value);
  var buscando = texto.value.toLowerCase();
  var encontrados = filas.filter(function (p) {
    return Object.values(p).some(function (valor) {
      return valor.toLowerCase().includes(buscando);
    });
  });
  mostrarTabla(encontrados);
  console.log(encontrados.length);
});
var calcular = document.getElementById("calcular");
var columna = document.getElementById("selColumna");
calcular.addEventListener('click', function () {
  var valores = filas.map(function (p) {
    return p[columna.value];
  });
  console.log(columna.value);
  var numeros = valores.filter(function (t) {
    return t.trim() !== "";
  }).map(function (t) {
    return Number(t);
  }).filter(function (n) {
    return !isNaN(n);
  });

  if (numeros.length === 0) {
    document.getElementById("resultados").innerHTML = "<p>Esa columna no tiene números, selecciona otra porfis</p>";
    return;
  }

  console.log(numeros.length);
  console.log(numeros.slice(0, 5));
  var suma = numeros.reduce(function (acumulado, n) {
    return acumulado + n;
  }, 0);
  var promedio = suma / numeros.length;
  var mayor = Math.max.apply(Math, _toConsumableArray(numeros));
  var menor = Math.min.apply(Math, _toConsumableArray(numeros));
  console.log(promedio);
  console.log(mayor);
  console.log(menor);
  var html = "<p>Promedio: " + promedio + "</p>" + "<p>Mayor: " + mayor + "</p>" + "<p>Menor: " + menor + "</p>";
  document.getElementById("resultados").innerHTML = html;
  reporte = "R E P O R T E :)\n" + "Columna: " + columna.value + "\n" + "Promedio: " + promedio + "\n" + "Mayor: " + mayor + "\n" + "Menor: " + menor + "\n";
  console.log(reporte);
});
var generarReporte = document.getElementById("reporte");
generarReporte.addEventListener('click', function () {
  if (!reporte) {
    alert("calcula algo");
    return;
  }

  console.log(reporte);
  var paquete = new Blob([reporte], {
    type: "text/plain"
  });
  var url = URL.createObjectURL(paquete);
  var enlace = document.createElement("a");
  enlace.download = "reporte.txt";
  enlace.click();
  URL.revokeObjectURL(url);
});
//# sourceMappingURL=js.dev.js.map
