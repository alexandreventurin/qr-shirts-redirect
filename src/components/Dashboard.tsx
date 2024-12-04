import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { Link2, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

export const Dashboard = () => {
  const { auth, logout, getRedirectUrl, setRedirectUrl } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = window.location.origin;
  const fullRedirectUrl = `${baseUrl}/${auth.urlCode}`;

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      if (!auth.urlCode) throw new Error('Código da URL não encontrado');
      
      await api.updateRedirectUrl(auth.urlCode, getRedirectUrl());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setError('Erro ao salvar o link. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </button>
              <div className="flex items-center">
                <Link2 className="w-6 h-6 text-blue-600" />
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  Gerenciador de Redirecionamento
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Seu QR Code</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Este é o QR Code único da sua camisa.
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-center">
                    <QRCodeSVG value={fullRedirectUrl} size={200} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Link de Redirecionamento</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Digite o link para onde você quer que as pessoas sejam redirecionadas
                  </p>
                  <div className="mt-4">
                    <input
                      type="url"
                      value={getRedirectUrl()}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://seu-link.com"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {isSaving ? 'Salvando...' : 'Salvar Link'}
                    </button>
                    {saveSuccess && (
                      <span className="ml-3 text-sm text-green-600">
                        Link salvo com sucesso!
                      </span>
                    )}
                    {error && (
                      <span className="ml-3 text-sm text-red-600">
                        {error}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Informações</h3>
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Seu email</dt>
                        <dd className="mt-1 text-sm text-gray-900">{auth.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Código do pedido</dt>
                        <dd className="mt-1 text-sm text-gray-900">{auth.orderCode}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Código da URL</dt>
                        <dd className="mt-1 text-sm text-gray-900">{auth.urlCode}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">URL do QR Code</dt>
                        <dd className="mt-1 text-sm text-gray-900">{fullRedirectUrl}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};