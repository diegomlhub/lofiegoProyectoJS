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

class Producto{
    constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }  

    toString(){
        return this.id.toString() + " - " + this.nombre;
    }
    
}

const productos = [
    new Producto(1, "Cartel texto pasante", 35000.00, 10),
    new Producto(2, "Turnero", 24999.99, 5),
    new Producto(3, "Placa de desarrollo", 15000.00, 16),
    new Producto(4, "Dispenser automático", 23000.00, 3),
    new Producto(5, "Escaner", 64999.93, 2),
    new Producto(6, "Circuito impreso", 13999.96, 50),    
];

let productosSeleccionados = [];

// <-- funciones -->
function ingresoProducto(){
    listaProductos = "";
    for (const item of productos) {
        listaProductos += item.toString() + ". \n" 
    }
    numeroProducto = parseInt(prompt("Ingrese el número del producto de la siguiente lista que desea presupuestar: \n \n" +    
    listaProductos));    
}

function validarProducto(numeroProducto){
    if (productos.some(e => e.id === numeroProducto)){        
        return true;        
    }
    else{
        alert("El producto seleccionado no esta en la lista, ingrese nuevamente el producto: \n");               
        return false;           
    }    
}

function calcularPresupuesto(nProducto) {
    productosSeleccionados.push(productos.find(e => e.id === nProducto))    
    precioTotal = productosSeleccionados.reduce((acumulador, elemento) => acumulador + elemento.precio , 0)    
    precioCuotas =  precioTotal / 6;    
    precioContado = precioTotal - (precioTotal * descuentoContado);    
    fechaValidez = fechaActual.getDate() + validezPresupuesto;
}

function mostrarPresupuesto() {
    listaPresupuesto = "Presupuesto de productos: \n";
    for (const item of productosSeleccionados) {
        listaPresupuesto += item.toString() + " Precio de lista: $" + item.precio + ".- \n";
    }
    
    alert(listaPresupuesto +        
        "\n" +
        "Precio de total: " + "$" + precioTotal.toFixed(2).toString() + ".- \n" +        
        "6 cuotas sin interés de: $" + precioCuotas.toFixed(2).toString() + ".- \n" +        
        "Precio final de contado (dto 15%): $" + precioContado.toFixed(2).toString() + ".- \n" +
        "\n" +
        "Validéz de presupuesto hasta el: " + fechaValidez.toString() + "/" + fechaActual.getMonth().toString() + "/" + fechaActual.getFullYear().toString() + "."
    );
}

// <-- codigo -->
// <-- ingreso producto a presupuestar a través del promt-->
// <-- dependiendo el numero solicitado realizo validacion del valor ingresado y el calculo del precio final -->

do{ 
    do{
        ingresoProducto();
        //Condicion para salvar el ingreso de NaN
        if(isNaN(numeroProducto)){
            numeroProducto = 0; 
        }   
        if(validarProducto(numeroProducto)){
            calcularPresupuesto(numeroProducto);                        
        }
    }   
    while(prompt("¿Desea agregar otro producto al presupuesto? SI/NO").toUpperCase() !== "NO")
    mostrarPresupuesto();
}
while (prompt("¿Quiere realizar otro presupuesto? SI/NO").toUpperCase() !== "NO")

alert("Gracias por elegirnos, hasta pronto!")