import React from 'react'
import {
  AragonApp,
  Button,
  Text,

  observe
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import ActionsTable from './ActionTable'

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class App extends React.Component {
  constructor () {
    super()

    this.app = new Aragon(
      new providers.WindowMessage(window.parent)
    )
    this.state = {
      actions: []
    }
    // ugly hack: aragon.js doesn't have handshakes yet
    // the wrapper is sending a message to the app before the app's ready to handle it
    // the iframe needs some time to set itself up,
    // so we put a timeout to wait for 5s before subscribing
    setTimeout(() => {
      this.setState({ state$: this.app.state() })
    }, 5000)
  }

  onInitiateAction(actionId){
    this.app.activate(actionId)
  }

  render () {
    const {
      actions,
    } = this.state

    return (
      <AppContainer>
        <ActionsTable
          actions={actions}
          onInitiateAction={this.onInitiateAction}
        />
      </AppContainer>
    )
  }
}

const ObservedCount = observe(
  (state$) => state$,
  { actions: [] }
)(
  ({ count }) => <Text.Block style={{ textAlign: 'center' }} size='xxlarge'>{count}</Text.Block>
)
