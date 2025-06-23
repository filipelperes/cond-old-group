import { memo } from "react";

const Spinner = memo(() => {
   return (
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
         <div
            className="
            animate-spin
            rounded-full
            h-12
            w-12
            border-t-4
            border-b-4
            border-b-blue-500
            border-t-gray-500
            "
         >
         </div>
         <p className="loading-dots !mt-5 font-inter text-gray-600 text-lg">Loading</p>
      </div>
   );
});

export default Spinner;