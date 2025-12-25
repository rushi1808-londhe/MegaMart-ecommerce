import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Fetch product by ID
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price * 90,
      image: product.thumbnail,
      brand: product.brand
    }, quantity);
    alert(`Added ${quantity} ${product.title} to cart!`);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price * 90,
      image: product.thumbnail,
      brand: product.brand
    }, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Product not found</div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="text-muted">{product.category}</span>
          </li>
          <li className="breadcrumb-item active">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="position-relative">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="card-img-top"
                style={{ height: '500px', objectFit: 'contain', padding: '20px' }}
              />
              {product.discountPercentage > 0 && (
                <span className="position-absolute top-0 end-0 badge bg-danger m-3 fs-6">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
            {/* Thumbnail Images */}
            <div className="card-body">
              <div className="d-flex gap-2 overflow-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className={`img-thumbnail cursor-pointer ${selectedImage === index ? 'border-primary border-3' : ''}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <div className="mb-3">
            <span className="badge bg-primary me-2">{product.category}</span>
            <span className="badge bg-secondary">{product.brand}</span>
          </div>

          <h1 className="mb-3">{product.title}</h1>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3">
            <div className="me-3">
              <span className="text-warning fs-5">
                {"⭐".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="ms-2 fw-semibold">{product.rating}</span>
            </div>
            <span className="text-muted">|</span>
            <span className="ms-3 text-muted">{product.reviews?.length || 0} Reviews</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <h2 className="text-primary mb-2">₹{(product.price * 90).toFixed(2)}</h2>
            {product.discountPercentage > 0 && (
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted text-decoration-line-through fs-5">
                  ₹{((product.price * 90) / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="badge bg-success">
                  Save ₹{(((product.price * 90) / (1 - product.discountPercentage / 100)) - (product.price * 90)).toFixed(2)}
                </span>
              </div>
            )}
            <p className="text-muted mt-2 mb-0">Inclusive of all taxes</p>
          </div>

          {/* Key Features */}
          <div className="card bg-light border-0 mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Key Features</h6>
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="me-2">📦</span>
                    <div>
                      <small className="text-muted d-block">Stock</small>
                      <span className="fw-semibold">{product.stock} Units</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="me-2">🏆</span>
                    <div>
                      <small className="text-muted d-block">Warranty</small>
                      <span className="fw-semibold">{product.warrantyInformation}</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="me-2">🚚</span>
                    <div>
                      <small className="text-muted d-block">Shipping</small>
                      <span className="fw-semibold">{product.shippingInformation}</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="me-2">↩️</span>
                    <div>
                      <small className="text-muted d-block">Return Policy</small>
                      <span className="fw-semibold">{product.returnPolicy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-4">
            {product.availabilityStatus === 'In Stock' ? (
              <div className="alert alert-success mb-3">
                ✅ In Stock - Ready to ship
              </div>
            ) : (
              <div className="alert alert-warning mb-3">
                ⚠️ {product.availabilityStatus}
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Quantity</label>
            <div className="d-flex align-items-center gap-3">
              <div className="btn-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <button className="btn btn-outline-secondary" disabled>
                  {quantity}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              <span className="text-muted">({product.stock} available)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-3 mb-4">
            <button
              className="btn btn-primary btn-lg py-3"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              ⚡ Buy Now
            </button>
            <button
              className="btn btn-outline-dark btn-lg py-3"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-top pt-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">SKU:</span>
              <span className="fw-semibold">{product.sku}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Barcode:</span>
              <span className="fw-semibold">{product.meta?.barcode}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Weight:</span>
              <span className="fw-semibold">{product.weight}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="row mt-5">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'dimensions' ? 'active' : ''}`}
                onClick={() => setActiveTab('dimensions')}
              >
                Dimensions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews?.length || 0})
              </button>
            </li>
          </ul>

          <div className="border border-top-0 p-4">
            {activeTab === 'description' && (
              <div>
                <h5 className="mb-3">Product Description</h5>
                <p>{product.description}</p>
                {product.tags && (
                  <div className="mt-4">
                    <h6 className="mb-2">Tags:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div>
                <h5 className="mb-3">Product Dimensions</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Width</td>
                      <td>{product.dimensions.width} cm</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Height</td>
                      <td>{product.dimensions.height} cm</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Depth</td>
                      <td>{product.dimensions.depth} cm</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Weight</td>
                      <td>{product.weight} g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h5 className="mb-4">Customer Reviews</h5>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <strong>{review.reviewerName}</strong>
                          <span className="text-muted ms-2">({review.reviewerEmail})</span>
                        </div>
                        <span className="text-warning">
                          {"⭐".repeat(review.rating)}
                        </span>
                      </div>
                      <p className="mb-1">{review.comment}</p>
                      <small className="text-muted">
                        {new Date(review.date).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}