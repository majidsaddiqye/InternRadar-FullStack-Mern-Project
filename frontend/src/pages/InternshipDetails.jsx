import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { getInternshipById, clearCurrentInternship } from '../store/slices/internshipSlice';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const InternshipDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentInternship, loading, error } = useSelector((state) => state.internship);

  useEffect(() => {
    dispatch(getInternshipById(id));
    return () => {
      dispatch(clearCurrentInternship());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400">Loading internship details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <Card padding="lg" className="text-center max-w-md">
            <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
            <Button variant="primary" onClick={() => navigate(-1)} leftIcon={<ArrowLeft />}>
              Go Back
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentInternship) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-6"
          >
            {/* Title Card */}
            <Card padding="lg" variant="gradient">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {currentInternship.title}
                  </h1>
                  <div className="flex items-center gap-3 text-xl text-gray-700 dark:text-gray-300">
                    <Building2 className="w-6 h-6" />
                    <span className="font-semibold">{currentInternship.company}</span>
                  </div>
                </div>
                {currentInternship.applyLink && (
                  <a
                    href={currentInternship.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="lg" rightIcon={<ExternalLink />}>
                      Apply Now
                    </Button>
                  </a>
                )}
              </div>
            </Card>

            {/* Key Details Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card padding="md" className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {currentInternship.location}
                  </p>
                </div>
              </Card>
              {currentInternship.stipend && (
                <Card padding="md" className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">Stipend</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {currentInternship.stipend}
                    </p>
                  </div>
                </Card>
              )}
              {currentInternship.duration && (
                <Card padding="md" className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {currentInternship.duration}
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Description */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                About the Internship
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {currentInternship.description}
              </p>
            </Card>

            {/* Tech Stack */}
            {currentInternship.techStack && currentInternship.techStack.length > 0 && (
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  Required Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentInternship.techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge color="primary">{tech}</Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tags */}
            {currentInternship.tags && currentInternship.tags.length > 0 && (
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentInternship.tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge color="default">{tag}</Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            )}

            {/* Additional Info */}
            {(currentInternship.requirements || currentInternship.responsibilities) && (
              <Card padding="lg">
                <div className="space-y-6">
                  {currentInternship.requirements && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Requirements
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentInternship.requirements}
                      </p>
                    </div>
                  )}
                  {currentInternship.responsibilities && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Responsibilities
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentInternship.responsibilities}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;

