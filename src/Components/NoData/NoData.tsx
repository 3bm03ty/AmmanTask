import React from "react";
import noDataImg from "../../assets/imgs/nodata.png";
import noDataImg1 from "../../assets/imgs/7438848.webp";
const NoData = () => {
  return (
    <div className="p-3 m-auto text-center">
      <img className="w-50" src={noDataImg1} alt="" />
      <h2>No Data Founded</h2>
    </div>
  );
};

export default NoData;
