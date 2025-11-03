import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Search,
  Star,
  GitFork,
  Users,
  MapPin,
  Link as LinkIcon,
  Code,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { scanGithubProfile } from '../store/slices/userSlice';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const GitHubScanner = () => {
  const dispatch = useDispatch();
  const { githubData, scanningGithub, error } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(user?.githubUsername || '');

  const handleScan = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      await dispatch(scanGithubProfile(username.trim()));
    }
  };

  const COLORS = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f97316', // orange
    '#ec4899', // pink
  ];

  const languageChartData = githubData?.topLanguages?.map((lang, index) => ({
    name: lang.language,
    value: parseFloat(lang.percentage),
    count: lang.count
  })) || [];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                GitHub Profile Scanner
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Analyze your GitHub profile to enhance recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Scan Form */}
            <Card padding="lg">
              <form onSubmit={handleScan} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter GitHub username (e.g., octocat)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    leftIcon={<Github className="w-5 h-5" />}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={scanningGithub}
                  leftIcon={<Search className="w-5 h-5" />}
                >
                  {scanningGithub ? 'Scanning...' : 'Scan Profile'}
                </Button>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </motion.div>
              )}
            </Card>

            {/* GitHub Data Display */}
            <AnimatePresence>
              {githubData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Profile Overview */}
                  <Card padding="lg">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src={githubData.avatarUrl}
                        alt={githubData.username}
                        className="w-24 h-24 rounded-full ring-4 ring-primary-100 dark:ring-primary-900/30"
                      />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {githubData.name || githubData.username}
                        </h2>
                        <a
                          href={githubData.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2 mt-1"
                        >
                          <Github className="w-4 h-4" />
                          <span>@{githubData.username}</span>
                          <LinkIcon className="w-3 h-3" />
                        </a>
                        {githubData.bio && (
                          <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                            {githubData.bio}
                          </p>
                        )}
                        {githubData.location && (
                          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {githubData.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                      {[
                        { icon: GitFork, value: githubData.publicRepos, label: 'Repositories', color: 'blue' },
                        { icon: Users, value: githubData.followers, label: 'Followers', color: 'green' },
                        { icon: Users, value: githubData.following, label: 'Following', color: 'purple' },
                        { icon: Star, value: githubData.totalStars, label: 'Total Stars', color: 'yellow' },
                        { icon: GitFork, value: githubData.totalForks, label: 'Total Forks', color: 'orange' },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {stat.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Language Distribution */}
                  {languageChartData.length > 0 && (
                    <Card padding="lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Language Distribution
                        </h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={languageChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {languageChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Top Languages
                          </h4>
                          <div className="space-y-3">
                            {githubData.topLanguages.map((lang, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                  ></div>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {lang.language}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {lang.count} repos ({lang.percentage}%)
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Top Repositories */}
                  {githubData.topRepos && githubData.topRepos.length > 0 && (
                    <Card padding="lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Top Repositories
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {githubData.topRepos.map((repo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-lg font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
                                >
                                  {repo.name}
                                  <LinkIcon className="w-4 h-4" />
                                </a>
                                {repo.description && (
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
                                    {repo.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-500">
                                  {repo.language && (
                                    <span className="flex items-center gap-1.5">
                                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                      <span>{repo.language}</span>
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4" />
                                    <span>{repo.stars}</span>
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <GitFork className="w-4 h-4" />
                                    <span>{repo.forks}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Tech Stack Summary */}
                  <Card padding="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                        <Code className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Detected Tech Stack
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {githubData.techStack.map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * index }}
                          >
                            <Badge color="primary">{tech}</Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubScanner;

