import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

// change modal depending on show property
class Modal extends Component {
  // making sure that we do not unnecessarily re-render OrderSummary within the wrapping Modal element
  shouldComponentUpdate (nextProps, nextState) {
    // return true if the show property has changed
    return nextProps.show !== this.props.show
  }
  componentDidUpdate () {
    console.log('[Modal] will update')
  }
  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}
export default Modal
