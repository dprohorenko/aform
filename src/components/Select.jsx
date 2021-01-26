import React, { useState } from 'react'
import styles from './Select.module.css'

export const Select = ({ handleSelect, placeholder = 'Dropdown', values = ['Item1', 'Item2', 'Item3', 'Item4'] }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(placeholder)

  const optionHandler = (value) => () => {
    setShowOptions(false)
    setSelectedOption(value)
    handleSelect(value)
  }

  return (
    <>
      <div className={styles.label}>{placeholder}</div>
      <div className={`${styles.select} ${showOptions && styles.selectActive}`} onClick={() => setShowOptions(!showOptions)}>
        {selectedOption}
        {showOptions && (
          <div className={styles.optionWrapper}>
            {values.map((value, key) => (
              <div className={styles.option} onClick={optionHandler(value)} key={key}>
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
