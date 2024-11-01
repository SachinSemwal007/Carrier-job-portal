import React from "react";

const Howtoapply = () => {
    return (
        <footer className="bg-gray-800 text-white py-3 border-4 border-red-500">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 text-center  ">
                    <h2 className="text-[18px] font-bold text-white">
                        <a 
                            href="/HowtoApply.pdf" 
                            download 
                            className="hover:underline" 
                        >
                            How To Apply
                        </a>
                    </h2>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Howtoapply;
