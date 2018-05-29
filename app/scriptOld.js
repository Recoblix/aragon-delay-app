import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  actions: []
}
app.store((state, event) => {
  if (state === null) state = initialState


  switch (event.event) {
    case 'StartAction':
      return startAction(state, event)
    case 'ExecuteAction':
      return startAction(state, event)
    default:
      return state
  }
})


function startAction(state, { actionId }) {
  return updateState(state, 0, action => actionId)
}

function updateState(state, actionId, transform) {
  const { actions = [] } = state


  return { actions: updateActions(actions, actionId, transform) }
}

function updateActions(actions, actionId, transform) {
  const actionIndex = actions.findIndex(action => action.actionId === actionId)

  if (actionIndex === -1) {
    // If we can't find it, load its data, perform the transformation, and concat
    const nextActions = Array.from(actions)
    nextAction.concat(
      transform({})
    )
    return nextActions
  } else {
    const nextActions = Array.from(actions)
    nextActions[actionIndex] = transform(nextActions[actionIndex])
    return nextActions
  }
}
