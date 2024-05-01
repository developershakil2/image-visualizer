import { ContextApi } from "../Utilities";
import React, { useContext, useState } from "react";

const TopNav = () => {
  // Accessing tools state from ContextApi
  const { tool1, tool2, tool3, tool4, tool5 } = useContext(ContextApi);

  // State to manage the background color of each icon button
  const [ic1, setIc1] = useState('');
  const [ic2, setIc2] = useState('');
  const [ic3, setIc3] = useState('');
  const [ic4, setIc4] = useState('');
  const [ic5, setIc5] = useState('');

  // Functions to handle icon button clicks
  const icf1 = () => {
    tool1(); // Call tool1 function from ContextApi
    setIc1('#ccc8c8'); // Change background color of icon 1 button
  }

  const icf2 = () => {
    tool2(); // Call tool2 function from ContextApi
    setIc2('#ccc8c8'); // Change background color of icon 2 button
  }

  const icf3 = () => {
    tool3(); // Call tool3 function from ContextApi
    setIc3('#ccc8c8'); // Change background color of icon 3 button
  }

  const icf4 = () => {
    tool4(); // Call tool4 function from ContextApi
    setIc4('#ccc8c8'); // Change background color of icon 4 button
  }

  const icf5 = () => {
    tool5(); // Call tool5 function from ContextApi
    setIc5('#ccc8c8'); // Change background color of icon 5 button
  }

  // State and function to handle the toggle switch
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked(prevState => !prevState);
  };

  return (
    <>
      <div className=" w-full h-[80px] flex justify-between items-center py-2 px-4 bg-white">
        <div className="left_top_side flex justify-start items-center h-[80px]">
          <button className="rounded-full hover:ring-[#5c5a5a] mr-3 p-2 ring-1 ring-inset ring-black">
            <img className="w-[25px] h-[25px] " src="images/left-arrow.png" alt="left arrow"/>
          </button>
          <img className="h-[70px] w-[65px] mr-3 hidden md:block" src="images/repeat-x.jpg" alt="wall"/>
          <div className="hidden md:block">
            <h2 className="font-bold text-lg">Map Of The World</h2>
            <h3>SKU 13475</h3>
          </div>
        </div>

        <div className="middle_top_side hidden md:flex items-center">
          {/* Icon buttons */}
          <button style={{ backgroundColor: ic1 }} onClick={icf1} className={`w-[100px] text-center flex justify-center items-center flex-col h-[80px]  hover:bg-[#ccc8c8]`}>
            <img className="w-[30px] h-[30px] object-cover" src="images/icon1.png" alt="icon 1"/>
            <span className="text-xs ">Show ruler</span>
          </button>

          <button style={{ backgroundColor: ic2 }} onClick={icf2} className="w-[100px] text-center flex justify-center items-center flex-col h-[80px] hover:bg-[#ccc8c8]">
            <img className="w-[30px] h-[30px] object-cover" src="images/icon2.png" alt="icon 1"/>
            <span className=" text-xs">Show Lengths</span>
          </button>

          <button style={{ backgroundColor: ic3 }} onClick={icf3} className="w-[100px] text-center flex justify-center items-center flex-col h-[80px] hover:bg-[#ccc8c8]">
            <img className="w-[30px] h-[30px] object-cover" src="images/icon3.png" alt="icon 1"/>
            <span className=" text-xs">Grayscale</span>
          </button>

          <button style={{ backgroundColor: ic4 }} onClick={icf4} className="w-[100px] text-center flex justify-center items-center flex-col h-[80px] hover:bg-[#ccc8c8]">
            <img className="w-[30px] h-[30px] object-cover" src="images/icon4.png" alt="icon 1"/>
            <span className="text-xs ">Rotate</span>
          </button>

          <button style={{ backgroundColor: ic5 }} onClick={icf5} className="w-[100px] text-center flex justify-center items-center flex-col h-[80px] hover:bg-[#ccc8c8]">
            <img className="w-[30px] h-[30px] object-cover" src="images/icon5.png" alt="icon 1"/>
            <span className=" text-xs">Flip</span>
          </button>
        </div>

        <div className="right_top_side">
          {/* Toggle switch */}
          <div className="flex md:hidden">
            <label className="switch">
              <input type="checkbox" className="hidden" checked={isChecked} onChange={toggleSwitch} />
              <div className="slider-container w-12 h-6 rounded-full bg-gray-400 relative" onClick={toggleSwitch}>
                <div className={`slider absolute w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isChecked ? 'transform translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;
