import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  actions: []
}
app.store(async (state, event) => {
  if (state === null) state = initialState

  switch (event.event) {
    case 'StartAction':
      state = await startAction(state, event.returnValues)
    case 'ExecuteAction':
      state = await startAction(state, event.returnValues)
    default:
      return state
  }
})


async function startAction(state, { actionId }) {
  return updateState(state, actionId, action => action)
}

async function updateState(state, actionId, transform) {
  const { actions = [] } = state

  state.actions = await updateActions(actions, actionId, transform)

  return state
}

async function updateActions(actions, actionId, transform) {
  const actionIndex = actions.findIndex(action => action.actionId === actionId)

  if (actionIndex === -1) {
    // If we can't find it, load its data, perform the transformation, and concat
    return actions.concat(
      await transform({
        actionId,
        data: await app.call('action', voteId)
      })
    )
  } else {
    const nextActions = Array.from(actions)
    nextActions[actionIndex] = await transform(nextActions[actionIndex])
    return nextActions
  }
}
