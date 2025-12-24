import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from "../context/SearchContext";
import { useFilter } from "../context/FilterContext";

import FilterPopup from "./FilterPopup";



export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { searchTerm } = useSearch();
    const [visibleCount, setVisibleCount] = useState(36);
    const [showFilter, setShowFilter] = useState(false);
    const { selectedCategory, priceRange } = useFilter();





    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=194')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
  setVisibleCount(36);
}, [searchTerm, selectedCategory, priceRange]);


    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price * 90,
            image: product.thumbnail,
            brand: product.brand
        }, 1);
        alert(`${product.title} added to cart!`);
    };

    const handleBuyNow = (product) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price * 90,
            image: product.thumbnail,
            brand: product.brand
        }, 1);
        navigate('/cart');
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const filteredProducts = products.filter(product => {
  const matchesSearch =
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "all" ||
    product.category === selectedCategory;

  const matchesPrice =
    product.price * 90 <= priceRange[1];

  return matchesSearch && matchesCategory && matchesPrice;
});

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div>
            {/* CAROUSEL SECTION */}
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/Images/sale.jpg" className="d-block w-100" alt="Sale Banner 1" loading="lazy" />
                    </div>
                    <div className="carousel-item">
                        <img src="/Images/sale2.jpeg" className="d-block w-100" alt="Sale Banner 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="/Images/sale3.jpeg" className="d-block w-100" alt="Sale Banner 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* FILTER SECTION */}
            <div className="container-fluid mt-4">
                <div className="d-flex justify-content-between align-items-center">

                    <button
                        className="btn btn-outline-dark d-flex align-items-center gap-2 text-center"
                        onClick={() => setShowFilter(true)}
                    >
                        <i className="bi bi-funnel"></i>
                        Filter
                    </button>
                </div>
            </div>

            {showFilter && <FilterPopup onClose={() => setShowFilter(false)} />}


            {/* PRODUCT SECTION */}
            <div className="product display mt-5">
                <div className="container-fluid">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {visibleProducts.map(product => (

                                <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100 shadow-sm product-card">
                                        <div
                                            className="position-relative"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            <img
                                                src={product.thumbnail}
                                                className="card-img-top product-img"
                                                alt={product.title}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                            {product.discountPercentage > 10 && (
                                                <span className="position-absolute top-0 end-0 badge bg-danger m-2">
                                                    -{Math.round(product.discountPercentage)}%
                                                </span>
                                            )}
                                            {product.stock < 20 && product.stock > 0 && (
                                                <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-2">
                                                    Low Stock
                                                </span>
                                            )}
                                        </div>

                                        <div className="card-body d-flex flex-column">
                                            <div
                                                className="d-flex justify-content-between align-items-start mb-2"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                <h6 className="card-title mb-0 flex-grow-1">{product.title}</h6>
                                            </div>

                                            <p className="text-muted small mb-2">
                                                <span className="badge bg-secondary">{product.brand || product.category}</span>
                                            </p>

                                            <div className="mb-2">
                                                <span className="text-warning">
                                                    {"⭐".repeat(Math.floor(product.rating))}
                                                    {"☆".repeat(5 - Math.floor(product.rating))}
                                                </span>
                                                <span className="text-muted ms-2">({product.rating})</span>
                                            </div>

                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                <span className="badge bg-light text-dark border">
                                                    📦 Stock: {product.stock}
                                                </span>
                                                {product.warrantyInformation && (
                                                    <span className="badge bg-light text-dark border" title={product.warrantyInformation}>
                                                        🏆 Warranty
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-muted small mb-3" style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {product.description}
                                            </p>

                                            <div className="mb-3">
                                                <div className="d-flex align-items-baseline gap-2">
                                                    <h5 className="fw-bold mb-0 text-dark">₹{(product.price * 90).toFixed(2)}</h5>
                                                    {product.discountPercentage > 0 && (
                                                        <span className="text-muted text-decoration-line-through small">
                                                            ₹{((product.price * 90) / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                                                    )}
                                                </div>
                                                {product.shippingInformation && (
                                                    <small className="text-success d-block mt-1">
                                                        ✓ {product.shippingInformation}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="mt-auto d-grid gap-2">
                                                <button
                                                    className="btn btn-primary fw-semibold"
                                                    onClick={() => handleBuyNow(product)}
                                                    disabled={product.stock === 0}
                                                >
                                                    ⚡ Buy Now
                                                </button>
                                                <button
                                                    className="btn btn-outline-dark"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(product);
                                                    }}
                                                    disabled={product.stock === 0}
                                                >
                                                    🛒 Add to Cart
                                                </button>
                                            </div>

                                            {product.stock === 0 && (
                                                <div className="alert alert-danger mt-2 mb-0 py-1 small text-center">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>


                            ))}
                            {
                                visibleCount < filteredProducts.length && (
                                    <div className="text-center mt-4">
                                        <button
                                            className="btn btn-outline-dark px-4 py-2"
                                            onClick={() => setVisibleCount(prev => prev + 36)}
                                        >
                                            View More
                                        </button>
                                    </div>
                                )
                            }
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}