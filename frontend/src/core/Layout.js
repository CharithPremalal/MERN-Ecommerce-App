import React from 'react';
import Menu from './Menu';

const Layout = ({
  titel = 'Titel',
  description = 'Description',
  className,
  children
}) => (
  <div>
    <Menu />
    <div className='jumbotron'>
      <h2>{titel}</h2>
      <p className='lead'>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
