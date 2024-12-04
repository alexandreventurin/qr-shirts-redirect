import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Settings } from 'lucide-react';
import { LoginFormData } from '../types';
import { storage } from '../utils/storage';

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    orderCode: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userData = storage.getUserData(formData.orderCode);
      
      if (userData && userData.email.toLowerCase() === formData.email.toLowerCase()) {
        login({
          email: userData.email,
          orderCode: formData.orderCode,
          redirectUrl: userData.redirectUrl
        });
        navigate('/dashboard');
      } else {
        setError('Email ou código do pedido inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  // Get only test users
  const testUsers = [
    { email: "joao@teste.com", orderCode: "ORD123" },
    { email: "maria@teste.com", orderCode: "ORD456" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Acesso ao Gerenciamento</h2>
          <p className="mt-2 text-gray-600 text-center">
            Digite seu email e o código do pedido para acessar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="orderCode" className="block text-sm font-medium text-gray-700">
              Código do Pedido
            </label>
            <input
              type="text"
              id="orderCode"
              value={formData.orderCode}
              onChange={(e) => setFormData(prev => ({ ...prev, orderCode: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="ORD123"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Acessar
          </button>
        </form>

        <div className="mt-8">
          <Link
            to="/admin"
            className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-4 h-4 mr-1" />
            Acesso Administrativo
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Usuários para teste:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {testUsers.map((user, index) => (
              <div key={index} className="p-2 bg-white rounded border border-gray-200">
                <p>Email: {user.email}</p>
                <p>Código: {user.orderCode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};