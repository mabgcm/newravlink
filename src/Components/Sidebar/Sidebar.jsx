import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Language/LanguageSwitcher";

function Sidebar() {
    const overlayRef = useRef(null);
    const sidebarRef = useRef(null);
    const { t } = useTranslation();

    const closeSidebar = () => {
        const overlay = overlayRef.current;
        const sidebar = sidebarRef.current;

        sidebar?.classList.remove("active");
        setTimeout(() => {
            overlay?.classList.remove("active");
        }, 200);
    };

    useEffect(() => {
        const menuBtn = document.querySelector(".nav-btn");
        const closeBtn = sidebarRef.current?.querySelector(".close-btn");
        const overlay = overlayRef.current;
        const sidebar = sidebarRef.current;

        function openSidebar() {
        overlay.classList.add("active");
        setTimeout(() => {
            sidebar.classList.add("active");
        }, 200);
        }

        menuBtn?.addEventListener("click", openSidebar);
        closeBtn?.addEventListener("click", closeSidebar);
        overlay?.addEventListener("click", closeSidebar);

        return () => {
        menuBtn?.removeEventListener("click", openSidebar);
        closeBtn?.removeEventListener("click", closeSidebar);
        overlay?.removeEventListener("click", closeSidebar);
        };
    }, []);

    useEffect(() => {
        const dropdownBtns = sidebarRef.current?.querySelectorAll(".sidebar-dropdown-btn");

        function handleDropdownClick(e) {
        const btn = e.currentTarget;
        const dropdownMenu = btn.parentElement.nextElementSibling;
        const isOpen = dropdownMenu.classList.contains("active");

        sidebarRef.current
            .querySelectorAll(".sidebar-dropdown-menu")
            .forEach(menu => {
            menu.classList.remove("active");
            });

        if (!isOpen) dropdownMenu.classList.add("active");
        }

        dropdownBtns?.forEach(btn => {
        btn.addEventListener("click", handleDropdownClick);
        });

        return () => {
        dropdownBtns?.forEach(btn => {
            btn.removeEventListener("click", handleDropdownClick);
        });
        };
    }, []);

    return (
        <div>
        <div ref={overlayRef} className="sidebar-overlay"></div>
        <div ref={sidebarRef} className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="/assets/images/marko-logo.png" className="site-logo img-fluid logo" alt="Logo" />
                </div>
                <div className="d-flex align-items-center gspace-2">
                    <button className="close-btn" onClick={closeSidebar}><span>X</span></button>
                    <LanguageSwitcher />
                </div>
            </div>
            <ul className="menu">
                <li><NavLink to="/" onClick={closeSidebar}>{t("nav.home")}</NavLink></li>
                <li><NavLink to="/service" onClick={closeSidebar}>{t("nav.services")}</NavLink></li>
                <li><NavLink to="/case_studies" onClick={closeSidebar}>{t("nav.caseStudies")}</NavLink></li>
                <li><NavLink to="/testimonial" onClick={closeSidebar}>{t("nav.testimonials")}</NavLink></li>
                <li><NavLink to="/pricing" onClick={closeSidebar}>{t("nav.pricing")}</NavLink></li>
                <li><NavLink to="/blog" onClick={closeSidebar}>{t("nav.blog")}</NavLink></li>
                <li><NavLink to="/contact" onClick={closeSidebar}>{t("nav.contact")}</NavLink></li>
            </ul>
        </div>
        </div>
    );
    }

export default Sidebar;
