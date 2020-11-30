import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'

// setting up global error handler with axios
const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null
    }


    componentWillMount () {
      // set up axios listeners
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null })
        return request
      })
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error })
      })
    }

    componentWillUnmount () {
      // removing 'dead' interceptors using the request and responseInterceptor properties
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
