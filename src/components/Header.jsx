import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import logo from '../img/wsk_logo_white.png'

export default function Header() {
    const [isMObileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: "About", to: "about", },
        { label: "Works", to: "works", },
        { label: "Contact", to: "contact", },
        { label: "DagymGuide", to: "dagymguide", },
    ]

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
                    {menuItems.map((menu, idx) => (
                        <Link
                            key={idx}
                            to={`/${menu.to}`}
                            className="px-4 py-2 rounded-full hover:bg-white/20 text-white transition duration-200">
                                {menu.label}
                            </Link>
                    ))}
                </nav>

                { /* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 text-white hover:scale-105 transition"
                    onClick={() => setIsMobileMenuOpen(!isMObileMenuOpen)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* AnimatePresence Manage */}
            <AnimatePresence>
                {/* Mobile Menu Overlay + Drawer */}
                {isMObileMenuOpen && (
                    <>
                        {/* bg Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 z-40"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* DropDown Menu */}
                        <motion.div className="absolute top-0 left-0 w-full bg-white/20 text-white z-50
                                        flex flex-col items-center py-10 space-y-6 backdrop-blur border-white/10 rounded-b-lg"
                                    initial={{ y: -300, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -300, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                        >
                            {menuItems.map((menu, idx) => (
                                <Link key={idx} to={`${menu.to}`} className="text-lg font-unbounded hover:text-yellow-400 transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {menu.label}
                                </Link>
                            ))}                    
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}