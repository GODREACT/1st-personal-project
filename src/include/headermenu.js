import { Link } from 'react-router-dom';
import './headermenu.css';

function Headermenu(){
  return(
    <div id='Headermenu_list'>
      <Link to='/htmlboard'><button id='Headermenu_list_btn'>HTML</button></Link>
      <Link to='/cssboard'><button id='Headermenu_list_btn'>CSS</button></Link>
      <Link to='/react'><button id='Headermenu_list_btn'>React</button></Link>
      <Link to='/javascript'><button id='Headermenu_list_btn'>javascript</button></Link>
      <Link to='mariadb'><button id='Headermenu_list_btn'>mariaDB </button></Link>
      <Link to='node'><button id='Headermenu_list_btn'>node.js </button></Link>
    </div>
  )
}

export default Headermenu;
