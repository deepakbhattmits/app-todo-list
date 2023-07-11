import {Button} from "antd";
import { useState } from "react";

export default function Counts() {
  const [count, setCount] = useState(0)

  let incrementCount = () => {
    setCount(count + 1)
  }

  let decrementCount = () => {
    if (count === 0) return
    setCount(count - 1)
  }

  return (
    <div className="app">
      <div>
        <div className="count">
          <h1 data-testid="counter-text">Count: {count}</h1>
        </div>
        <div className="buttons">
          <Button className='ant-btn ant-btn-primary 'data-testid="decrease" title={"-"} onClick={decrementCount}>-</Button>
          <Button className='ant-btn  ant-btn-primary ant-default'data-testid="increase" title={"+"} onClick={incrementCount}>+</Button>
        </div>
      </div>
    </div>
  )
}
