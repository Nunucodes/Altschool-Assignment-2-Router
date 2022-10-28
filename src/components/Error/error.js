import React from 'react'

function Error() {
     if(true) {
        throw new Error('error')
    }
  return (
    <div>error</div>
  )
}
export default Error

