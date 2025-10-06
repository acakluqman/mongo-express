const userRepository = require('../repositories/UserRepository');

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(userData) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    // If email is being changed, check if new email already exists
    if (userData.email && userData.email !== user.email) {
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }
    
    return await userRepository.update(id, userData);
  }

  async deleteUser(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    return await userRepository.delete(id);
  }
}

module.exports = new UserService();