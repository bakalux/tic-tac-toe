import React from 'react';
import styles from './styles.module.css';

const Cell = (props) => {
  const { value, onClick, id } = props;

  return (
    <div
      className={ styles.cellWrapper }
      onClick={ onClick }
      id={ id }
    >
      { value }
    </div>
  );
};

export default Cell;
