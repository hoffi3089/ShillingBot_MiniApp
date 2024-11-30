import styled from "styled-components";
import React from "react";
import { HiMinusSm } from "react-icons/hi";
import { GoPlus } from "react-icons/go";

interface MyComponentProps {
  title: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
const CounterComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Counter>
      <div className="setting">
        <div className="left">
          <h4>{title}</h4>
          <div>{description}</div>
        </div>
        <div className="right">
          <HiMinusSm className="icon" onClick={onDecrement} />
          <span className="number">{value}</span>
          <GoPlus className="icon" onClick={onIncrement} />
        </div>
      </div>
    </Counter>
  );
};

const Counter = styled.div`
  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    .left {
      h4 {
        font-weight: 500;
      }
      div {
        font-size: 13px;
        color: #ffffffd1;
      }
    }
    .right {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      .number {
        font-weight: 500;
        font-size: 14px;
      }
      .icon {
        cursor: pointer;
      }
    }
  }
`;

export default CounterComponent;
