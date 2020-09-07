import React from 'react'
import MenuItems from './MenuItems'

const MobileMenu = ({ redirect }) => (
    <div className='mobile-menu'>
        <MenuItems showOnDesktop={false} redirect={redirect} />
    </div>
)

export default MobileMenu