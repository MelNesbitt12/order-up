import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideMenu.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

// side menu component
const sideMenu = ( props ) => {
  // conditionally attach different CSS classes to show animation when menu is shown
  let attachedClasses = [classes.SideMenu, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideMenu, classes.Open]
  }
  return (
    <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
    </Aux>
  )
}

export default sideMenu


// toggle button
