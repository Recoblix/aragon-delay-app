import React from 'react'
import styled from 'styled-components'
import { Button, Countdown, TableCell, TableRow } from '@aragon/ui'

class ActionRow extends React.Component {

  initiateActionClick() {
    console.logs(this.props)
    this.props.onInitiateAction(this.props.action.actionId)
  }
  render() {
    const { action, onInitiateAction } = this.props
    //const { metadata: question, description } = action.data

    return (
      <TableRow>
        <div>
           {action.actionId}
        </div>
        <ActionsCell>
          <Button mode="outline" onClick={() => onInitiateAction(action.actionId)}>
            Initiate Action
          </Button>
        </ActionsCell>
      </TableRow>
    )
  }
}

const Cell = styled(TableCell)`
  vertical-align: top;
`

const StatusCell = styled(Cell)`
  vertical-align: top;
  width: 190px;
`

const QuestionCell = styled(Cell)`
  width: 40%;
`

const BarsCell = styled(Cell)`
  flex-shrink: 0;
  width: 25%;
  min-width: 200px;
`

const ActionsCell = styled(Cell)`
  width: 0;
`

const QuestionWrapper = styled.p`
  margin-right: 20px;
  word-break: break-word;
  hyphens: auto;
`

const DescriptionWrapper = styled.p`
  margin-right: 20px;

  ${QuestionWrapper} + & {
    margin-top: 10px;
  }
`

const BarsGroup = styled.div`
  width: 100%;
`

const Bar = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`

export default ActionRow
