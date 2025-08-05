import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const AnalyticsManager = () => {
  const { user } = useSelector((state) => state.auth)

  const [analyticsData, setAnalyticsData] = useState({
    views: 0,
    uniqueVisitors: 0,
    averageTime: '0:00',
    topSections: [],
    recentVisits: []
  })

  useEffect(() => {
    const mockData = {
      views: Math.floor(Math.random() * 1000) + 100,
      uniqueVisitors: Math.floor(Math.random() * 500) + 50,
      averageTime: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      topSections: [
        { name: 'Hero Section', views: Math.floor(Math.random() * 100) + 50 },
        { name: 'Projects', views: Math.floor(Math.random() * 80) + 40 },
        { name: 'Skills', views: Math.floor(Math.random() * 60) + 30 },
        { name: 'Experience', views: Math.floor(Math.random() * 50) + 25 },
        { name: 'Contact', views: Math.floor(Math.random() * 40) + 20 },
      ],
      recentVisits: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        views: Math.floor(Math.random() * 50) + 10
      })).reverse()
    }
    setAnalyticsData(mockData)
  }, [])

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-6 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-60">{icon}</div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Portfolio Analytics
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value={analyticsData.views.toLocaleString()}
          icon="👁️"
          color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100"
        />
        <StatCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          icon="👥"
          color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-900 dark:text-green-100"
        />
        <StatCard
          title="Avg. Time"
          value={analyticsData.averageTime}
          icon="⏱️"
          color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-900 dark:text-purple-100"
        />
        <StatCard
          title="Portfolio URL"
          value={`/${user?.username}`}
          // icon="🔗"
          color="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-900 dark:text-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Most Viewed Sections
          </h3>
          <div className="space-y-3">
            {analyticsData.topSections.map((section, index) => (
              <div key={section.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' :
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-900 dark:text-white">{section.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(section.views / Math.max(...analyticsData.topSections.map(s => s.views))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                    {section.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity (7 days)
          </h3>
          <div className="space-y-3">
            {analyticsData.recentVisits.map((visit) => (
              <div key={visit.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {visit.date}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(visit.views / Math.max(...analyticsData.recentVisits.map(v => v.views))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-right">
                    {visit.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800"
      >
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
          📊 Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800 dark:text-indigo-200">
          <div>
            <h4 className="font-medium mb-2">🎯 Performance Insights:</h4>
            <ul className="space-y-1">
              <li>• Your portfolio has great engagement!</li>
              <li>• Projects section is performing well</li>
              <li>• Average session time is above industry standard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">💡 Improvement Tips:</h4>
            <ul className="space-y-1">
              <li>• Add more projects to increase engagement</li>
              <li>• Update your bio to improve conversion</li>
              <li>• Consider adding testimonials section</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Share Your Portfolio
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={`${window.location.origin}/${user?.username}`}
              readOnly
              className="input-field"
            />
          </div>
          <motion.button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
              toast.success('Portfolio URL copied to clipboard!')
            }}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Copy Link
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsManager
