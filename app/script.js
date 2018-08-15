import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  actions: []
}
app.store((state, event) => {
  if (state === null) state = initialState
  console.log(state)
  switch (event.event) {
    case 'StartAction':
      return { actions: state.actions.concat(event.returnValues) }
    default:
      return state
  }
})
