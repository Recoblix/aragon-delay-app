import React from 'react'
import { compareDesc } from 'date-fns/esm'
import { Table, TableHeader, TableRow } from '@aragon/ui'
import ActionRow from './ActionRow'

const ActionsTable = ({ actions, onInitiateAction }) => (
  <Table
    header={
      <TableRow>
        <TableHeader title="Question" />
        <TableHeader title="Actions" />
      </TableRow>
    }
  >
    {actions
      .sort(
        (
          { data: { startDate: startDateLeft } },
          { data: { startDate: startDateRight } }
        ) =>
          // Sort by date descending
          compareDesc(startDateLeft, startDateRight)
      )
      .map(action => (
        <ActionRow key={action.actionId} action={action} onInitiateAction={onInitiateAction} />
      ))}
  </Table>
)

export default ActionsTable
