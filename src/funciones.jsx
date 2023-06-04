import Swal from 'sweetalert2';
import axios from 'axios';

export const mostrar_alerta = (msj,icon,html='') =>{
    Swal.fire({ title:msj, icon:icon,html:html, buttonsStyling:true});
}

export const enviarPeticion = async(metodo,parametros,url,redir='') => {
    let mime = (metodo == 'POST' || metodo == 'PUT') ? 'multipart/form-data' : 'application/json';
    axios.defaults.baseURL = 'http://localhost:5000'
    //axios.defaults.headers.common['Accept'] = 'application/json'
    //axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    //axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    let res;
    await axios({ method:metodo, url:url, data:parametros}).then(
        respuesta =>{
            res = respuesta.data,
            (metodo != 'GET') ? mostrar_alerta(respuesta.data.message,'success'):'',
            setTimeout( () =>
            (redir !=='') ? window.location.href = redir : '',2000)
        }).catch( (errors) =>{
            let desc='';
            res = errors.response.data,
            errors.response.data.errors.map( (e) => {desc = desc + ' '+e})
            mostrar_alerta(desc,'error')
        })
        
    return res;
}

export const confirmacion = async(name,url,redir) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Seguro de eliminar '+name+' ?',
        icon:'question',showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    }).then( (result) => {
        if(result.isConfirmed){
            enviarPeticion('DELETE',{},url,redir);
        }
    });
}

export default mostrar_alerta;