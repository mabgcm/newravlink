import React from "react";
import { NavLink } from "react-router-dom";
// import ThemeSwitcher from "../Theme/themeswitch";
import { useNav } from "../Context/NavContext";

function Navbar() {
    const { isDropdownActive } = useNav();

    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg">
                <div className="navbar-container">
                    <div className="logo-container">
                        <NavLink className="navbar-brand" to="/">
                            <img
                                src="/assets/images/ravlink-logo.png"
                                className="site-logo img-fluid"
                                alt="Logo"
                            />
                        </NavLink>
                    </div>

                    <button
                        className="navbar-toggler nav-btn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" end>
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">
                                    About
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle ${isDropdownActive(["/service", "/single_services"])
                                        ? "active"
                                        : ""
                                        }`}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Services <i className="fa-solid fa-angle-down accent-color"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/service" className="dropdown-item">
                                            Service
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/single_services" className="dropdown-item">
                                            Single Services
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle ${isDropdownActive([
                                        "/case_studies",
                                        "/team",
                                        "/partnership",
                                        "/pricing",
                                        "/testimonial",
                                        "/faq",
                                        "/404_page",
                                    ])
                                        ? "active"
                                        : ""
                                        }`}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Pages <i className="fa-solid fa-angle-down accent-color"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/case_studies" className="dropdown-item">
                                            Case Studies
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/team" className="dropdown-item">
                                            Our Team
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/partnership" className="dropdown-item">
                                            Partnership
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/pricing" className="dropdown-item">
                                            Pricing Plan
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/testimonial" className="dropdown-item">
                                            Testimonial
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/faq" className="dropdown-item">
                                            FAQs
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/404_page" className="dropdown-item">
                                            Error 404
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            {/* Archive Dropdown */}
                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle ${isDropdownActive(["/blog", "/single_post"]) ? "active" : ""
                                        }`}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Archive <i className="fa-solid fa-angle-down accent-color"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/blog" className="dropdown-item">
                                            Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/single_post" className="dropdown-item">
                                            Single Post
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link">
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Navbar Action */}
                    <div className="navbar-action-container">
                        {/* <div className="navbar-action-button">
                            <ThemeSwitcher />
                        </div> */}
                        <a className="navbar-icon-wrapper" href="tel:+14372196444" aria-label="Call (437) 219-6444">
                            <div className="icon-circle">
                                <i className="fa-solid fa-phone-volume"></i>
                            </div>
                            <h6>(437) 219-6444</h6>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
