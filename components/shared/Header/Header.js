import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useResizeDetector } from "react-resize-detector";

const BsNavLink = (props) => {
  const router = useRouter();
  const { href, title, className = "" } = props;
  return (
    <Link href={href}>
      <a
        className={`nav-link port-navbar-link ${className} ${
          href === router.asPath ? "active" : ""
        }`}
      >
        {title}
      </a>
    </Link>
  );
};

const LoginLink = () => <BsNavLink title="Login" href="/api/auth/login" />;
const LogoutLink = () => <BsNavLink title="Logout" href="/api/auth/logout" />;

const AdminDropDown = () => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle className="nav-link port-navbar-link " nav caret>
        admin
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            href="/portfolios/new"
            className="port-dropdown-item"
            title="create portfolio"
          />
        </DropdownItem>
        <DropdownItem>
          {" "}
          <BsNavLink
            href="/blogs/edit"
            className="port-dropdown-item"
            title="blog editor"
          />
        </DropdownItem>
        <DropdownItem />
        {/* divider */}
        <DropdownItem>
          {" "}
          <BsNavLink
            href="/dashboard"
            className="port-dropdown-item"
            title="dashboard"
          />
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const Header = () => {
  const { width, height, ref } = useResizeDetector();

  const [isOpen, setIsOpen] = useState(false);

  const { user, error, isLoading } = useUser();
  console.log(width);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div ref={ref}>
      <Navbar
        className={`port-navbar port-default absolute with-bg ${
          width < 1200 && isOpen ? "is-open" : "is-close"
        }`}
        // color="transparent"
        dark
        expand="xl"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="port-navbar-brand">Ilan Kanatenko</a>
          </Link>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolios" />
            </NavItem>
            <NavItem className="port-navbar-item">
              {/* <BsNavLink href="/blogs" title="Blogs" /> */}
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv" />
            </NavItem>
            {/* <NavItem className="port-navbar-item">
            <BsNavLink href="/secret" title="Secret" />
          </NavItem> */}
          </Nav>
          <Nav>
            {user &&
              user["https://ilanportfolio.com/access"][0] === "admin" && (
                <AdminDropDown />
              )}

            {isLoading ? (
              <></>
            ) : (
              <NavItem className="port-navbar-item">
                {user ? <LogoutLink /> : <LoginLink />}
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
