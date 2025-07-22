import React from 'react'

import Header from '../components/Header';

import pf1 from '../img/pf1.png'
import pf2 from '../img/pf2.png'
import pf3 from '../img/pf3.png'
import pf4 from '../img/pf4.png'
import pf5 from '../img/pf5.png'
import pf6 from '../img/pf6.png'
import pf7 from '../img/pf7.png'

export default function Works() {

    return (
        <section className="relative flex flex-col justify-center">
            <Header />
            
           {/* flowing Gradient */}
           <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-900
                bg-[length:200%_200%] bg-flowing z-0" />

            <div className="w-4xl mx-auto px-2 py-2 mt-30 flex gird grid-cols-2 z-10">
                <div className="w-1/2">
                    <h1 className="text-7xl text-left text-white/80 font-roboto font-bold">
                        Works
                    </h1>
                </div>
                <div className="w-1/2">
                    <h3 className="text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Ads
                    </h3>
                    <h3 className="text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        PR
                    </h3>
                    <h3 className="text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Making Film
                    </h3>
                    <h3 className="text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Documentary
                    </h3>
                </div>
            </div>

            { /* Portfolio Grid */}
            <div className="w-full mt-10">
                <div className="w-full backdrop-blur text-white/20 hover:text-white hover:bg-gradient-to-r from-transparent via-white/10 to-transparent transition flex items-center">
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            Volgas MotorSports
                        </h2>
                    </div>
                    <img src={pf5} alt="pf1" className="w-6/10" />
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            Documentary
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="w-full backdrop-blur text-white/20 hover:text-white hover:bg-gradient-to-r from-transparent via-white/10 to-transparent transition flex items-center">
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            Main Flower
                        </h2>
                    </div>
                    <img src={pf4} alt="pf1" className="w-6/10" />
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            PR
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="w-full backdrop-blur text-white/20 hover:text-white hover:bg-gradient-to-r from-transparent via-white/10 to-transparent transition flex items-center">
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            EDC Korea
                        </h2>
                    </div>
                    <img src={pf6} alt="pf1" className="w-6/10" />
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            After Movie
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="w-full backdrop-blur text-white/20 hover:text-white hover:bg-gradient-to-r from-transparent via-white/10 to-transparent transition flex items-center">
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            Valorant
                        </h2>
                    </div>
                    <img src={pf7} alt="pf1" className="w-6/10" />
                    <div className="w-2/10">
                        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
                            Sketch Film
                        </h2>
                    </div>
                </div>
            </div>

        </section>
    );
}