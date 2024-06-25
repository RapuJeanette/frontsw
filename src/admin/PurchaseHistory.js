/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState} from 'react';
import { CartContext } from '../CartContext';
import '../App.css';
import { PersonaService } from '../PersonaAPI';

function PurchaseHistory() {
  const { users, setAllUsers } = useContext(CartContext);
  const { returnProduct } = useContext(CartContext);
  const  [compras, setCompras] = useState([]);
  const [editandoCompra, setEditandoCompra] = useState(null);
  const personaService = new PersonaService();
  
  useEffect(() => {
    personaService.getCompras().then(data =>  {
      setCompras(data);
    }).catch(error => {
      console.error("Error fetching compras:", error);
    });
  }, [personaService, setCompras]);

  useEffect(() => {
    personaService.getUser().then(data =>  {
      setAllUsers(data);
    }).catch(error => {
      console.error("Error fetching USUARIOS:", error);
    });
  }, [personaService, setAllUsers]);

  const user = (vendedorId) =>{
    const vendedor = users.find(users=> users.id === vendedorId);
    return vendedor ? vendedor.nombre: 'Desconocido' ;
  };

  const handleEliminarCompra = (compraId) => {
    personaService.eliminarCompra(compraId)
      .then(() => {
        console.log(`Compra con ID ${compraId} eliminada correctamente.`);
        setCompras(compras.filter(compra => compra.id !== compraId));
      })
      .catch(error => {
        console.error(`Error al eliminar compra con ID ${compraId}:`, error);
      });
  };

  const handleEditarCompra = (compra) => {
    setEditandoCompra(compra);
  };

  const guardarCambiosCompra = (compraEditada) => {
    personaService.actualizarCompra(compraEditada)
      .then(() => {
        console.log(`Compra con ID ${compraEditada.id} actualizada correctamente.`);
        // Actualizar el estado de las compras después de editar
        setCompras(compras.map(compra =>
          compra.id === compraEditada.id ? compraEditada : compra
        ));
        setEditandoCompra(null); // Salir del modo de edición
      })
      .catch(error => {
        console.error(`Error al actualizar compra con ID ${compraEditada.id}:`, error);
      });
  };

  const handleReturn = (productId) => {
    returnProduct(productId);
  };

  return (
    <div className="inventory">
      <h2>Compras</h2>
      <div className="inventory-list">
        <ul>
          <li className="inventory-header">
            <span>Vendedor</span>
            <span>Productos</span>
            <span>Fecha</span>
            <span>Total</span>
            <span>Opción</span>
          </li>
          {compras.map((product) => (
            <li key={product.id} className="inventory-item">
              <span>{user(product.usuarioId)}</span>
              <span> <ul>
                  {product.productos.map((producto, index) => (
                    <li key={index}>{producto.nombre} - {producto.cantidad}</li>
                  ))}
                </ul> </span>
              <span>{product.fecha}</span>
              <span>{product.total.toFixed(2)}</span>
              <span><button onClick={() => handleEditarCompra(compras)} className="btn-edit">Editar</button></span>
              <span><button onClick={() => handleEliminarCompra(compras.id)} className="btn-delete">Eliminar</button></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PurchaseHistory;

