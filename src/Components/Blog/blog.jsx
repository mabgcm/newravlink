import React from "react";
import BlogCard from "../Card/BlogCard";
import { blogs } from "../../Data/BlogPostData";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogSection() {
    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 m-0">
                        <div className="col col-lg-8 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInLeft" speed="fast">
                                <div
                                    className="d-flex flex-column gspace-2">
                                    <div className="sub-heading">
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <span>Insights & Trends</span>
                                    </div>
                                    <h2 className="title-heading">Latest Digital Marketing Strategies & Tips</h2>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col col-lg-4 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div
                                    className="d-flex flex-column gspace-2 justify-content-end h-100">
                                    <p>
                                        Explore our latest blog articles covering industry trends,
                                        expert insights, and actionable strategies to elevate your
                                        digital marketing game.
                                    </p>
                                    <div className="link-wrapper">
                                        <a href="./blog">View All Articles</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
