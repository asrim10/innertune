import React from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const LandingNavbar = () => {
  const [mobileDrawer, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative tx-sm">
        <div className="flex justify-between items-center">
          <div className="flex-items-center flex-shrink-0">
            <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
            <span className="text-xl tracking-tight">Innertune</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-white hover:text-gray-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center items-center space-x-12">
            <a href="#" className="py-2 px-3 border rounded-md">
              Log In
            </a>
            <a
              href="#"
              className="bg-gradiant-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md"
            >
              Create an account
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawer ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileDrawer && (
          <div className="fixed right-0 z-20 bg-neutral900 w-full p-12 flex flex-col justigy-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Log In
              </a>
              <a
                href="#"
                className="py-2 rounded-md bg-gradient-to-r from-orange-400 to-orange-600"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
