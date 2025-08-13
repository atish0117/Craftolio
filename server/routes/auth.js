import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register', [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { fullName, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        resumeUrl: user.resumeUrl,
        title: user.title,
        phoneNumber: user.phoneNumber,
        location: user.location,
        intro: user.intro,
        bio: user.bio,
        socialLinks: user.socialLinks,
        skills: user.skills,
        aboutSections: user.aboutSections,
        availability: user.availability,
        hourlyRate: user.hourlyRate,
        preferredWorkType: user.preferredWorkType,
        languages: user.languages,
        timezone: user.timezone,
        workExperience: user.workExperience,
        experienceDetails: user.experienceDetails,
        education: user.education,
        testimonials: user.testimonials,
        certifications: user.certifications,
        sectionOrder: user.sectionOrder,
        visibleSections: user.visibleSections,
        selectedTemplate: user.selectedTemplate
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
})

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        resumeUrl: user.resumeUrl,
        title: user.title,
        phoneNumber: user.phoneNumber,
        location: user.location,
        intro: user.intro,
        bio: user.bio,
        socialLinks: user.socialLinks,
        skills: user.skills,
        aboutSections: user.aboutSections,
        availability: user.availability,
        hourlyRate: user.hourlyRate,
        preferredWorkType: user.preferredWorkType,
        languages: user.languages,
        timezone: user.timezone,
        workExperience: user.workExperience,
        experienceDetails: user.experienceDetails,
        education: user.education,
        testimonials: user.testimonials,
        certifications: user.certifications,
        sectionOrder: user.sectionOrder,
        visibleSections: user.visibleSections,
        selectedTemplate: user.selectedTemplate
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error during login' })
  }
})

// Get Profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        fullName: req.user.fullName,
        username: req.user.username,
        email: req.user.email,
        profileImgUrl: req.user.profileImgUrl,
        resumeUrl: req.user.resumeUrl,
        title: req.user.title,
         phoneNumber: req.user.phoneNumber,
        location: req.user.location,
        intro: req.user.intro,
        bio: req.user.bio,
        socialLinks: req.user.socialLinks,
        skills: req.user.skills,
        aboutSections: req.user.aboutSections,
        availability: req.user.availability,
        hourlyRate: req.user.hourlyRate,
        preferredWorkType: req.user.preferredWorkType,
        languages: req.user.languages,
        timezone: req.user.timezone,
        workExperience: req.user.workExperience,
        experienceDetails: req.user.experienceDetails,
        education: req.user.education,
        testimonials: req.user.testimonials,
        certifications: req.user.certifications,
        sectionOrder: req.user.sectionOrder,
        visibleSections: req.user.visibleSections,
        selectedTemplate: req.user.selectedTemplate
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      fullName,
      title,
      phoneNumber,
      location,
      intro,
      bio,
      skills,
      aboutSections,
      availability,
      hourlyRate,
      preferredWorkType,
      languages,
      timezone,
      workExperience,
      socialLinks,
      profileImgUrl,
      resumeUrl,
      experienceDetails,
      education,
      testimonials,
      certifications,
      selectedTemplate
    } = req.body

    console.log('Received profile update request:', {
      profileImgUrl,
      resumeUrl,
      fullName,
      title,
      phoneNumber,
      location
    })

    const updateData = {}
    
    if (fullName) updateData.fullName = fullName
    if (title !== undefined) updateData.title = title
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber
    if (location !== undefined) updateData.location = location
    if (intro !== undefined) updateData.intro = intro
    if (bio !== undefined) updateData.bio = bio
    if (skills) updateData.skills = skills
    if (workExperience) updateData.workExperience = workExperience
    if (socialLinks) updateData.socialLinks = socialLinks
    if (profileImgUrl !== undefined) updateData.profileImgUrl = profileImgUrl
    if (resumeUrl !== undefined) updateData.resumeUrl = resumeUrl
     if (aboutSections) updateData.aboutSections = aboutSections
    if (availability) updateData.availability = availability
    if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate
    if (preferredWorkType) updateData.preferredWorkType = preferredWorkType
    if (languages) updateData.languages = languages
    if (timezone !== undefined) updateData.timezone = timezone
    if (experienceDetails) updateData.experienceDetails = experienceDetails
    if (education) updateData.education = education
    if (testimonials) updateData.testimonials = testimonials
    if (certifications) updateData.certifications = certifications
    if (selectedTemplate) updateData.selectedTemplate = selectedTemplate

    console.log('Updating user profile with data:', updateData)

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')

    console.log('Updated user profile:', {
      userId: user._id,
      profileImgUrl: user.profileImgUrl,
      resumeUrl: user.resumeUrl,
      fullName: user.fullName,

    })

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        resumeUrl: user.resumeUrl,
        title: user.title,
        phoneNumber: user.phoneNumber,
        location: user.location,
        intro: user.intro,
        bio: user.bio,
        socialLinks: user.socialLinks,
        skills: user.skills,
        aboutSections: user.aboutSections,
        availability: user.availability,
        hourlyRate: user.hourlyRate,
        preferredWorkType: user.preferredWorkType,
        languages: user.languages,
        timezone: user.timezone,
        workExperience: user.workExperience,
        experienceDetails: user.experienceDetails,
        education: user.education,
        testimonials: user.testimonials,
        certifications: user.certifications,
        sectionOrder: user.sectionOrder,
        visibleSections: user.visibleSections,
        selectedTemplate: user.selectedTemplate
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Server error during profile update' })
  }
})

export default router