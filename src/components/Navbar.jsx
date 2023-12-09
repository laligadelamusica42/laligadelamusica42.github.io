import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={`/`}>Inicio</Link>
            </li>
            <li>
              <Link href={`/events`}>
                Eventos
                <span className="ml-2 badge badge-primary">New</span>
              </Link>
            </li>
            <li>
              <Link href={`/contact`}>Contacto</Link>
            </li>
          </ul>
        </div>
        <a className="text-xl"><Image src={`/logo.png`} width={272} height={180} className="w-[75px] h-[45px]" /></a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link href={`/`}>Inicio</Link>
          </li>
          <li>
            <Link href={`/events`}>
              Eventos
              <span className="ml-2 badge badge-secondary">New</span>
            </Link>
          </li>
          <li>
            <Link href={`/contact`}>Contacto</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-neutral btn-circle" href="https://github.com/laligadelamusica42"><FaGithub size={30} /></a>
      </div>
    </div>
  );
};
