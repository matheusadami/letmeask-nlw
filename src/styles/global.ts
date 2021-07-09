import { createGlobalStyle } from 'styled-components';
import { ThemeType } from '../contexts/ThemeContext';

type GlobalStylesProps = {
  theme?: ThemeType;
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props: GlobalStylesProps) => (props.theme ? props.theme.background : '#F8F8F8')};
    color: ${(props: GlobalStylesProps) => (props.theme ? props.theme.color : '#29292E')};
    transition: all 0.25s linear;
  }

  body, input, button, textarea {
    font: 400 16px 'Roboto', sans-serif;
  }
`
