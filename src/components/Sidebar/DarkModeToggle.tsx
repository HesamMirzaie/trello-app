import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/button';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button
      className="w-full px-4 py-2 flex items-center gap-x-2 border-dashed  border-blue-600 text-blue-600 hover:text-blue-600 dark:hover:bg-gray-800 dark:border-indigo-600 dark:text-indigo-300"
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 " />}
      {isDarkMode ? 'Light' : 'Dark'} Mode
    </Button>
  );
};
