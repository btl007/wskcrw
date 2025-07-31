import React from 'react'

import Header from '../components/Header';

import pf3 from '../img/pf3.png'
import pf4 from '../img/pf4.png'
import pf5 from '../img/pf5.png'
import pf6 from '../img/pf6.png'
import pf7 from '../img/pf7.png'

const portFolio = [
    {   title: "Volgas Motorsports", prop: "Documentary", description: "GT Asia Challenge Documentary", client: "Volgas", 
        img: pf5,  
    },
    {   title: "EDC Korea 2024", prop: "After Movie", description: "EDC Korea festival 2024 After Movie", client: "EDC", 
        img: pf6,  
    },
    {   title: "VCT Pacific 2024", prop: "Sketch Film", description: "Valorant Pacific 2024 Sketch Film", client: "SOOP Korea", 
        img: pf7,  
    },
    {   title: "Main Flower Ads", prop: "Ads", description: "Main Flower 2025 Ads", client: "Main Flower", 
        img: pf4,  
    },
    {   title: "Audi Korea", prop: "Ads", description: "A story of progress Contents", client: "Audi korea", 
        img: pf3,  
    },
];


export default function Works() {

    return (
        <section className="relative flex flex-col justify-center">
            <Header />
            
           {/* flowing Gradient */}
           <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-900
                bg-[length:200%_200%] bg-flowing z-0" />

            <div className="w-4xl mx-auto px-2 py-2 mt-30 flex-col md:grid grid-cols-2 z-10">
                <div className="w-1/2 ml-5 md:ml-0">
                    <h1 className="text-4xl md:text-7xl text-left text-white/80 font-roboto font-bold">
                        Works
                    </h1>
                </div>
                <div className="w-1/2 ml-5 md:ml-0">
                    <h3 className="text-xl md:text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Ads
                    </h3>
                    <h3 className="text-xl md:text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        After Movie
                    </h3>
                    <h3 className="text-xl md:text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Sketch Film
                    </h3>
                    <h3 className="text-xl md:text-3xl text-left text-white/50 hover:text-white font-roboto font-bold">
                        Documentary
                    </h3>
                </div>
            </div>

            <div className="mt-10 md:mt-20" />
            
            <div className="mx-auto h-full max-w-[1680px] flex-col md:grid md:grid-cols-2 justify-between px-4 space-x-10 space-y-10">
            {/* Drop Grid */}
                { portFolio.map((item, idx) => (
                    <div key={idx} className="relative w-[500px] h-[290px] rounded-2xl justify-between hover:scale-105 transition">
                        <img src={item.img} alt="" className="h-[290px] object-cover rounded-2xl" />
                        <div className="absolute inset-0 flex flex-col px-5 py-5 text-white font-roboto font-bold justify-between">
                            <div className="flex justify-between">
                                <div className="">{item.client}</div>
                                <span className="items-center rounded bg-white/30 px-3 font-medium backdrop-opacity-30 h-6">{item.prop}</span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl text-left">{item.title}</h3>
                                <p className="text-lg text-left">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        <div className="mt-20 mb-20"></div>

            

        </section>
    );
}

/*
<div className="w-full mt-10">
<div className="w-full backdrop-blur text-white/20 hover:text-white hover:bg-gradient-to-r from-transparent via-white/10 to-transparent transition flex items-center overflow-hidden">
    <div className="w-2/10">
        <h2 className="text-center font-clash font-bold text-lg md:text-xl lg:text-3xl py-5 px-5">
            Volgas MotorSports
        </h2>
    </div>
    <div className="w-6/10 hover:scale-102 transition duration-300">
        <div className="w-full fixed inset-0 hover:bg-black/20 transition duration-300 z-10" />
        <img src={pf5} alt="pf1" className="" />
        
    </div>
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
</div> */