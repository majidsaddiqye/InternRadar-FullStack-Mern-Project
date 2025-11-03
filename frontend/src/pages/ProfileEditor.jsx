import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Save,
  User,
  Code,
  Target,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { updateProfile, getProfile } from '../store/slices/userSlice';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const ProfileEditor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    skills: [],
    interests: [],
    experience: 'beginner'
  });

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        skills: user.skills || [],
        interests: user.interests || [],
        experience: user.experience || 'beginner'
      });
    }
  }, [user]);

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (result.type === 'user/updateProfile/fulfilled') {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      dispatch(getProfile());
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Edit Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Update your information to get better recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card variant="default" padding="md" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-700 dark:text-green-300">{successMessage}</p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              {error && (
                <Card variant="default" padding="md" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </Card>
              )}

              {/* Name Section */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </Card>

              {/* Skills Section */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Skills
                  </h2>
                </div>

                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Add a skill (e.g., React, Python, Node.js)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button
                    type="button"
                    onClick={handleAddSkill}
                    variant="primary"
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[60px]">
                  <AnimatePresence>
                    {formData.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          color="primary"
                          onRemove={() => handleRemoveSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {formData.skills.length === 0 && (
                    <p className="text-gray-400 dark:text-gray-600 text-sm italic">
                      No skills added yet. Add your first skill above.
                    </p>
                  )}
                </div>
              </Card>

              {/* Interests Section */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Interests
                  </h2>
                </div>

                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Add an interest (e.g., web-development, machine-learning)"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                  />
                  <Button
                    type="button"
                    onClick={handleAddInterest}
                    variant="success"
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[60px]">
                  <AnimatePresence>
                    {formData.interests.map((interest, index) => (
                      <motion.div
                        key={interest}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          color="success"
                          onRemove={() => handleRemoveInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {formData.interests.length === 0 && (
                    <p className="text-gray-400 dark:text-gray-600 text-sm italic">
                      No interests added yet. Add your first interest above.
                    </p>
                  )}
                </div>
              </Card>

              {/* Experience Level Section */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                    <Briefcase className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Experience Level
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
                    { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
                    { value: 'advanced', label: 'Advanced', description: 'Highly experienced' },
                  ].map((level) => (
                    <motion.button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: level.value })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.experience === level.value
                          ? 'border-accent-600 bg-accent-50 dark:bg-accent-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-700'
                      }`}
                    >
                      <div className="text-left">
                        <div className={`font-semibold mb-1 ${
                          formData.experience === level.value
                            ? 'text-accent-700 dark:text-accent-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {level.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {level.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  leftIcon={<Save className="w-5 h-5" />}
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;

