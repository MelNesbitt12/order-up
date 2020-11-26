import React from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideMenu from '../Navigation/SideMenu/SideMenu'

const layout = ( props ) => (
  <Aux>
    <Toolbar />
    <SideMenu />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
)

export default layout
