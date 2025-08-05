



// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { motion } from 'framer-motion'
// import { logout } from '../../store/slices/authSlice'
// import { toggleTheme } from '../../store/slices/themeSlice'
// import ThemeToggle from '../ui/ThemeToggle'
// import NotificationCenter from '../ui/NotificationCenter'
// import CommandPalette from '../ui/CommandPalette'

// const Navbar = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/')
//   }

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="sticky top-0 z-50 glassmorphism border-b border-gray-200 dark:border-dark-700"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="text-2xl font-bold gradient-bg bg-clip-text text-transparent"
//             >
//               PortfolioBuilder
//             </motion.div>
//           </Link>

//           <div className="flex-1 max-w-md mx-8">
//             <CommandPalette />
//           </div>

//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
            
//             {isAuthenticated && <NotificationCenter />}
            
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/dashboard"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 {user?.username && (
//                   <Link
//                     to={`/${user.username}`}
//                     className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                   >
//                     My Portfolio
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="btn-secondary"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn-primary"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   )
// }

// export default Navbar




import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { logout } from '../../store/slices/authSlice'
import { toggleTheme } from '../../store/slices/themeSlice'
import ThemeToggle from '../ui/ThemeToggle'
import NotificationCenter from '../ui/NotificationCenter'
import SearchBar from '../ui/SearchBar'
import CommandPalette from '../ui/CommandPalette'
import ExportOptions from '../ui/ExportOptions'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [showExportOptions, setShowExportOptions] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glassmorphism border-b border-gray-200 dark:border-dark-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-bg bg-clip-text text-transparent"
            >
              Craftolio
            </motion.div>
          </Link>

          {/* <div className="flex-1 max-w-md mx-8">
            <SearchBar />
          </div> */}
          <div className="flex-1 max-w-md mx-8">
            <CommandPalette />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated && <NotificationCenter />}

            {isAuthenticated && (
              <motion.button
                onClick={() => setShowExportOptions(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Export Portfolio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Dashboard
                </Link>
                {user?.username && (
                  <Link
                    to={`/${user.username}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    My Portfolio
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <ExportOptions 
        isOpen={showExportOptions} 
        onClose={() => setShowExportOptions(false)} 
      />
    </motion.nav>
  )
}

export default Navbar
