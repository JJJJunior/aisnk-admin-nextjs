import React from "react";
import Image from "next/image";

const Recommended = () => {
  return (
    <div>
      <h1>Recently Viewed</h1>
      <div className="flex flex-wrap">
        {/* Product cards */}
        <div>
          <Image
            src="http://175.178.190.62:8000/upload/images/20247/bc46160778698a8656b8b611a12361ab.jpeg"
            alt="pic"
            width={150}
            height={170}
          />
        </div>
      </div>
    </div>
  );
};

export default Recommended;
