import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from './MobileMenu';
import MenuItems from './MenuItems';

export const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        if (showMobileMenu) {
            setShowMobileMenu(false)
        } else {
            setShowMobileMenu(true)
        }
    }

    return (
        <div className='Header'>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <Link className="header item" to="/"><h3><i className="leaf icon"></i>.rinblog</h3></Link>
                    <MenuItems showOnDesktop={true} />
                    <a className='right menu item mobile' onClick={toggleMobileMenu}><i className='bars icon'></i></a>
                </div>
                {
                    showMobileMenu && <MobileMenu />
                }
            </div>
        </div>
    )
};

export default Header;