import React, { useState, useEffect, useContext } from 'react';
import { ContextApi } from '../Utilities';

const SideNav = () => {
    // Context
    const { width, setWidth, height, setHeight } = useContext(ContextApi);

    // State variables
    const [paperType, setPaperType] = useState('Traditional');
    const [totalPrice, setTotalPrice] = useState(null);
    const [sqPrice, setSqPrice] = useState(null);
    const [check, setCheck] = useState(true)
    const [check1, setCheck1] = useState(false)
    const [orderComment, setOrderComment] = useState('');
    const [orderCommentIsActive, setOrderCommentIsActive] = useState(false);
    const [priceWrapper, setPriceWrapper] = useState(-99999999);
    const [sq, setSq] = useState(-99999999);
    const [pop1, setPop1] = useState(false);
    const [pop2, setPop2] = useState(false);
    const [cm, setCm] = useState('cm');
    const [inch, setInch] = useState('In');
    
    // Function to calculate area
    const calculateArea = (width, height) => {
        // Convert width and height from cm to sq ft
        const widthInFeet = width * 0.0328084;
        const heightInFeet = height * 0.0328084;
        return widthInFeet * heightInFeet;
    };

    const [selectTi, setSelectTi] = useState(null)

    // Function to calculate price
    const calculatePrice = (area) => {
        let pricePerSquareFoot;
        if (paperType === 'Traditional') {
                setSelectTi('Traditional | Mattic ™')
            pricePerSquareFoot = 6.24;
        } else {
            pricePerSquareFoot = 7.55;
            setSelectTi('Peel | Mattic ™')

        }
        return area * pricePerSquareFoot;
    };
    
    // useEffect to handle changes in paperType and width
    useEffect(() => {
        handleSubmit();
    }, [paperType, width]);

    // Function to handle form submission
    const handleSubmit = () => {
        const area = calculateArea(width, height);
        const totalPrice = calculatePrice(area);
        setSqPrice(area.toFixed(2));
        setTotalPrice(totalPrice.toFixed(2));
        // Here you would typically send the order details to a server
    };

    // Function to handle selection of Traditional paper type
    const priceSelect1 = () => {
        const pr = document.querySelector('.price-select1');
        if (pr) {
            pr.click();
        }
        setCheck(true)
        setCheck1(false)
        setPaperType('Traditional');
    };

    // Function to handle selection of Peel paper type
    const priceSelect12 = () => {
        const pr = document.querySelector('.price-select2');
        if (pr) {
            pr.click();
        }
        setCheck(false)
        setCheck1(true)
        setPaperType('Peel');
    };

    // Function to handle price wrapper visibility
    const priceWrapperFunc = () => {
        setPop1(true);
        setPop2(false);
        setPriceWrapper(-160);
    };

    // Function to handle square visibility
    const sqFunc = () => {
        setPop2(true);
        setPop1(false);
        setSq(-160);
    };

    return (
        <>
            {/* Left Side Wrapper */}
            <div className="leftSideWrapper md:static bg-white md:w-[440px] md:p-4 h-full overflow-y-scroll">
                {/* Wall Dimensions */}
                <div className="flex justify-between">
                    <h2 className="font-black hidden md:flex text-lg">Wall Dimensions</h2>
                    <button className="underline hidden md:flex items-center">
                        <img className="w-[18px] h-[18px]" src="images/link.png" alt="" /> How to Measure
                    </button>
                </div>

                {/* Width and Height Input */}
                <div style={{ top: pop1 ? priceWrapper : -999999 }} className={`w_input flex z-20 h-screen md:h-auto justify-center items-end absolute md:static w-full left-0 bg-[#00000076] md:bg-transparent`}>
                    <div className="w-full bg-white p-4 md:p-0">
                        <button onClick={() => setPriceWrapper(-9999999)} className="outline-none w-full flex md:hidden justify-end">
                            <img className="h-[27px] w-[30px]" src="images/close.png" alt="close" />
                        </button>
                        <div className="flex justify-between">
                            <h3 className="mt-8">Width</h3>
                            <h3 className="mt-8">Height</h3>
                        </div>
                        <div className="w-full flex flex-between items-center gap-3 ">
                            <div className="input_wrap flex justify-between items-center border-black border-[1px] pl-2 w-[50%] h-[50px] bg-[#e2e0e0]">
                                <img className="w-[20px] mx-auto h-[10px]" src="images/leftright.png" alt="leftright" />
                                <div className="w-[70%] flex items-center ring-1 ring-inset ring-black">
                                    <input onChange={(e) => setWidth(e.target.value)} className="w-[70%] border-b-[1px] border-l-[1px] border-t-[1px] border-[black] h-[50px] text-center font-normal outline-none" value={width} />
                                    <select defaultValue={inch} className="bg-white h-[45px]">
                                        <option>{cm}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input_wrap flex justify-between items-center border-black border-[1px] pl-2 w-[50%] h-[50px] bg-[#e2e0e0]">
                                <img className="w-[10px] mx-auto h-[20px]" src="images/topbottom.png" alt="leftright" />
                                <div className="w-[70%] flex items-center ring-1 ring-inset ring-black">
                                    <input onChange={(e) => { setHeight(e.target.value) }} className="w-[70%] border-b-[1px] border-l-[1px] border-t-[1px] border-[black] h-[50px] text-center font-normal outline-none" value={height} />
                                    <select defaultValue={cm} className="bg-white h-[45px]">
                                        <option>{cm}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <p className="mt-5">
                            Please make sure to add 4 inches (10 cm) to both the width and height to have some flexibility during installation.
                        </p>
                    </div>
                </div>

                {/* Choose Paper Type */}
                <div style={{ top: pop2 ? sq : -999999 }} className={`flex z-30 h-screen md:h-auto justify-center items-end fixed md:static w-full left-0 bg-[#00000076] md:bg-transparent`}>
                    <div className="mt-8 bg-white w-full p-6 md:p-0 ">
                        <button onClick={() => setSq(-9999999)} className="outline-none w-full flex md:hidden justify-end">
                            <img className="h-[27px] w-[30px]" src="images/close.png" alt="close" />
                        </button>
                        <h2 className="font-medium text-xl">Choose Paper Type</h2>
                        <div className="mt-3 p-2 w-full flex justify-between items-center cursor-pointer border-[1px] border-[black] md:p-3 ">
                            <div className="w-full" onClick={priceSelect1}>
                                <h5 className="text-xs">Traditional | Rebel Mattic ™</h5>
                                <h5 className="text-xs">Paste-the-wall | Non-woven | Matte Surface</h5>
                                <h5 className="text-xs font-medium">$6.24 / sq ft</h5>
                            </div>
                            <input checked={check} className="bg-black border-black price-select1" type="radio" name="sq" />
                        </div>
                        <div className="mt-3 flex justify-between items-center cursor-pointer border-[1px] border-[black] p-3 ">
                            <div className="w-full" onClick={priceSelect12}>
                                <h5 className="text-xs">Peel & Stick | Rebel Mattic ™</h5>
                                <h5 className="text-xs">Self-adhesive | Non-woven | Matte Surface</h5>
                                <h5 className="text-xs font-medium">$7.55 / sq ft</h5>
                            </div>
                            <input checked={check1} type="radio" className="bg-black border-[black] price-select2" name="sq" />
                        </div>
                    </div>
                </div>

                {/* Add Order Comment */}
                <div className="hidden md:flex w-full">
                    {orderCommentIsActive == true ?
                        <div className="hidden md:flex flex-col md:w-full mt-2">
                            <h2 className="text-xl font-mediu ">Add Order Comment</h2>
                            <div className="mt-1 w-full border-[1px] border-black ">
                                <textarea onChange={(e) => setOrderComment(e.target.value)} value={orderComment} placeholder='' className="w-full outline-none px-2"></textarea>
                            </div>
                        </div>
                        :
                        <button onClick={() => setOrderCommentIsActive(true)} className="text-xs flex items-center underline mt-5">
                            <img className="pr-1 w-[20px] h-[20px]" src="images/write.png" alt="write" /> Add Order Comment
                        </button>
                    }
                </div>

                {/* Price */}
                <h2 className="mt-4 hidden md:flex text-xl">Price: <span className="font-medium "> ${totalPrice}</span></h2>

                {/* Add to Cart Button */}
                <button className="outline-none hidden md:flex justify-center mt-4 text-xl bg-[#579e42] hover:bg-[#6aa358] text-center p-5 w-full font-black text-white">ADD TO CART</button>
            </div>

            {/* Mobile Bottom Wrapper */}
            <div className="mobile_bottom_wrapper bg-white md:bg-transparent z-40 w-full fixed bottom-0 left-0 flex flex-col md:hidden">
                <div className="w-full flex justify-between ">
                    <button className="border-r-[1px] w-[33.33%] border-t-[1px] border-[#59595972] p-3">
                        <img className="w-[25px] h-[25px] " src="images/gallery.png" alt="gallery" />
                        <p className="text-start text-xs mt-1">Map of the World</p>
                    </button>
                    <button onClick={() => priceWrapperFunc()} className="border-r-[1px] w-[33.33%] border-t-[1px] border-[#59595972] p-3">
                        <img className="w-[18px] h-[25px] " src="images/topbottom.png" alt="topbottom" />
                        <p className="text-start text-xs mt-1">{width}  x {height} </p>
                    </button>
                    <button onClick={() => sqFunc()} className="border-r-[1px] w-[33.33%] border-t-[1px] border-[#59595972] p-3">
                        <img className="w-[25px] h-[25px] " src="images/page.png" alt="page" />
                        <p className="text-start text-xs mt-1">{selectTi} </p>
                    </button>
                </div>
                <button className="outline-none flex md:hidden flex-col justify-center items-center text-md bg-[#579e42] hover:bg-[#6aa358] text-center py-3 w-full font-black text-white">ADD TO CART <span>$24535</span></button>
            </div>
        </>
    )
}

export default SideNav;
