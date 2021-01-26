import React, { useState, useEffect } from 'react'
import { Input } from './Input'
import styles from './Form.module.css'
import { Select } from './Select'
import { Checkbox } from './Checkbox'

const initState = { name: '', email: '', tel: '', policy: false, language: '' }
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const reName = /^[- a-zA-Zа-яёА-ЯЁ]+$/

export const Form = () => {
  const [formValues, setFormValues] = useState(initState)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setIsComplete(!nameError && formValues.name && formValues.email && formValues.tel && formValues.policy && formValues.language)
  }, [formValues, nameError])

  const handleChange = ({ target }) => {
    const { name } = target
    let { value } = target

    if (name === 'name') {
      let isNameError = reName.test(value)
      setNameError(!isNameError)
    } else if (name === 'tel') {
      value = value.replace(/[^\d-+()]/g, '')
      if (value.match(/\d/g)?.length > 11) value = formValues.tel
    }

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handlePolicy = (policy) => {
    setFormValues((prevState) => ({ ...prevState, policy }))
  }

  const handleSelect = (language) => {
    setFormValues((prevState) => ({ ...prevState, language }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isComplete) {
      if (!reEmail.test(formValues.email)) setEmailError(true)
      else {
        alert(`
          name: ${formValues.name}
          email: ${formValues.email}
          tel: ${formValues.tel}
          language: ${formValues.language}
          policy: ${formValues.policy}
        `)
        setFormValues(initState)
        setEmailError(false)
      }
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1>Регистрация</h1>
        <span>Уже есть аккаунт?</span>{' '}
        <a href='/' target='_blank'>
          Войти
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <Input value={formValues.name} handleChange={handleChange} name='name' error={nameError} text='Имя' placeholder='Введите ваше имя' />
        <Input value={formValues.email} handleChange={handleChange} name='email' error={emailError} text='Email' placeholder='Введите ваш email' />
        <Input value={formValues.tel} handleChange={handleChange} name='tel' text='Номер телефона' type='tel' placeholder='Введите номер телефона' />
        <Select
          handleSelect={handleSelect}
          placeholder='Язык'
          id='language'
          name='language'
          required='true'
          values={['Русский', 'Английский', 'Китайский', 'Испанский']}
        />
        <Checkbox onClick={handlePolicy} placeholder='Введите Ваше имя' checked={formValues.policy} />
        <button className={styles.button} disabled={!isComplete}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
