import Link from 'next/link';
import { useEffect, useState } from 'react';


const Navbar = () => {
    const [state, setState] = useState(false);
    const [drapdownState, setDrapdownState] = useState({ isActive: false, idx: null });

    const navigation = [
        { title: "HOME", path: "/", isDrapdown: false,  },
        { title: "CAR RENTAL SERVICE", path: "/services", isDrapdown: false },
        // { title: "TOUR PACKAGES", path: "/tourpackage", isDrapdown: false },
        { title: "ABOUT US", path: "/aboutus", isDrapdown: false },
        { title: "CONTACT US", path: "/contactus", isDrapdown: false }
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".nav-menu")) setDrapdownState({ isActive: false, idx: null });
        };
    }, []);

    return (
        <>
            <nav style={{ backgroundColor: '#c9d454' }} className={`relative z-20 w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""}`}>
                <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <img
                                src="logo.png"
                                width={120}
                                height={50}
                                className='object-contain'
                                alt="Float UI logo"
                            />
                        </Link>
                        <div className="md:hidden">
                            <button className="text-gray-500 hover:text-gray-800"
                                onClick={() => setState(!state)}
                            >
                                {state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                        </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {navigation.map((item, idx) => (
                                <li key={idx} className="mb-2 md:mb-0">
                                    {item.isDrapdown ? (
                                        <button className="w-full flex items-center font-bold justify-between gap-1"
                                            onClick={() => setDrapdownState({ idx, isActive: !drapdownState.isActive })}
                                        >
                                            {item.title}
                                            {drapdownState.idx === idx && drapdownState.isActive ? (
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                  <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                              </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                            )}
                                        </button>
                                    ) : (
                                        <Link style={{ color: '#541e50' }} href={item.path} className="block text-lg font-bold">
                                            {item.title}
                                        </Link>
                                    )}
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            {state && (
                <div
                    className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setState(false)}
                ></div>
            )}
        </>
    );
};

export default Navbar;
