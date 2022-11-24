import React from 'react';
import './Country.css';

interface Props {
  name: string;
  clicked: React.MouseEventHandler;
}

const Country:React.FC<Props> = ({name, clicked}) => {
  return (
    <>
      <li className="country" onClick={clicked}>
        {name}
      </li>
    </>
  );
};

export default Country;