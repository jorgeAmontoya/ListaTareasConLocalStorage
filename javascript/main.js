 /** 
// Para enviar un valor a local Storage
localStorage.setItem("clave ", "valor");
localStorage.setItem("nombre1", "jorge");
localStorage.setItem("nombre", "jorge Anderson ");

//para obtener un valor guardado en Local Storage

localStorage.getItem("nombre)");

console.info(localStorage.getItem("nombre"));


// eliminar datos en Local Storage
localStorage.removeItem("nombre");
*/

const boton_agregar = document.getElementById('boton-agregar');
const lista_tareas = document.querySelector('.lista-tareas');
const boton_limpiar = document.querySelector('.boton-limpiar');

/**
 * metodo agragar
 */

boton_agregar.addEventListener('click', () => {
agregarTarea("")   
    
})

/**
 * metodo limpiar
 */

boton_limpiar.addEventListener('click', () => {

    limpiarTodo()
})


lista_tareas.addEventListener('click', (event) => {   /**metodoEliminar*/  
if(event.path[0].type == 'submit') {
    eliminarTarea(event.path[1].id)
}
})

lista_tareas.addEventListener('keypress', () => {   

    if (event.keyCode ==13){
        editarTarea(event.path[1].id, event.path[0].value)
    }
   })


var arregloTareas = []

var contador =0

const getContador = () => {

const contador = localStorage.getItem("contador")
return contador;
}

const setContador = () => {

    localStorage.setItem("contador",contador);
    }

const inicilizarContador = () => {

    if(getContador() != null){  
        contador = getContador()
    
    }
  
}




    const getArregloTareas = () => {
        setContador()

        const arreglo = JSON.parse(localStorage.getItem("arregloTareas"));
        return arreglo
        }

        const setArregloTareas = () => {

            localStorage.setItem("arregloTareas",JSON.stringify(arregloTareas));  

            listarTareas()
            
        }

        const agregarTarea =(descripcion) => {
            contador++

            let objetoTareas = {

                id: contador,
                descripcion: descripcion
            }

          if(getArregloTareas() != null) {
              arregloTareas=getArregloTareas()

          }
            arregloTareas.push(objetoTareas);
            setArregloTareas();
        }

        const listarTareas = () =>{
            lista_tareas.innerHTML = ''
            let datos = getArregloTareas();
            if(datos !=null){
            for(const tarea of datos.reverse()){
                lista_tareas.innerHTML +=`
                <li id="${tarea.id}">
            <input type=" text" class="input-tarea" value="${tarea.descripcion}">
            <button class ="boton-eliminar">X </button>
       </li>
                
                `
            }
            }
        }

        const editarTarea =(idTarea, descripcion) => {

            let newTarea = {

                id: idTarea,
                descripcion: descripcion
            } 

            let datos = getArregloTareas();

            let newArreglo = []
            if(datos !=null){
            for(const tarea of datos){
              
                if(tarea.id == idTarea){
                        newArreglo.push(newTarea)
                        
                }else{   newArreglo.push(tarea)     
                
                
            }
                
                
                }

                
            }

            arregloTareas =newArreglo

            setArregloTareas() 
        }


       
        const eliminarTarea = (idTarea) => {
            let datos = getArregloTareas()
            let newArreglo = []
            if (datos != null) {
              for (const tarea of datos) {
                if (tarea.id != idTarea) {
                  newArreglo.push(tarea)
                }
              }
            }
            arregloTareas = newArreglo
            setArregloTareas()
          }
          
          const limpiarTodo = () => {
            arregloTareas = []
            contador = 0
            setArregloTareas()
            setContador()
          }
          
          // inicia
          inicilizarContador()
          listarTareas()









