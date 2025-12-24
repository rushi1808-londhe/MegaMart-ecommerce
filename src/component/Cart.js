import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.18; // 18% tax
  };

  const getShipping = () => {
    return getSubtotal() > 50000 ? 0 : 500;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping();
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '4rem' }}>🛒</div>
          <h3 className="text-muted">Your cart is empty</h3>
          <p className="text-muted">Add some items to get started!</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Cart Items ({cartItems.length})</h5>
                
                {cartItems.map(item => (
                  <div key={item.id} className="row mb-4 pb-4 border-bottom">
                    <div className="col-md-2 col-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="img-fluid rounded"
                        style={{ objectFit: 'cover', height: '80px', cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      />
                    </div>
                    <div className="col-md-4 col-9">
                      <h6 
                        className="mb-1" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.title}
                      </h6>
                      <p className="text-muted small mb-0">{item.brand}</p>
                      <button 
                        className="btn btn-link btn-sm text-danger p-0 mt-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                    <div className="col-md-3 col-6 mt-3 mt-md-0">
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-3 fw-semibold">{item.quantity}</span>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3 col-6 mt-3 mt-md-0 text-md-end">
                      <p className="mb-0 text-muted small">₹{item.price.toFixed(2)}</p>
                      <h6 className="mb-0 fw-bold">₹{(item.price * item.quantity).toFixed(2)}</h6>
                    </div>
                  </div>
                ))}

                <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/')}>
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span className="fw-semibold">₹{getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax (18%)</span>
                  <span className="fw-semibold">₹{getTax().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span className="fw-semibold">
                    {getShipping() === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${getShipping().toFixed(2)}`
                    )}
                  </span>
                </div>

                {getShipping() > 0 && (
                  <div className="alert alert-info py-2 small mb-3">
                    💡 Add ₹{(50000 - getSubtotal()).toFixed(2)} more for FREE shipping!
                  </div>
                )}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0">Total</h5>
                  <h5 className="mb-0 fw-bold">₹{getTotal().toFixed(2)}</h5>
                </div>

                <button className="btn btn-primary w-100 mb-3 py-3 fw-semibold">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <small className="text-muted">🔒 Secure Checkout</small>
                </div>

                {/* Promo Code */}
                <div className="mt-4">
                  <label className="form-label small fw-semibold">Have a promo code?</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter code"
                    />
                    <button className="btn btn-outline-secondary">Apply</button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <small className="text-muted d-block mb-2">We accept</small>
                  <div className="d-flex justify-content-center gap-2">
                    <span className="badge bg-light text-dark border">💳 Cards</span>
                    <span className="badge bg-light text-dark border">📱 UPI</span>
                    <span className="badge bg-light text-dark border">🏦 Net Banking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}