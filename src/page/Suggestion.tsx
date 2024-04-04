import React from 'react'
import { useNavigate } from 'react-router-dom'

function Suggestion() {
  const route = useNavigate()
  return (
    <div onClick={() => route("/feedbackdetails") } >Suggestion</div>
  )
}

export default Suggestion