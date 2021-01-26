import React from 'react'
import styles from './Checkbox.module.css'

export const Checkbox = ({ onClick, checked = false }) => {
  const domId = Math.random().toString(36).substring(2)
  return (
    <>
      <input checked={checked} onChange={() => onClick(!checked)} className={styles.input} type='checkbox' id={domId} />
      <label htmlFor={domId} className={styles.label}>
        <span className={styles.labelText}>
          Принимаю{' '}
          <a href='/' target='_blank' rel='noopener noreferrer'>
            условия
          </a>{' '}
          использования
        </span>
      </label>
    </>
  )
}
