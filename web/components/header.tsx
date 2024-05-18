import React from 'react';

import { HeaderLogo } from './header-logo';
import { Navigation } from './navigation';
import { UserMenu } from './user-menu';
import { WelcomeMsg } from './welcome-msg';

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex justify-between items-center mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserMenu />
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};

export { Header };
