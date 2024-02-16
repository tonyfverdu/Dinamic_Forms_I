import React from 'react'
import { ImTable2 } from 'react-icons/im';
import '../../sass/componentSass/icons/IconButton.scss'

function IconButtonTable() {
  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton">
        <ImTable2 />
      </button>
    </div>
  )
}

export default IconButtonTable;