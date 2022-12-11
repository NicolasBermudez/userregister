import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import UserForm from './components/UserForm'
import UsersCards from './components/UsersCards'


function App() {
  const [users, setUsers] = useState()

  const [updateInfo, setUpdateInfo] = useState()

  const [closeForm, setCloseForm] = useState(true)

  const [appSuccessClose, setAppSuccessClose] = useState(true)

  const [appSuccessEdit, setAppSuccessEdit] = useState(true)

  const [appSuccessDelete, setAppSuccessDelete] = useState(true)
  

  const getAllUsers = () => {
    const URL = `http://users-crud.academlo.tech/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNewUser = data => {
    const URL = `http://users-crud.academlo.tech/users/`
    axios.post(URL, data)
      .then(() => {
        getAllUsers()
        setAppSuccessClose(false)
        setTimeout(() =>
          setAppSuccessClose(true), [3000]
        )
      })
      .catch(err => console.log(err))
  }

  const deleteUserById = (id) => {
    const URL = `http://users-crud.academlo.tech/users/${id}/`
    axios.delete(URL)
      .then(() => {
        getAllUsers()
        setAppSuccessDelete(false)
        setTimeout(() =>
          setAppSuccessDelete(true), [3000])
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, data) => {
    const URL = `http://users-crud.academlo.tech/users/${id}/`
    axios.put(URL, data)
      .then(() => {
        getAllUsers()
        setAppSuccessEdit(false)
        setTimeout(() =>
          setAppSuccessEdit(true), [3000])
        })
      .catch (err => console.log(err))
}


return (
  <div className="App">
    <div className={`App__reg_success ${appSuccessClose && 'App__close-success'}`}  >Registered user successfully!!</div>
    <div className={`App__reg_success ${appSuccessEdit && 'App__edit-success'}`}  >Edit user successfully!!</div>
    <div className={`App__del_success ${appSuccessDelete && 'App__delete-success'}`}  >Delete user successfully!!</div>
    <h1 className='App__h1' >User Register</h1>
    <button className='App__btn' onClick={() => setCloseForm(false)} >Open Form</button>
    <div className={`form-container ${closeForm && 'close__form'}`}
    >
      <UserForm
        setCloseForm={setCloseForm}
        createNewUser={createNewUser}
        updateInfo={updateInfo}
        updateUserById={updateUserById}
        setUpdateInfo={setUpdateInfo}
      />
    </div>
    <div className='user-container' >
      {
        users?.map(user => (
          <UsersCards
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            setUpdateInfo={setUpdateInfo}
            setCloseForm={setCloseForm}
          />
        ))
      }
    </div>
  </div>
)
}

export default App
