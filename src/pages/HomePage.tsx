import { useEffect } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Zap,
  Expand,
  Sun,
  Moon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useTheme } from '../context/ThemeContext';
import { useAuthUser } from '../context/UserContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
             ${
               isDarkMode
                 ? 'bg-gray-900/80 backdrop-blur-sm'
                 : 'bg-white/80 backdrop-blur-sm'
             }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a
              href="/"
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Task Master
            </a>
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="icon"
                className={isDarkMode ? 'text-white' : 'text-gray-900'}
              >
                {isDarkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className={`${
                  isDarkMode
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors rounded-full`}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className={`${
          isDarkMode
            ? 'bg-gradient-to-r from-indigo-900 to-gray-900'
            : 'bg-gradient-to-r from-blue-100 to-white'
        } py-20 sm:py-32 relative pt-28`}
      >
        <div className="container mx-auto px-4 text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Welcome to Task Master
          </h1>
          <p
            className={`mt-6 text-xl sm:text-2xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-indigo-200' : 'text-blue-600'
            }`}
          >
            Revolutionizing the way you manage your boards and projects.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none">
          <div
            className={`w-full h-full ${
              isDarkMode
                ? 'bg-gradient-to-t from-gray-900 to-transparent'
                : 'bg-gradient-to-t from-white to-transparent'
            }`}
          />
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 sm:py-32 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Why Choose Task Master?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Feature 1 */}
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8" />}
              title="Easy to Manage"
              description="Organize and track your boards with ease using our intuitive interface."
              color={isDarkMode ? 'indigo' : 'blue'}
              isDarkMode={isDarkMode}
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={<Expand className="h-8 w-8" />}
              title="Drag and Drop"
              description="Seamlessly reorder your tasks with our drag-and-drop feature."
              color={isDarkMode ? 'indigo' : 'blue'}
              isDarkMode={isDarkMode}
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Fast and Responsive"
              description="Experience blazing-fast performance on all your devices."
              color={isDarkMode ? 'indigo' : 'blue'}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={isDarkMode ? 'bg-indigo-900' : 'bg-blue-100'}>
        <div className="container mx-auto px-4 text-center py-20 sm:py-32">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Get Started with Task Master Today!
          </h2>
          <p
            className={`text-xl mb-10 max-w-2xl mx-auto ${
              isDarkMode ? 'text-indigo-200' : 'text-blue-600'
            }`}
          >
            Take control of your boards and workflows with our powerful app.
          </p>
          <div>
            <a
              href="/signup"
              className={`${
                isDarkMode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 inline-flex items-center group`}
            >
              Sign Up Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 border-t ${
          isDarkMode
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >
        <div
          className={`container mx-auto px-4 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>&copy; 2024 Task Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
interface FeatureCardProps {
  icon: React.ReactNode; // Type for icon (could be an SVG, image, etc.)
  title: string; // Title of the card
  description: string; // Description text of the card
  color: string; // Color string (e.g., 'red', 'blue', etc.)
  isDarkMode: boolean; // Boolean to check if dark mode is enabled
}
function FeatureCard({
  icon,
  title,
  description,
  color,
  isDarkMode,
}: FeatureCardProps) {
  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-700' : 'bg-white'
      } p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300`}
    >
      <div
        className={`flex justify-center mb-6 ${
          isDarkMode ? `bg-${color}-900` : `bg-${color}-100`
        } p-3 rounded-full w-16 h-16 mx-auto`}
      >
        <span
          className={`${
            isDarkMode ? `text-${color}-300` : `text-${color}-600`
          }`}
        >
          {icon}
        </span>
      </div>
      <h3
        className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h3>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        {description}
      </p>
    </div>
  );
}
