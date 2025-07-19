import React from 'react'

import Header from '../components/Header';
import bgVideo from '../../src/bg.mp4'

export default function Home() {
    return(
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center
            bg-gradient-to-br from-[#0f127a] via-[#1e293b] to-[#1c1c1c] text-white px-6">
            {/* Overlay */}
            {/* Header Positioning */}
            <Header />

            <div className="absolute inset-0 bg-black/10 z-0" />

            {/* flowing Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-800 to-orange-500
                bg-[length:200%_200%] bg-flowing z-10" />

            {/* glassmorphism */}
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-xl bg-white/10 z-20" />

            {/* Center Circle Gradient */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-white/20 via-pink-300/30 to-transparent
                            blur-xl opacity-70 z-20 pointer-events-none" />

            {/* Main Text */}
            <div className="relative z-30 space-y-6">
                <h1 className="text-5xl md:text-7xl font-light font-clash leading-tight tracking-tight">
                    We SKetch Keyframes
                </h1>
                <p className="text-lg md:text-xl font-light">
                    SYMPHATIC, AUTHENTIC, CONTEMPORARY. IN SEOUL
                </p>
            </div>
        </section>
    );
}



/*
<div className="relative w-[640px] h-[640px] overflow-hidden flex mx-auto justify-center">
            
                <video autoPlay muted loop playsInline
                    className="justify-center mx-auto flex w-full h-full object-cover">
                    <source src={bgVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_30%,_rgba(10,10,19,1)_60%,_rgba(10,10,19,1)_100%)]" />
                <div className="absolute inset-0 z-20 justify-center items-center flex text-white text-6xl font-bold">
                    WELCOME
                </div>
                <p className="absolute inset-0 z-20 justify-center items-center flex mt-30 text-white text-xl font-light">
                    Here is WSKCRW.
                </p>
            
        </div>
*/