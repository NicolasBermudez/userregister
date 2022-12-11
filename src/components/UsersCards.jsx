import React from 'react'
import './styles/userCard.css'


const UsersCards = ({ user, deleteUserById, setUpdateInfo, setCloseForm}) => {

  const handleEdit = () => {
    setUpdateInfo(user)
  }

  return (
    <article className='card'>
      <h3 className='card__title' >
        {user.first_name} {user.last_name}
      </h3>
      <ul className='card__body' >
        <li className='card__item' >
          <span className='card__span' >Correo</span>
          {user.email}
        </li>
        <li className='card__item' >
          <span className='card__span' >Cumpleaños</span>
          {user.birthday}
        </li>
      </ul>
      <footer className='card__footer' >
        <button className='card__btn card__btn--trash' onClick={() => deleteUserById(user.id)} ><i className='fa-solid fa-trash-can-arrow-up'></i></button>
        <button className='card__btn card__btn--edit' onClick={() => {handleEdit(), setCloseForm(false)}} ><i className="  fa-regular fa-pen-to-square"></i></button>
      </footer>
    </article>
  )
}

export default UsersCards