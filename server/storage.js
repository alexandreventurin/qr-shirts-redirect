// Simple in-memory storage for demonstration
let urlMappings = new Map();

export const serverStorage = {
  setRedirectUrl(urlCode, redirectUrl) {
    urlMappings.set(urlCode, redirectUrl);
  },

  getRedirectUrl(urlCode) {
    return urlMappings.get(urlCode);
  },

  // Initialize with some test data
  initializeTestData() {
    this.setRedirectUrl('XK9P2M', 'https://instagram.com/joao');
    this.setRedirectUrl('LN5R7T', 'https://linkedin.com/in/maria');
  }
};

// Initialize test data
serverStorage.initializeTestData();