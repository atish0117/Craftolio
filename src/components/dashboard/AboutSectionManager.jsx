import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'


const AboutSectionManager = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [aboutSections, setAboutSections] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    order: 0
  })

  useEffect(() => {
    if (user?.aboutSections) {
      setAboutSections(user.aboutSections.sort((a, b) => a.order - b.order))
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in title and description')
      return
    }

    const sectionData = {
      ...formData,
      id: formData.id || `section-${Date.now()}`,
      order: editingIndex !== null ? formData.order : aboutSections.length
    }

    let newSections = [...aboutSections]
    
    if (editingIndex !== null) {
      newSections[editingIndex] = sectionData
    } else {
      newSections.push(sectionData)
    }

    try {
      await dispatch(updateProfile({ aboutSections: newSections })).unwrap()
      setAboutSections(newSections)
      toast.success(editingIndex !== null ? 'Section updated!' : 'Section added!')
      resetForm()
    } catch (error) {
      toast.error('Failed to save about section')
    }
  }

  const handleEdit = (index) => {
    setFormData(aboutSections[index])
    setEditingIndex(index)
    setShowForm(true)
  }

  const handleDelete = async (index) => {
    if (!confirm('Are you sure you want to delete this about section?')) return

    const newSections = aboutSections.filter((_, i) => i !== index)
    
    try {
      await dispatch(updateProfile({ aboutSections: newSections })).unwrap()
      setAboutSections(newSections)
      toast.success('About section deleted!')
    } catch (error) {
      toast.error('Failed to delete about section')
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      icon: '📝',
      order: 0
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

//   const iconOptions = [
//     '📝', '💡', '🎯', '🚀', '⚡', '🔥', '💻', '🎨', '📊', '🏆',
//     '🌟', '💼', '🔧', '📱', '🌐', '🎪', '🎭', '🎨', '🎯', '🎪'
//   ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          About Sections
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add About Section
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingIndex !== null ? 'Edit About Section' : 'Add About Section'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., My Passion, What I Do"
                    required
                  />
                </div>
                
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon} {icon}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe this aspect of yourself..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingIndex !== null ? 'Update Section' : 'Add Section'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <AnimatePresence>
          {aboutSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  {/* <div className="text-3xl">{section.icon}</div> */}
                  <div className="flex-1 ">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed ">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {aboutSections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No About Sections Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create custom about sections to tell your story
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Section
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default AboutSectionManager