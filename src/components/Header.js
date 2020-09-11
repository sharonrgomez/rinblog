import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import MenuItems from './MenuItems'

const Header = ({history}) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const menuIcon = !showMobileMenu ? 'bars icon' : 'close icon'

    const nodeRef = useRef()

    const closeMobileMenuAndRedirect = (path) => () => {
        setShowMobileMenu(false)
        history.push(path)
    }

    const closeOnOutsideClick = (event) => {
        if (!nodeRef.current.contains(event.target)) {
            setShowMobileMenu(false)
        }
    }

    useEffect(() => {
        if (showMobileMenu) {
            document.addEventListener('mousedown', closeOnOutsideClick)
        } else {
            document.removeEventListener('mousedown', closeOnOutsideClick)
        }
        return () => {
            document.removeEventListener('mousedown', closeOnOutsideClick)
        }
    }, [showMobileMenu])

    return (
        <nav id='navbar' ref={nodeRef}>
            <div className='ui fixed inverted menu'>
                <div className='ui container'>
                    <Link className='header item' to='/'>
                        <h3><i className='leaf icon'></i>.rinblog</h3>
                    </Link>
                    <MenuItems
                        redirect={closeMobileMenuAndRedirect}
                        showOnDesktop={true}
                    />
                    <a className='right menu item mobile' onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <i className={menuIcon}></i>
                    </a>
                </div>
                {showMobileMenu && <MobileMenu redirect={closeMobileMenuAndRedirect} />}
            </div>
        </nav>
    )
}

export default Header