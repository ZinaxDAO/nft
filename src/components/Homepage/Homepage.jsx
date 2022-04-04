import React from "react";
import Introduction from "../Introduction/Introduction";
import Currency from "../Currency/Currency";
import Usecases from "../UseCases/Usecases";
import Team from "../Team/Team";
import Footer from "../../common/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <Introduction />
      <Currency />
      <Usecases />
      <Team />
      <Footer />
    </div>
  );
};

export default Homepage;
