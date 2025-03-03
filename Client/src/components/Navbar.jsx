import { Menu, X, User } from "lucide-react";
import React from "react";
import logo from "../assets/logo.svg";
import PropTypes from "prop-types";
import axios from "axios";

const Navbar = (props) => {
  const [mobileMenuOpen, setMobileMenu] = React.useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(false);

  function toggleMobileMenu() {
    setMobileMenu(!mobileMenuOpen);
  }

  function toggleAvatarMenu() {
    setAvatarMenuOpen(!avatarMenuOpen);
  }

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout");
      localStorage.removeItem("userName");
      props.setName("");
      props.setLog(false);
      setAvatarMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-md border-b-1 border-[#AD49E1]">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <a href="/">
              <img className="icon h-10 w-10 mr-2" src={logo} alt="logo" />
            </a>
            <a href="/">
              <span
                className="font text-xl tracking-tight"
                style={{ fontSize: 25 }}
              >
                Writography
              </span>
            </a>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            <li className="font">
              <a href="/">Home</a>
            </li>
            <li className="font">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="font">
              <a href="/blogs">Blogs</a>
            </li>
            <li className="font">
              <a href="/about">About</a>
            </li>
          </ul>
          {props.signedIn ? (
            <div className="relative hidden lg:flex items-center">
              <button
                onClick={toggleAvatarMenu}
                className="p-2 rounded-full bg-gray-200"
              >
                <User size={24} />
              </button>
              {avatarMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 px-4">
                  <button
                    onClick={handleLogout}
                    className="font py-2 px-4 border rounded-md w-full text-left"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex space-x-6">
              <a href="/login" className="font py-3 px-5 border rounded-3xl">
                Sign In
              </a>
              <a
                href="/register"
                className="font bg-gradient-to-r from-purple-700 to-purple-950 py-3 px-5 rounded-3xl"
              >
                Create an Account
              </a>
            </div>
          )}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li className="font py-4">
                <a href="/">Home</a>
              </li>
              <li className="font py-4">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="font py-4">
                <a href="/blogs">Blogs</a>
              </li>
              <li className="font py-4">
                <a href="/about">About</a>
              </li>
            </ul>
            {props.signedIn ? (
              <button
                onClick={handleLogout}
                className="font py-2 px-3 border rounded-md"
              >
                Log out
              </button>
            ) : (
              <div className="flex space-x-6">
                <a href="/login" className="font py-2 px-3 border rounded-md">
                  Sign In
                </a>
                <a
                  href="/register"
                  className="font bg-gradient-to-r from-purple-700 to-purple-1100 py-2 px-3 rounded-md"
                >
                  Create an Account
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default Navbar;
