interface StoredData {
  [orderCode: string]: {
    email: string;
    urlCode: string;
    redirectUrl: string;
  };
}

export const storage = {
  saveUserData: (orderCode: string, email: string, urlCode: string, redirectUrl: string = '') => {
    const data = storage.getAllData();
    data[orderCode] = { email, urlCode, redirectUrl };
    localStorage.setItem('qrcode_data', JSON.stringify(data));
  },

  getUserData: (orderCode: string) => {
    const data = storage.getAllData();
    return data[orderCode];
  },

  getAllData: (): StoredData => {
    const stored = localStorage.getItem('qrcode_data');
    return stored ? JSON.parse(stored) : {};
  },

  generateUrlCode: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  clearAllData: () => {
    localStorage.removeItem('qrcode_data');
  },

  initializeWithMockData: () => {
    storage.clearAllData();
    
    const mockUsers = [
      {
        email: "joao@teste.com",
        orderCode: "ORD123",
        urlCode: "XK9P2M",
        redirectUrl: "https://instagram.com/joao"
      },
      {
        email: "maria@teste.com",
        orderCode: "ORD456",
        urlCode: "LN5R7T",
        redirectUrl: "https://linkedin.com/in/maria"
      }
    ];

    mockUsers.forEach(user => {
      storage.saveUserData(user.orderCode, user.email, user.urlCode, user.redirectUrl);
    });
  },

  // Admin authentication
  verifyAdminPassword: (password: string) => {
    return password === '123';
  },

  setAdminAuthenticated: (status: boolean) => {
    localStorage.setItem('adminAuthenticated', status ? 'true' : 'false');
  },

  isAdminAuthenticated: () => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  }
};