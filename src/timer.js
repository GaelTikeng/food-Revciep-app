import { useEffect, useState } from "react";

function Timer ({minRange}) {
  const [counter, setCounter] = useState(minRange)
  useEffect(() => {
    if (counter >= 0) {
      setTimeout(() => setCounter (counter +1), 1000)
    }
  }, [counter])
  return (
    <span>
      {counte}
    </span>
  )
}
export default Timer;
