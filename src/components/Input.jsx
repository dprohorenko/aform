import React from 'react'
import styles from './Input.module.css'

export const Input = (props) => {
  const { handleChange, text = 'Label', type = 'text', name = 'name', placeholder = 'Placeholder', error = false, value = '' } = props
  return (
    <>
      <label className={styles.label}>
        <span>{text}</span>
        <input onChange={handleChange} value={value} name={name} type={type} placeholder={placeholder} />
        {error && <div className={styles.error}>Введено не корректное значение</div>}
      </label>
    </>
  )
}
