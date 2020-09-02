import React from 'react';
import MenuItems from './MenuItems';

const MobileMenu = () => (
    <>
        <div className="mobile-menu">
            <MenuItems showOnDesktop={false} />
        </div>
    </>
)

export default MobileMenu;