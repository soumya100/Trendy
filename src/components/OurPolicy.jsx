import React, { useMemo } from "react";
import { assets } from "../assets/assets";
import text from "../languages/en.json";

const OurPolicy = () => {
  const policies = useMemo(
    () => [
      {
        icon: assets.exchange_icon,
        title: text.firstpolicytitle,
        description: text.firstpolicydescription,
      },
      {
        icon: assets.quality_icon,
        title: text.secondpolicytitle,
        description: text.secondpolicydescription,
      },
        {
        icon: assets.support_img,
        title: text.thirdpolicytitle,
        description: text.thirdpolicydescription
        },
    ],
    []
  );

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map((policyItem, idx) => (
        <div key={idx}>
          <img
            src={policyItem.icon}
            className="w-12 m-auto mb-5"
            alt="policy icon"
          />
          <p className="font-semibold">{policyItem.title}</p>
          <p className="text-gray-400">{policyItem.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
