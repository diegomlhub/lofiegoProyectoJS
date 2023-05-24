// <-- variables -->
const descuentoContado = 0.15; //porcentaje /100
let precioContado;
let precioCuotas;
const validezPresupuesto = 5; //dias
let fechaValidez;
const fechaActual = new Date();
let precioTotal;
const mensajeError1 = "Seleccione un producto o verifique que la cantidad sea mayor a cero.";
const mensajeError2 = "No se logró ingresar el producto, intente nuevamente.";
const mensajeError3 = "Error de conexión con la base de datos, si el error persiste comuniquese con el proveedor.";
const mensajeCorrecto1 = "El producto se ingreso correctamente, a continuación podrá ver el presupuesto o agregar otros productos al mismo.";                  
const mensajeCorrecto2 = "Se eliminó correctamente el presupuesto";
const mensajeAdvertencia = "¿Esta seguro que desea eliminar el presupuesto?"
let productos = [];
let productosSeleccionados = [];

// <-- Fetch -->
//Capturo objetos cargados en json, los guardo en un array y modifico el seleccionable del html. (cambio constructor de la clase para poder usarla, recibe un objeto en vez de variables)
fetch("./../data/post.json")
    .then( (response) => response.json())
    .then( (productosJson) => {        
        productosJson.forEach((producto) => {
            productos.push(new Producto(producto));
            const selected = document.getElementById("nombres-productos");
            selected.innerHTML += `<option>${producto.nombre}</option>`;
        });           
    })
    .catch((error) => {
        console.log(error); //envio por consola el error para debug.
        const selected = document.getElementById("nombres-productos")
        selected.innerHTML = `<option>No hay productos para seleccionar</option>`
        Swal.fire({  
            title: '¡Error!',          
            text: mensajeError3,
            icon: 'error',
            confirmButtonColor: '#349c63',
            confirmButtonText: 'Cerrar'            
        });
    }) 

//al iniciar, recupero el local storage, si es que tiene productos.
if (localStorage.getItem("productoCantidad")) {
    productosSeleccionados = JSON.parse(localStorage.getItem("productoCantidad"));
    completarTabla(productosSeleccionados);
}

// <-- funciones -->
function agregarProducto(nombreProducto, cantidad){
    //Busco producto ingresado en los mi array de productos y lo almaceno
    let prodSel = productos.find(e => e.nombre === nombreProducto)
    
    //si lo encuentro sumo solo la cantidad, si no lo pusheo con el elemento cantidad (uso spread)
    productosSeleccionados.some(e => e.nombre === nombreProducto) ? 
    productosSeleccionados.find(e => e.nombre === nombreProducto).cantidad += cantidad : productosSeleccionados.push({...prodSel , cantidad: cantidad});
    
    //verifico que producto seleccionado no sea null antes de guardar en localstorage.        
    if(productosSeleccionados !== null){
        localStorage.setItem("productoCantidad", JSON.stringify(productosSeleccionados));        
        Swal.fire({
            position: 'top',        
            text: mensajeCorrecto1,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
    }
    else{        
        Swal.fire({  
            title: '¡Error!',          
            text: mensajeError2,
            icon: 'error',
            confirmButtonColor: '#349c63',
            confirmButtonText: 'Cerrar'            
        });
    };
    //Utilizo setTimeout para que los elementos se muestren luego de que el mensaje se cierra.
    setTimeout(()=> {
        completarTabla(productosSeleccionados);
    }, 2000);    
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
    // Recupero inputs
    const nombreProducto = document.getElementById("nombres-productos").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
        
    //verifico que la cantidad sea mayor a cero y que se haya seleccionado un producto, si es asi agrego producto, si no muestro mensaje de error.
    cantidad > 0 && nombreProducto !== "Seleccione un producto..." ? agregarProducto(nombreProducto, cantidad) : 
    Swal.fire({
        title: '¡Error!',
        text: mensajeError1,
        icon: 'error',
        confirmButtonColor: '#349c63',
        confirmButtonText: 'Cerrar'
    });    
});

const eliminar = document.getElementById('eliminar');
eliminar.addEventListener("click", () => {         
    Swal.fire({        
        text: mensajeAdvertencia,
        icon: 'warning',
        showCancelButton: true,        
        confirmButtonColor: '#349c63',                
        confirmButtonText: 'Si',
        cancelButtonText:  'No'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            //borro el local storage
            localStorage.clear(); 
            //reinicio los productos seleccionados y el presupuesto informado. (Utilizo setTimeout para que los elementos se borren luego de que el mensaje se cierra)            
            setTimeout(()=> {
                productosSeleccionados = [];
                completarTabla([]); 
                document.getElementById("nombres-productos").value = "Seleccione un producto...";
                document.getElementById("cantidad").value = "";
                document.getElementById("presupuesto-total").innerHTML = "";                                
            }, 2000);            
            Swal.fire({
                position: 'top',
                text: mensajeCorrecto2,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
          });
        }
      })    
});   