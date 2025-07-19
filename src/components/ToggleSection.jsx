import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ToggleSection( { title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-lg border border-gray-900 mb-4">
            <div
                className="items-center cursor-pointer hover:bg-gray-900 transition"
                onClick={() => setOpen(!open)}
            >
                <div className="flex justify-between items-center px-2 py-2">
                <h3 className="px-2 py-2 font-semibold text-base md:text-lg text-gray-200">{title}</h3>
                {open ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 mr-4" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 mr-4" />
                )}  
                </div>

            {open && (
                <div className="ml-4 px-4 py-4 text-sm leading-relaxed">
                    {children}
                </div>
            )}
            </div>
        </div>
    );
}