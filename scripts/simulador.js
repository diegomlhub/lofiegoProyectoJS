// <-- variables -->
let precioLista;
const descuentoContado = 0.15; //porcentaje /100
let precioFinal;
let precioCuotas;
const validezPresupuesto = 5; //dias
let fechaValidez;
let producto;
const fechaActual = new Date();
let numeroProducto;

// <-- funciones -->
function ingresoProducto(){
    numeroProducto = parseInt(prompt("Esta por realizar un presupuesto, ingrese el número del producto de la siguiente lista: \n" +
    "1 - Cartel texto pasante. \n" +
    "2 - Turnero. \n" +
    "3 - Placa de desarrollo. \n" +
    "4 - Dispenser automático. \n" +
    "5 - Escaner. \n" +
    "6 - Circuito impreso. \n"));    
}

function validarProducto(numeroProducto){
    if (numeroProducto < 1 || numeroProducto > 6){
        alert("El producto seleccionado no esta en la lista, ingrese nuevamente el producto: \n");               
        return false;
    }
    else{
        return true;        
    }    
}

function calcularPresupuesto(nProducto) {
    switch(nProducto){
        case 1:
            producto = "Cartel texto pasante";
            precioLista = 35000.00;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;    
    
        case 2:
            producto = "Turnero";
            precioLista = 24999.99;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;

        case 3:
            producto = "Placa de desarrollo";
            precioLista = 15000.00;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;
    
        case 4:
            producto = "Dispenser automático";
            precioLista = 23000.00;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;
    
        case 5:
            producto = "Escaner";
            precioLista = 64999.93;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;
    
        case 6:
            producto = "Circuito impreso";
            precioLista = 13999.96;
            precioCuotas = precioLista / 6;
            precioFinal = precioLista - (precioLista * descuentoContado);
            fechaValidez = fechaActual.getDate() + validezPresupuesto;
            break;
    }       
}
  
function mostrarPresupuesto() {
    alert(
        "Presupuesto de " + producto + ": \n" +
        "\n" +
        "Precio de lista: " + "$" + precioLista.toFixed(2).toString() + ".- \n" +
        "6 cuotas sin interés de: $" + precioCuotas.toFixed(2).toString() + ".- \n" +
        "\n" +
        "Precio final de contado (dto 15%): " + precioFinal.toFixed(2).toString() + ".- \n" +
        "\n" +
        "Validéz de presupuesto hasta el: " + fechaValidez.toString() + "/" + fechaActual.getMonth().toString() + "/" + fechaActual.getFullYear().toString() + "."
    );
}

// <-- codigo -->
// <-- ingreso producto a presupuestar a través del promt-->
ingresoProducto();
// <-- dependiendo el numero solicitado realizo validacion del valor ingresado y el calculo del precio final -->

while (true){
    if(validarProducto(numeroProducto)){
        calcularPresupuesto(numeroProducto);
        mostrarPresupuesto();
        ingresoProducto();
    }
    else{
        ingresoProducto();
    }    
}


