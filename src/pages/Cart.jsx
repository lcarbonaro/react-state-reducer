import { useCart, useCartDispatch } from '../state/CartContext';


function Cart() {
    
  const cart = useCart();
  const dispatch = useCartDispatch();
   
    return (
      <div>
        <p>Shopping Cart</p>
        <p>You have {cart.length} product(s) in your cart.</p>
        <p>Cart Total:${ cart.reduce((t,p)=>t+=(p.qty*p.price),0) }</p>

        
        {cart.length>0 ? <button onClick={()=>dispatch({ type: 'CLEAR_CART'})}>Clear Cart</button> : ''}

        
        {cart.map(product => (
            <div key={product.id}>
                <p><img className="prod-image-small" src={product.image} alt={product.description} /></p>
                <p>{product.title} @ ${product.price}</p>                
                <p>
                  Qty:{product.qty} &nbsp;
                  <button onClick={() => dispatch({ type: 'INC_QTY', id:product.id }) }>+</button> &nbsp;
                  <button onClick={() => dispatch({ type: 'DEC_QTY', id:product.id }) }>-</button> &nbsp; 
                  Sub-total:${product.qty * product.price}
                </p>
                <button onClick={() => dispatch({ type: 'REMOVE_PRODUCT', id:product.id }) }>Remove</button>
            </div>
        ))}
        


      </div>
    )
  }
  
  export default Cart;
