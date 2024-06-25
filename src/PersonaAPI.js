import axios from "axios";
export class PersonaService{
    baseUrl = "http://localhost:8081/"
    getAll(){
        return axios.get(this.baseUrl + "catalogos").then(res => res.data);
    }

    getDevolucion(){
        return axios.get(this.baseUrl + "devoluciones").then(res => res.data);
    }

    getimagen(){
        return axios.get(this.baseUrl + 'uploads').then(res=> res.data);
    }

    getInfoProduct(id) {
        const url = `${this.baseUrl}productos/ver/${id}`;
        return axios.get(url).then(res => res.data);
    }

    getUsuarios(id) {
        const url = `${this.baseUrl}auth/${id}`;
        return axios.get(url).then(res => res.data);
    }

    getCompras(){
        return axios.get(this.baseUrl + "compras").then(res => res.data);
    }

    saveP(productos){
        return axios.post(this.baseUrl + "productos/crear", productos).then(res => res.data);
    }

    registrar(usuario){
        return axios.post(this.baseUrl + "auth/register", usuario).then(res => res.data);
    }

    save(catalogos){
        return axios.post(this.baseUrl + "catalogos/crear", catalogos).then(res => res.data);
    }

    getProducto(){
        return axios.get(this.baseUrl + "productos").then(res => res.data);
    }

    getUser(){
        return axios.get(this.baseUrl + "auth").then(res => res.data);
    }

    getInventario(){
        return axios.get(this.baseUrl + "inventario").then(res => res.data);
    }

    getVentas(){
        return axios.get(this.baseUrl + "ventas").then(res => res.data);
    }
}