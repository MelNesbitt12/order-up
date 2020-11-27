import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideMenu from '../../components/Navigation/SideMenu/SideMenu'

class Layout extends Component {
  // state continues info if sideMenu is visible or not
  state = {
    showSideMenu: false
  }

  sideMenuClosedHandler = () => {
    this.setState({ showSideMenu: false })
  }

  sideMenuToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideMenu: !prevState.showSideMenu }
  })
}

  render () {
    return (
      <Aux>
        <Toolbar sideMenuToggleClicked={ this.sideMenuToggleHandler}/>
        <SideMenu
          closed={this.sideMenuClosedHandler}
          open={this.state.showSideMenu}
          />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout
