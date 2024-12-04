import React, { useState } from 'react';
import { UserPlus, Users, ArrowLeft } from 'lucide-react';
import { storage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ email: '', orderCode: '', urlCode: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const allUsers = Object.entries(storage.getAllData()).map(([orderCode, data]) => ({
    email: data.email,
    orderCode,
    urlCode: data.urlCode,
    redirectUrl: data.redirectUrl
  }));

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.orderCode || !newUser.urlCode) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      return;
    }

    // Verificar se o código já existe
    if (storage.getUserData(newUser.orderCode)) {
      setMessage({ type: 'error', text: 'Código de pedido já existe' });
      return;
    }

    // Verificar se o código da URL já existe
    const existingUrlCode = Object.values(storage.getAllData()).some(
      user => user.urlCode === newUser.urlCode
    );
    if (existingUrlCode) {
      setMessage({ type: 'error', text: 'Código da URL já existe' });
      return;
    }

    // Adicionar novo usuário
    storage.saveUserData(newUser.orderCode, newUser.email, newUser.urlCode, '');
    setNewUser({ email: '', orderCode: '', urlCode: '' });
    setMessage({ type: 'success', text: 'Usuário adicionado com sucesso' });

    // Limpar mensagem após 3 segundos
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleBack = () => {
    storage.setAdminAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Voltar para o Início
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Painel Administrativo</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <UserPlus className="w-6 h-6 mr-2" />
                Adicionar Novo Usuário
              </h2>
              <form onSubmit={handleAddUser} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email do Cliente
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="cliente@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="orderCode" className="block text-sm font-medium text-gray-700">
                    Código do Pedido
                  </label>
                  <input
                    type="text"
                    id="orderCode"
                    value={newUser.orderCode}
                    onChange={(e) => setNewUser(prev => ({ ...prev, orderCode: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ORD123"
                  />
                </div>
                <div>
                  <label htmlFor="urlCode" className="block text-sm font-medium text-gray-700">
                    Código da URL (6 caracteres)
                  </label>
                  <input
                    type="text"
                    id="urlCode"
                    value={newUser.urlCode}
                    onChange={(e) => setNewUser(prev => ({ ...prev, urlCode: e.target.value.toUpperCase().slice(0, 6) }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ABC123"
                    maxLength={6}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Use letras maiúsculas e números (ex: ABC123)
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Adicionar Usuário
                </button>
                {message.text && (
                  <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {message.text}
                  </p>
                )}
              </form>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Usuários Cadastrados
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código do Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código da URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link Atual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.orderCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.urlCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.redirectUrl || 'Não configurado'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};