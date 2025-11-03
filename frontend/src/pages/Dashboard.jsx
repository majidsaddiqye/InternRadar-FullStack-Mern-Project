import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Github,
  Target,
  Edit,
  TrendingUp,
  Briefcase,
  Code,
  Star,
  GitFork,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { getProfile } from '../store/slices/userSlice';
import Sidebar from '../components/layout/Sidebar';
import StatsCard from '../components/ui/StatsCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, githubData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const profileCompletion = () => {
    let score = 0;
    if (user?.skills?.length > 0) score += 25;
    if (user?.interests?.length > 0) score += 25;
    if (user?.experience) score += 25;
    if (user?.githubUsername) score += 25;
    return score;
  };

  const completion = profileCompletion();

  const getCompletionColor = () => {
    if (completion >= 75) return 'success';
    if (completion >= 50) return 'warning';
    return 'danger';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Here's your personalized dashboard
                </p>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Profile Completion"
              value={`${completion}%`}
              icon={User}
              color={getCompletionColor()}
              trend={completion >= 75 ? 'up' : 'down'}
              trendValue={completion >= 75 ? 'Great!' : 'Needs work'}
            />
            <StatsCard
              title="Skills Added"
              value={user?.skills?.length || 0}
              icon={Code}
              color="primary"
            />
            <StatsCard
              title="Interests"
              value={user?.interests?.length || 0}
              icon={Target}
              color="accent"
            />
            <StatsCard
              title="GitHub Repos"
              value={githubData?.publicRepos || 0}
              icon={Github}
              color="success"
            />
          </div>

          {/* Profile Completion Card */}
          {completion < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="gradient" padding="lg">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Complete Your Profile
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Get better recommendations by completing your profile
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary-600 dark:text-white">{completion}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-primary-600 to-accent-600 dark:bg-white h-3 rounded-full shadow-lg"
                  ></motion.div>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                  {[
                    { done: user?.skills?.length > 0, text: 'Add your skills' },
                    { done: user?.interests?.length > 0, text: 'Add your interests' },
                    { done: user?.experience, text: 'Set your experience level' },
                    { done: user?.githubUsername, text: 'Connect your GitHub profile' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-900 dark:text-white">
                      {item.done ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      )}
                      <span className={item.done ? 'line-through opacity-60' : ''}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to="/profile" className="mt-6 block">
                  <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight />}>
                    Complete Profile
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/profile',
                  icon: User,
                  title: 'Edit Profile',
                  description: 'Update your skills and interests',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  to: '/github',
                  icon: Github,
                  title: 'GitHub Scanner',
                  description: 'Analyze your GitHub profile',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  to: '/recommendations',
                  icon: Target,
                  title: 'Recommendations',
                  description: 'View personalized matches',
                  color: 'from-green-500 to-green-600',
                },
              ].map((action, index) => (
                <Link key={index} to={action.to}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card hover padding="lg" className="h-full">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-lg`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Summary */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Your Profile Card */}
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Profile
                </h2>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                    Edit
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Skills
                  </h3>
                  {user?.skills && user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} color="primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-600 text-sm italic">
                      No skills added yet
                    </p>
                  )}
                </div>

                {/* Interests */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Interests
                  </h3>
                  {user?.interests && user.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <Badge key={index} color="success">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-600 text-sm italic">
                      No interests added yet
                    </p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Experience Level
                  </h3>
                  <Badge color="accent" className="capitalize">
                    {user?.experience || 'Not set'}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* GitHub Profile Card */}
            <Card padding="lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                GitHub Profile
              </h2>
              {githubData ? (
                <div className="space-y-6">
                  {/* GitHub User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={githubData.avatarUrl}
                      alt={githubData.username}
                      className="w-16 h-16 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-white">
                        {githubData.name || githubData.username}
                      </p>
                      <a
                        href={githubData.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                      >
                        @{githubData.username}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* GitHub Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <GitFork className="w-5 h-5 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData.publicRepos}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Repositories</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData.followers}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Star className="w-5 h-5 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData.totalStars}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Stars</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Github className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    No GitHub profile connected
                  </p>
                  <Link to="/github">
                    <Button variant="primary" rightIcon={<ArrowRight />}>
                      Connect GitHub
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

