import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Target,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { getRecommendations } from '../store/slices/recommendationSlice';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Recommendations = () => {
  const dispatch = useDispatch();
  const { recommendations, loading, error, profileComplete } = useSelector(
    (state) => state.recommendation
  );
  const [filters, setFilters] = useState({
    limit: 10,
    minScore: 0,
    diverse: false
  });

  useEffect(() => {
    dispatch(getRecommendations(filters));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getRecommendations(filters));
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'success';
    if (score >= 50) return 'primary';
    if (score >= 30) return 'warning';
    return 'default';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Excellent Match';
    if (score >= 50) return 'Good Match';
    if (score >= 30) return 'Moderate Match';
    return 'Potential Match';
  };

  const getScoreGradient = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-600';
    if (score >= 50) return 'from-blue-500 to-blue-600';
    if (score >= 30) return 'from-yellow-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  if (!profileComplete) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please add your skills and interests to get personalized recommendations
              </p>
              <Link to="/profile">
                <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight />}>
                  Complete Profile
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
                  Personalized Recommendations
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Internships matched to your skills, interests, and GitHub profile
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={loading}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Filters */}
            <Card padding="lg">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Min Score:
                  </label>
                  <select
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.minScore}
                    onChange={(e) => setFilters({ ...filters, minScore: parseInt(e.target.value) })}
                  >
                    <option value="0">All Matches</option>
                    <option value="30">30+ Score</option>
                    <option value="50">50+ Score</option>
                    <option value="70">70+ Score</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Limit:
                  </label>
                  <select
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.limit}
                    onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
                  >
                    <option value="5">5 Results</option>
                    <option value="10">10 Results</option>
                    <option value="20">20 Results</option>
                    <option value="50">50 Results</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="diverse"
                    checked={filters.diverse}
                    onChange={(e) => setFilters({ ...filters, diverse: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="diverse" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Diverse Results
                  </label>
                </div>
              </div>
            </Card>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400">Finding the best matches for you...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card variant="default" padding="md" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </Card>
            )}

            {/* Empty State */}
            {!loading && recommendations.length === 0 && (
              <Card padding="lg" className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No recommendations found. Try adjusting your filters.
                </p>
              </Card>
            )}

            {/* Recommendations List */}
            {!loading && recommendations.length > 0 && (
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.internship.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover padding="lg">
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-400 dark:text-gray-600">
                              #{index + 1}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {rec.internship.title}
                            </h3>
                          </div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                            {rec.internship.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="relative inline-block">
                            <div className={`absolute inset-0 bg-gradient-to-r ${getScoreGradient(rec.score)} blur-lg opacity-30`}></div>
                            <div className={`relative px-6 py-3 bg-gradient-to-r ${getScoreGradient(rec.score)} rounded-xl text-white font-bold text-2xl shadow-lg`}>
                              {rec.score}%
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                            {getScoreLabel(rec.score)}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {rec.internship.description}
                      </p>

                      {/* Match Explanation */}
                      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-1">
                              Why this matches:
                            </p>
                            <p className="text-sm text-primary-800 dark:text-primary-200">
                              {rec.explanation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="text-sm font-medium">{rec.internship.location}</span>
                        </div>
                        {rec.internship.stipend && (
                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm font-medium">{rec.internship.stipend}</span>
                          </div>
                        )}
                        {rec.internship.duration && (
                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium">{rec.internship.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {rec.internship.tags && rec.internship.tags.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {rec.internship.tags.map((tag, idx) => (
                              <Badge key={idx} color="default">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {rec.internship.techStack && rec.internship.techStack.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Tech Stack:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {rec.internship.techStack.map((tech, idx) => (
                              <Badge key={idx} color="primary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link to={`/internships/${rec.internship.id}`} className="flex-1">
                          <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight />}>
                            View Details
                          </Button>
                        </Link>
                        {rec.internship.applyLink && (
                          <a
                            href={rec.internship.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="outline" size="lg" fullWidth rightIcon={<ExternalLink />}>
                              Apply Now
                            </Button>
                          </a>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

