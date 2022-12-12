import React, { useRef } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import "./NavBar.css"

function NavBar() {

    const navRef = useRef();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const showNavBar = () =>{
        navRef.current.classList.toggle("responsive_nav")
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

return (
    <div className="main_nav_wrapper">
        <div className='nav-wrap'>
            <div className="logo-holder logo-10">
                <a href="">
                    <h3><strong>Robot Mixology</strong></h3>
                    <p>&nbsp;</p>
                </a>
            </div>
        </div>
        <nav ref={navRef}>
            <Link to='/' onClick={showNavBar} style={{textDecoration:"None"}}><div className="nav_link" ><strong>Home</strong></div></Link>
            <br/>
            <Link to='/contact'  onClick={showNavBar} style={{textDecoration:"None"}}><div className="nav_link" ><strong>Contact</strong></div></Link>
            <Button 
            className="nav_btn nav_close_btn"
            onClick={showNavBar}
            endIcon={<CloseIcon style={{fontSize: 'min(10vw, 48px)', fontWeight:"bold"}}/>} />
        </nav>
        <Button 
        className="nav_btn"
        onClick={showNavBar}
        endIcon={<MenuIcon style={{fontSize: 'min(10vw, 48px)', fontWeight:"bold"}}/>} />
    </div>    
)
}

export default NavBar