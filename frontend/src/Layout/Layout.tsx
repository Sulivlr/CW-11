import React, { PropsWithChildren } from 'react';
import AppToolBar from '../UI/AppBar/AppToolBar';

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <AppToolBar />
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;