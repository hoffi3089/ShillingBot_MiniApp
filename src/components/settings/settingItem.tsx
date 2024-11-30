import React from "react";
import styled from "styled-components";

type SettingItemProps = {
  title: string;
  description: string;
  isChecked: boolean;
  onChange: () => void;
};

const SettingItemComponent: React.FC<SettingItemProps> = ({
  title,
  description,
  isChecked,
  onChange,
}) => {
  return (
    <Container>
      <div className="settings">
        <div className="left">
          <h4>{title}</h4>
          <div>{description}</div>
        </div>
        <div className="right">
          <label className={"switch round"}>
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span className={"slider round"} />
          </label>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
    .settings {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.1rem;
        h4 {
          font-weight: 500;
        }
        div {
          font-size: 13px;
          color: #ffffffd1;
        }
      }
      .right {
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 28px;
          margin: 15px 0;
        }

        .switch input {
          display: none;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color:rgba(145, 158, 171, 0.12);
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 24px;
          width: 23px;
          left: 2px;
          bottom: 2px;
          background-color: #fff;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: var(--active-color);
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(21px);
          -ms-transform: translateX(21px);
          transform: translateX(21px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      }
    }
`;
export default SettingItemComponent;
