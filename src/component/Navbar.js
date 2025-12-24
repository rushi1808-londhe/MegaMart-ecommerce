import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";


export default function Navbar() {

    const { cartItems } = useCart(); // only what we need
    const { searchTerm, setSearchTerm } = useSearch();


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-0">
            <div className="container-fluid">

                <Link to="/" className="navbar-brand fw-bold">
                    MegaMart
                </Link>

                <div className="d-flex align-items-center gap-2">

                    <form
                        className="d-flex"
                        role="search"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="form-control nav-search"
                            type="search"
                            placeholder="Search products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button className="btn btn-outline-success">
                            Search
                        </button>
                    </form>

                    <Link
                        to="/cart"
                        className="d-flex align-items-center text-decoration-none text-dark"
                    >
                        <i className="bi bi-cart fs-3 me-1"></i>
                        <span className="fw-semibold">
                            Cart ({cartItems.length})
                        </span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}
