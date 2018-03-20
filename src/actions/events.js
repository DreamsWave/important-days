import { firebaseDB } from '../firebase'

export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENT = 'GET_EVENT'
export const FETCHED_EVENTS = 'FETCHED_EVENTS'
export const IS_FETCHING = 'IS_FETCHING'
export const SET_ERRORS = 'SET_ERRORS'

export function setIsFetching() {
  return {
    type: IS_FETCHING
  }
}

export function setFetchedEvents(events) {
  return {
    type: FETCHED_EVENTS,
    events
  }
}
export function setErrors(errors) {
  return {
    type: FETCHED_EVENTS,
    errors
  }
}

export function setNewEvent(event) {
  return {
    type: ADD_EVENT,
    event
  }
}

export function removeEventFromStore(eventId) {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

export function editEventInStore(event) {
  return {
    type: EDIT_EVENT,
    event
  }
}

export function getEvent(eventId) {
  return {
    type: GET_EVENT,
    eventId
  }
}

export function editEvent(event) {
  return (dispatch, getState) => {
    let { signed, user } = getState().auth
    if (signed) {
      return new Promise((resolve, reject) => {
        firebaseDB.ref(`events/${user.uid}/${event.id}`).update({
          id: event.id,
          date: event.date,
          name: event.name
        })
        .then(() => {
          dispatch(editEventInStore(event))
          resolve('success')
        })
        .catch(err => {
          dispatch(setErrors(err))
          reject(err)
        })
      })
    }
    return 'not signed'
  }
}

export function deleteEvent(eventId) {
  return (dispatch, getState) => {
    let { user, signed } = getState().auth
    if (signed) {
      return new Promise((resolve, reject) => {
        firebaseDB.ref(`events/${user.uid}/${eventId}`).remove()
          .then(() => {
            dispatch(removeEventFromStore(eventId))
            resolve('success')
          })
          .catch((err) => {
            dispatch(setErrors(err))
            reject(err)
          })
      })
    }
  }
}

export function addEvent(event) {
  return (dispatch, getState) => {
    let { user, signed } = getState().auth
    
    // need add some loading

    if (signed) {
      return new Promise((resolve, reject) => {
        firebaseDB.ref('events/' + user.uid).update({
          [event.id]: {
            id: event.id,
            date: event.date,
            name: event.name
          }
        })
        .then(() => {
          dispatch(setNewEvent(event))
          resolve('success')
        })
        .catch((err) => {
          dispatch(setErrors(err))
          reject(err)
        })
      })
    }
    dispatch(setErrors("Not signed"))
  }
}

export function fetchEvents() {
  return (dispatch, getState) => {
    let { signed, user } = getState().auth

    if (signed) {
      dispatch(setIsFetching())
  
      return new Promise((resolve, reject) => {
        firebaseDB.ref('events/' + user.uid).once('value')
          .then((snapshot) => {
            dispatch(setFetchedEvents(snapshot.val()))
            resolve(snapshot.val())
          })
          .catch((err) => {
            dispatch(setErrors(err))
            reject(err)
          })
      })
    }
    dispatch(setErrors("Not signed"))
  }
}