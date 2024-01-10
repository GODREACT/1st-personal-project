import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './main.css';
import Astronaut from "./3Dimg";

function Searchbar(props) {
  const [enteredKeyword, setEnteredKeyword] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault();
    setEnteredKeyword(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.keyCode === 13) {
    //   props.searchHandler(enteredKeyword, e.keyCode);
      navigate(`/search/${enteredKeyword}`);
      setEnteredKeyword("");
    }
  };

  return (
    <div id="search_container_a">
      <input
        type="search"
        name="search"
        id="custom_input_searchbar"
        className="custom_input"
        onKeyDown={enterHandler}
        onChange={changeHandler}
        placeholder="검색어를 입력해주세요"
        
      />
      <div id='Astronaut_container'>
        <Astronaut/>
      </div>
     
    </div>
  );
}

export default Searchbar;