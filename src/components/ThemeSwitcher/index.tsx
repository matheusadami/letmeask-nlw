import './styles.scss';

import { ThemeDark, ThemeLight, ThemeType } from '../../contexts/ThemeContext';
import { useTheme } from '../../hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  function toggleTheme() {
    let newTheme: ThemeType = theme?.type === 'dark' ? ThemeLight : ThemeDark;
    changeTheme(newTheme);
  }

  return (
    <div id="theme-switcher">
      <div className="container">
        <label id="switch" className="switch">
          <input type="checkbox" onChange={toggleTheme} id="slider" checked={theme?.type === 'dark'} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
