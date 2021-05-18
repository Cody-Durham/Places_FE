import React from 'react'
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import Display from './Display'
import Form from './Form'

function App() {
  const url = "not sure what to put here"

  const [places, setPlaces] = React.useState([])

  const emptyPlace = {
    name: '', 
    img: '', 
    description: '',
  }

//setting new state for updating each place were going to change
const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)


const getPlace = () => {
  // making a get request from this url
  fetch(url + '/place/')
  .then( (response) => response.json() )
  .then( (data) => {
    setSelectedPlace(data)
  })
}

React.useEffect( () => {
  getPlace()
}, [])

const handleCreate = (newPlace) => {
  console.log('test');
  fetch(url + '/place/', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application.json'
    },
    body: JSON.stringify(newPlace)
  })
  .then( () => getPlace() )
}

// function to specify what place were updating (updating state here)
const selectPlace = (place) => {
  setSelectedPlace(place)
}

//Delete a place function
const deletePlace = (place) => {
  fetch(url + '/place/', {
    method: 'delete'
  })
  .then( () => {
    getPlace()
  } )
}



  return (
    <div className="App">
      <h1>Find your favorite places</h1>
      <hr/>
      <Link>
        <button>Add a new place</button>
      </Link>
      <main>
      <Switch>
        <Route
            exact path="/"
            // render={(routerProps) => (<Display {...routerProps}
            />
            )}
            />

        <Route
            exact path="/create"
            render={(routerProps) => (
            <Form
            {...routerProps}
            label='create'
            place='emptyPlace'
            handleSubmit={handleCreate}
            />
            )}
            />

        <Route
            exact path="/edit"
            render={(routerProps) => (
            <Form
            {...routerProps}
            label='create'
            place='emptyPlace'
            handleSubmit={selectedPlace}
            />
            )}
            />
        </Switch>
      </main>
    </div>
  );
}

export default App;
