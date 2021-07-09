import styled from 'styled-components';
import { ThemeType } from '../../contexts/ThemeContext';

type ComponentRoomCodeProps = {
  theme?: ThemeType;
};

export const ComponentRoomCode = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: transparent;
  border: 1px solid #835AFD;
  cursor: pointer;
  color: ${(props: ComponentRoomCodeProps) => (props.theme ? props.theme.color : '#000')};

  display: flex;

  div {
    height: 40px;
    background: #835AFD;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 240px;
    font-size: 14px;
    font-weight: 500;
  }
`
