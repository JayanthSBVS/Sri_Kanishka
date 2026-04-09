/**
 * matrimony.service.js
 * Business logic for matrimony registration, payment, and profile listing.
 * No req/res here — only data in, data out.
 */

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const matrimonyRepo = require('../repositories/matrimony.repository');
const paymentService = require('./payment.service');

const JWT_SECRET = process.env.JWT_SECRET;
const { generateId } = require('../utils/id.util');

/**
 * Register a new matrimony profile directly (no global auth required).
 * @param {Object} formData
 * @param {Object} file - The uploaded profile photo file
 * @returns {Promise<Object>}
 */
async function registerProfile(formData, file) {
  // Check if profile already exists for this email
  const existing = await matrimonyRepo.findByEmail(formData.email);
  if (existing) {
    const error = new Error('A Matrimony Profile with this email already exists.');
    error.statusCode = 400;
    throw error;
  }

  // Hash the matrimony password 
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(formData.password, salt);

  const newProfile = {
    id: uuidv4(),
    email: formData.email,
    passwordHash,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    serviceType: formData.serviceType,
    profileData: {
      profileFor: formData.profileFor,
      gender: formData.gender,
      dob: formData.dob,
      religion: formData.religion,
      caste: formData.caste,
      education: formData.education,
      profession: formData.profession,
      maritalStatus: formData.maritalStatus,
    },
    profilePhoto: file ? `/uploads/profiles/${file.filename}` : null,
    status: 'pending',     // Paid & Verified?
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const created = await matrimonyRepo.create(newProfile);

  // Auto-login them with a matrimony token
  const token = jwt.sign({ sub: created.id, type: 'matrimony' }, JWT_SECRET, { expiresIn: '7d' });

  // Exclude passwordHash from response
  const { passwordHash: _, ...profileWithoutPassword } = created;
  return { profile: profileWithoutPassword, token };
}

/**
 * Login for Matrimony specific account.
 */
async function loginProfile(email, password) {
  const profile = await matrimonyRepo.findByEmail(email);
  if (!profile) {
    const err = new Error('Invalid Matrimony credentials');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, profile.passwordHash);
  if (!isMatch) {
    const err = new Error('Invalid Matrimony credentials');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ sub: profile.id, type: 'matrimony' }, JWT_SECRET, { expiresIn: '7d' });
  
  const { passwordHash: _, ...profileWithoutPassword } = profile;
  return { profile: profileWithoutPassword, token };
}

/**
 * Process payment for a profile.
 * On success: status → active, paymentStatus → paid.
 * On failure: record remains pending/unpaid.
 *
 * @param {string} profileId
 * @param {boolean} simulateSuccess
 * @returns {Promise<{ profile: Object, payment: Object }>}
 */
async function payForProfile(profileId, simulateSuccess) {
  const profile = await matrimonyRepo.findById(profileId);
  if (!profile) {
    const err = new Error('Profile not found');
    err.statusCode = 404;
    throw err;
  }

  if (profile.paymentStatus === 'paid') {
    const err = new Error('Profile is already paid');
    err.statusCode = 409;
    throw err;
  }

  const payment = await paymentService.processPayment({ simulateSuccess });

  let updatedProfile;
  if (payment.success) {
    updatedProfile = await matrimonyRepo.updateById(profileId, {
      status: 'active',
      paymentStatus: 'paid',
      transactionId: payment.transactionId,
    });
  } else {
    // Profile stays pending — just return it unchanged
    updatedProfile = profile;
  }

  return { profile: updatedProfile, payment };
}

/**
 * Fetch all active matrimony profiles.
 * @returns {Promise<Array>}
 */
async function getActiveProfiles() {
  return matrimonyRepo.findActive();
}

/**
 * Fetch a profile by its Matrimony ID.
 * @param {string} matrimonyId
 * @returns {Promise<Object|null>}
 */
async function getMyProfile(matrimonyId) {
  const profile = await matrimonyRepo.findById(matrimonyId);
  if(!profile) return null;
  const { passwordHash: _, ...safeProfile } = profile;
  return safeProfile;
}

/**
 * Update a user's matrimony profile data.
 * @param {string} matrimonyId
 * @param {Object} formFields - The new fields to merge
 * @returns {Promise<Object>}
 */
async function updateMyProfile(matrimonyId, formFields) {
  const profile = await matrimonyRepo.findById(matrimonyId);
  if (!profile) {
    const err = new Error('Profile not found');
    err.statusCode = 404;
    throw err;
  }
  
  // Keep flexible data structure but merge updates
  const updatedProfileData = { ...profile.profileData, ...formFields };
  
  const updated = await matrimonyRepo.updateById(profile.id, { profileData: updatedProfileData });
  const { passwordHash: _, ...safeProfile } = updated;
  return safeProfile;
}

module.exports = { registerProfile, loginProfile, payForProfile, getActiveProfiles, getMyProfile, updateMyProfile };
