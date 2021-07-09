import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

export type ThemeType = {
  borderColor: string;
  background: string;
  color: string;
  type: 'dark' | 'light';
};

export type ThemeContextType = {
  theme?: ThemeType;
  changeTheme: (theme: ThemeType) => void;
};

type ThemeContextProps = {
  children: (themeContext: ThemeContextType) => ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeLight: ThemeType = {
  borderColor: '#e2e2e2',
  background: '#F8F8F8',
  color: '#29292E',
  type: 'light'
};

export const ThemeDark: ThemeType = {
  borderColor: '#676767',
  background: '#404046',
  color: '#F8F8F8',
  type: 'dark'
};

export function ThemeContextProvider(props: ThemeContextProps) {
  const [theme, setTheme] = useState<ThemeType>();

  useEffect(() => {
    if (!theme) {
      let localTheme = window.localStorage.getItem('theme');
      if (localTheme) {
        let currentTheme = JSON.parse(localTheme) as ThemeType;
        setTheme(currentTheme);
      } else {
        window.localStorage.setItem('theme', JSON.stringify(ThemeLight));
        setTheme(ThemeLight);
      }
    }
  }, [theme]);

  function changeTheme(theme: ThemeType) {
    window.localStorage.setItem('theme', JSON.stringify(theme));
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children({ theme, changeTheme })}
    </ThemeContext.Provider>
  );
}
