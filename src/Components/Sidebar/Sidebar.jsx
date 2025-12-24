import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function Sidebar() {
    const overlayRef = useRef(null);
    const sidebarRef = useRef(null);
    const { t } = useTranslation();

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

        function closeSidebar() {
        sidebar.classList.remove("active");
        setTimeout(() => {
            overlay.classList.remove("active");
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
                <button className="close-btn"><span>X</span></button>
            </div>
            <ul className="menu">
                <li><a href="/">{t("nav.home")}</a></li>
                <li><a href="/service">{t("nav.services")}</a></li>
                <li><a href="/case_studies">{t("nav.caseStudies")}</a></li>
                <li><a href="/testimonial">{t("nav.testimonials")}</a></li>
                <li><a href="/pricing">{t("nav.pricing")}</a></li>
                <li><a href="/blog">{t("nav.blog")}</a></li>
                <li><a href="/contact">{t("nav.contact")}</a></li>
            </ul>
        </div>
        </div>
    );
    }

export default Sidebar;
