import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideMenu.module.css'

// side menu component
const sideMenu = ( props ) => {
  // conditionally attach different CSS classes to show animation when menu is shown
  return (
    <div className={classes.SideMenu}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
}

export default sideMenu


// toggle button
