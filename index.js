let selectCategorias = document.querySelector('#selectCategorias');
let textoNombre = document.querySelector('#textoNombre');
let botonBuscar = document.querySelector('#botonBuscar');
let contenidoTabla = document.querySelector('#contenidoTabla');
let botonEliminar = document.querySelector("body");


const uriCategoriasAPI = 'https://disenoydesarrolloapi.azurewebsites.net/api/Producto/Categorias';
const urlProductosAPI = 'https://disenoydesarrolloapi.azurewebsites.net/api/Producto';

const obtenerCategoriasApi = () =>{
    event.preventDefault();

    fetch(uriCategoriasAPI)
    .then(response => response.json())
    .then(data =>{
        imprimirCategoria(data.categorias);
    });

}

const imprimirCategoria = (opciones) =>{

    selectCategorias.innerHTML = '';

    opciones.forEach( opcion => {
        selectCategorias.innerHTML += `<option class="option_Categorias">${opcion}</option>`;
    });

}

const buscarProductos = (event) => {

    event.preventDefault();
    obtenerProductosApi();
    renderizarTabla();
}

const obtenerProductosApi = () => {

    contenidoTabla.innerHTML = '';

    fetch(`${urlProductosAPI}?categoria=${selectCategorias.value}&nombre=${textoNombre.value}`)
    .then(response => response.json())
    .then(data => renderizarTabla(data))

}

const renderizarTabla = (productos) => {

    contenidoTabla.innerHTML = '';

    productos.forEach(producto=> {
        contenidoTabla.innerHTML  += `<tr>
        <td>  ${producto.codigo} </td>
        <td>  ${producto.nombre} </td>
        <td>  ${producto.categoria} </td>
        <td>  ${producto.precio} </td>
        <td>  ${producto.proveedor}</td>
        <td><button class="boton-modificar">Modificar</button><button class="boton-eliminar" value="${producto.codigo}" >Eliminar</button></td>  
        <tr>
        `
    });
}

selectCategorias.addEventListener('focus',obtenerCategoriasApi);
botonBuscar.addEventListener('click',buscarProductos);

