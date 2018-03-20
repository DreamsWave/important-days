import { 
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_EVENTS,
  GET_EVENT,
  FETCHED_EVENTS,
  IS_FETCHING,
  SET_ERRORS
} from '../actions/events'
import { filterObject, mapObject } from '../helpers/objectMethods'


const defaultState = {
  events: {},
  isFetching: false,
  errors: null,
  openedEvent: null
}

export default function events(state = defaultState, action) {
  switch (action.type) {
    case ADD_EVENT:
      let { id, date, name } = action.event
      return { ...state, events: { ...state.events, [id]: { id, date, name } } }
    case FETCHED_EVENTS:
      return { ...state, events: action.events, isFetching: false }
    case IS_FETCHING:
      return { ...state, isFetching: true }
    case DELETE_EVENT:
      return { ...state, events: filterObject(state.events, (event) => event.id !== action.eventId) }
    case EDIT_EVENT:
      let editedEvents = mapObject(state.events, (event => {
        if (event.id === action.event.id) {
          return {
            date: action.event.date,
            name: action.event.name
          }
        }
        return event
      }))
      return { ...state, events: editedEvents }
    case GET_EVENTS:
    case GET_EVENT:
      return { ...state, openedEvent: filterObject(state.events, (event) => event.id === action.eventId) }
    case SET_ERRORS:
      return { ...state, errors: action.errors }
    default:
      return state
  }
}