import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import MenuItems from './MenuItems'

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const menuIcon = !showMobileMenu ? 'bars icon' : 'close icon'

    return (
        <nav className='Header'>
            <div className='ui fixed inverted menu'>
                <div className='ui container'>
                    <Link className='header item' to='/'>
                        <h3><i className='leaf icon'></i>.rinblog</h3>
                    </Link>
                    <MenuItems showOnDesktop={true} />
                    <a className='right menu item mobile' onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <i className={menuIcon}></i>
                    </a>
                </div>
                {showMobileMenu && <MobileMenu />}
            </div>
        </nav>
    )
}

export default Header