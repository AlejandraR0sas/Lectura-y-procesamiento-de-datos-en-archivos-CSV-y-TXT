let encabezados;
let filas;
let reporte;
document.getElementById("archivo").addEventListener('change', function(e){
    const archivo=e.target.files[0];
    if(!archivo) return;
    const lector= new FileReader();

    lector.onload=function(evento){
        const contenido=evento.target.result;
        const resultado=Papa.parse(contenido, {header: true, skipEmptyLines: true })
        encabezados=resultado.meta.fields;
        const opciones = encabezados.map(c => "<option>" + c + "</option>").join("");
        document.getElementById("selColumna").innerHTML = opciones;
        filas=resultado.data;
        mostrarTabla(filas);
        console.log(resultado);
        console.log("Encabezados:");
        console.log(encabezados);
        console.log("Filas:");
        console.log(filas);
    }
    lector.readAsText(archivo,"ISO-8859-1");
});
function mostrarTabla(datos){
    if(datos.length === 0){
        document.getElementById("tabla").innerHTML = "<p>No se encontraron resultados :(</p>";
        return;   
    }
    const filasVisibles=datos.slice(0,10);
    const aviso="<p>Mostrando "+filasVisibles.length+" Filas de "+datos.length+"</p>";
    const encabezado = "<tr>" + encabezados.map(c => "<th>" + c + "</th>").join("") + "</tr>";
    const cuerpo = filasVisibles.map(f =>
        "<tr>" + encabezados.map(c => "<td>" + f[c] + "</td>").join("") + "</tr>"
    ).join("");
    const html = aviso+"<table>" + encabezado + cuerpo + "</table>";
    document.getElementById("tabla").innerHTML = html;
}
const boton=document.getElementById("btnFiltrar");
const texto=document.getElementById("textoFiltro");

boton.addEventListener('click', function(){
console.log(texto.value);
const buscando=texto.value.toLowerCase();
const encontrados = filas.filter(p =>
    Object.values(p).some(valor => valor.toLowerCase().includes(buscando))
    
);
mostrarTabla(encontrados);
console.log(encontrados.length);
});
const calcular=document.getElementById("calcular");
const columna=document.getElementById("selColumna");
calcular.addEventListener('click', function(){
    const valores = filas.map(p => p[columna.value]);
    console.log(columna.value);
    const numeros = valores
    .filter(t => t.trim() !== "")    
    .map(t => Number(t))             
    .filter(n => !isNaN(n)); 
      if(numeros.length === 0){
    document.getElementById("resultados").innerHTML = "<p>Esa columna no tiene números, selecciona otra porfis</p>";
    return;
}
    console.log(numeros.length); 
    console.log(numeros.slice(0,5));
    const suma = numeros.reduce((acumulado, n) => acumulado + n, 0);
    const promedio = suma / numeros.length;
    const mayor = Math.max(...numeros);
    const menor = Math.min(...numeros); 
    console.log(promedio);
    console.log(mayor);
    console.log(menor);
    const html = "<p>Promedio: " + promedio + "</p>" +
             "<p>Mayor: " + mayor + "</p>" +
             "<p>Menor: " + menor + "</p>";
    document.getElementById("resultados").innerHTML = html;
    reporte = "R E P O R T E :)\n" +
                "Columna: "+columna.value +"\n"+
                "Promedio: " + promedio + "\n" +
                "Mayor: " + mayor + "\n"+
                "Menor: " + menor + "\n";
    console.log(reporte);
});
const generarReporte=document.getElementById("reporte");
generarReporte.addEventListener('click', function(){
    if(!reporte){                                  
        alert("calcula algo");
        return;
    }
    console.log(reporte);
    const paquete = new Blob([reporte], { type: "text/plain" });   
    const url = URL.createObjectURL(paquete);                       

    const enlace = document.createElement("a");   
    enlace.download = "reporte.txt";               
    enlace.click();                              
    URL.revokeObjectURL(url); 
});
