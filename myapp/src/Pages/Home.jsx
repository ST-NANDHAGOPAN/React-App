import React from "react";
// import CricketStadium from "../component/Seat-Arrangement/seat";
import Seat1  from "../component/Seat-Arrangement/seat1";
// import UseMemo from "../component/Hooks/EuseMemo";
// import Basic from "../component/Formik/Basic";
function Home() {
  return (
    <div>
      <div className="">
       {/* <UseMemo/> */}
       {/* <Basic/> */}
       {/* <CricketStadium/> */}
       <Seat1 squareCount = {500}/>
      </div>
    </div>
  );
}

export default Home;
