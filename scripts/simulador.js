// <-- variables -->
const descuentoContado = 0.15; //porcentaje /100
let precioContado;
let precioCuotas;
const validezPresupuesto = 5; //dias
let fechaValidez;
const fechaActual = new Date();
let numeroProducto;
let listaProductos = "";
let precioTotal;
const mensajeError1 = "<div class='alert alert-danger' id='mensaje-error' role='alert'>" +
                    "Error: Seleccione un producto o verifique que la cantidad sea mayor a cero." +
                    "</div>";
const mensajeError2 = "<div class='alert alert-danger' id='mensaje-error' role='alert'>" +
                    "Error: al ingresar el producto, intente nuevamente." +
                    "</div>";
const mensajeCorrecto =  "<div class='alert alert-success' id='mensaje-error' role='alert'>" +
                        "El producto se ingreso correctamente, a continuación podrá ver el presupuesto o agregar otros productos al mismo." +
                        "</div>";                  

const productos = [
    new Producto(1, "Cartel texto pasante", 35000.00, 10),
    new Producto(2, "Turnero", 24999.99, 5),
    new Producto(3, "Placa de desarrollo", 15000.00, 16),
    new Producto(4, "Dispenser automático", 23000.00, 3),
    new Producto(5, "Escaner", 64999.93, 2),
    new Producto(6, "Circuito impreso", 13999.96, 50),    
];

let productosSeleccionados = [];

if (localStorage.getItem("productoCantidad")) {
    productosSeleccionados = JSON.parse(localStorage.getItem("productoCantidad"));

    completarTabla(productosSeleccionados)

    
}

// <-- funciones -->
function agregarProducto(nombreProducto, cantidad){
    //Busco producto ingresado en los mi array de productos y lo almaceno
    let prodSel = productos.find(e => e.nombre === nombreProducto)
    
    //si lo encuentro sumo solo la cantidad, si no lo pusheo con el elemento cantidad (uso spread)
    productosSeleccionados.some(e => e.nombre === nombreProducto) ? 
    productosSeleccionados.find(e => e.nombre === nombreProducto).cantidad += cantidad : productosSeleccionados.push({...prodSel , cantidad: cantidad});
    
    //verifico que producto seleccionado no sea null antes de guardar en localstorage.    
    const mensajes = document.getElementById("mensajes-id");
    if(productosSeleccionados !== null){
        localStorage.setItem("productoCantidad", JSON.stringify(productosSeleccionados));
        mensajes.innerHTML = mensajeCorrecto
    }
    else{
        mensajes.innerHTML = mensajeError2;
    }       

    completarTabla(productosSeleccionados);      
}            
 
function completarTabla(productosTabla = []) {    
    //completo la tabla en el DOM    
    let tabla = document.getElementById("presupuesto-tabla");
    tabla.innerHTML = "";
    productosTabla.forEach((e) => {
      let record = document.createElement("tr");
      record.innerHTML = `<tr>
        <td scope="row">${e.cantidad.toString()}</td>
        <td>${e.nombre}</td>
        <td>${e.precio.toString()}</td>
      </tr>`;
      tabla.append(record);
    });

    calcularPresupuesto();
    //Muestos el total y descuentos.
    const total = document.getElementById("presupuesto-total");
    total.innerHTML = mostrarPresupuesto();
}       

function calcularPresupuesto() {
    //Calculo el precio total de precio de lista * cantidad
    precioTotal = 0; 
    for (const item of productosSeleccionados) {
        precioTotal += item.precio * item.cantidad; 
    }
    precioCuotas =  precioTotal / 6;    
    precioContado = precioTotal - (precioTotal * descuentoContado);    
    fechaValidez = fechaActual.getDate() + validezPresupuesto;
}

function mostrarPresupuesto() {    
    return "<b><br> Precio de total: " + "$" + precioTotal.toFixed(2).toString() + ".- </b><br>" +        
        "6 cuotas sin interés de: $" + precioCuotas.toFixed(2).toString() + ".- <br>" +        
        "Precio final de contado (dto 15%): $" + precioContado.toFixed(2).toString() + ".- <br>" +
        "<br>" +
        "Validéz de presupuesto hasta el: " + fechaValidez.toString() + "/" + fechaActual.getMonth().toString() + "/" + fechaActual.getFullYear().toString() + ".";
    
}
  
// <-- eventos -->
const agregar = document.getElementById('agregar');
agregar.addEventListener("click", () => {    
    // Recuperaro inputs
    const nombreProducto = document.getElementById("nombres-productos").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    
    //si el mensaje de error existe lo borro.
    const mensajes = document.getElementById("mensajes-id");    
    if(document.getElementById("mensaje-error")){
        mensajes.innerHTML = "";
    }
    
    //verifico que la cantidad sea mayor a cero y que se haya seleccionado un producto, si es asi agrego producto, si no muestro mensaje de error.
    cantidad > 0 && nombreProducto !== "Seleccione un producto..." ? agregarProducto(nombreProducto, cantidad) : mensajes.innerHTML = mensajeError1;    
});

const eliminar = document.getElementById('eliminar');
eliminar.addEventListener("click", () => {
    localStorage.clear();    
});   