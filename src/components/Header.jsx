import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../img/wsk_logo_white.png'


export default function Header() {
    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-primary bg-opacity-70 border-b border-white/10">
            <div className="max-w-[300px] md:max-w-4xl mx-auto px-6 py-4 flex justify-between items-center
                rounded-lg border border-white/20 mt-5 mb-5 bg-white/5 backdrop-blur">

                { /* Logo */}
                <div className="mx-auto md:flex text-xl font-bold text-white">
                    <Link to="/">
                        <img src={logo} alt="wskcrw" className="w-[120px] hover:w-[125px] transition" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium text-white-700 mr-20">
                    {["About", "Portfolio", "Contact", "DagymGuide"].map((label) => (
                        <Link
                            key={label}
                            to={`/${label.toLowerCase()}`}
                            className="px-4 py-2 rounded-full hover:bg-white/20 text-white transition duration-200">
                                {label}
                            </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}