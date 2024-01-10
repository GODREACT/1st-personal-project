import React, {useState, useEffect, useRef} from "react";
import './header.css';
import Headermenu from "./headermenu";
import { Link } from "react-router-dom";
import { getCookie, delCookie } from "../customer/cookies";
import Searchbar from "../main/searchbar";

function Header() {
  const ex = useRef(document.getElementById('header-container'));
  const cookie = getCookie('loginCookie');
  let context = null;

  if(cookie) {
    context = <p onClick={() => {
      delCookie('loginCookie');
      document.location.reload(true);
    }}>로그아웃</p>
  } else if(!cookie) {
    context = <a href='/members/login' onClick={() => {
      window.sessionStorage.setItem('BeforePage', window.location.pathname);
    }}>로그인</a>
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // setScrollY(scrollPosition)
    if(scrollPosition > 0) {
      ex.current.style.setProperty('top', '-50px');
    } else if(scrollPosition === 0) {
      ex.current.style.setProperty('top', '0px');
    }
  };

  useEffect( () => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  
  return(
    <header>
      <div id="header-wrapper">
        <div id="header-container" ref={ex}>
          <div id="header-topmenu-container">
            <div id="header-topmenu">
              <ul id="header-topmenu-navigation">
                <li>{context}</li>
              </ul>
            </div>
          </div>
          <div id="Headermenu">
            <div id="main_top_main">
              <div id="main_top">
                <Link to='./'><h1>홈페이지 이름 미정</h1></Link>
                <div>
                  <Searchbar/>
                </div>
              </div>
            </div>
            <div id="Headermenu_main">
              <Headermenu/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;