import React from "react";
import "./nav.scss";
import { Outlet, Link } from "react-router-dom";

const TopNav = () => {
  return <div className="top_navigation"> Top Navigation</div>;
};

const SideNav = () => {
  return (
    <div className="left_nav">
      <Link to="/">
        <span>Dashboard</span>
      </Link>
      <Link to="/billings">
        <span>Billing</span>
      </Link>
      <Link to="/products">
        <span>Products</span>
      </Link>
      <Link to="/drugs/create">
        <span>Drug Board</span>
      </Link>
      <Link to="/drugs/categories">
        <span>Drug Categories</span>
      </Link>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main_content">
      <Outlet />
    </div>
  );
};

export const Layout = () => {
  return (
    <section>
      <TopNav />
      <div className="page">
        <SideNav />
        <MainContent />
      </div>
    </section>
  );
};
