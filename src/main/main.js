import "./main.css";
import Salary from "./salary";
import DeveloperLanguageRanking from "./DeveloperLanguageRanking";
import WebsiteCreationRate from "./websiteCreationRate";
import Headermenu from "../include/headermenu";
function Main() {


  return (
    <div>
      <div id="main_container">
       
        <WebsiteCreationRate/>
        <div id="main_mid">
          <Salary/>
          <DeveloperLanguageRanking/>
        </div>
      </div>
    </div>
  );
};

export default Main;
