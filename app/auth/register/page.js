'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function CadastroHospede() {
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', endereco: '', telefone: '', senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Criar usuário no Supabase Auth (Sistema de Autenticação)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Inserir na tabela 'usuarios' para definir o tipo como 'hospede'
    const { error: typeError } = await supabase
      .from('usuarios')
      .insert([{ id: authData.user.id, email: formData.email, tipo: 'hospede' }]);

    // 3. Inserir os dados detalhados na tabela 'hospedes'
    const { error: dataError } = await supabase
      .from('hospedes')
      .insert([{
        id: authData.user.id,
        nome_completo: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        endereco: formData.endereco,
        telefone: formData.telefone,
        login_acesso: formData.email // Usando email como login por padrão
      }]);

    if (dataError || typeError) {
      setError("Erro ao salvar dados complementares.");
    } else {
      alert("Cadastro realizado com sucesso!");
      router.push('/auth/login');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] font-poppins px-6 py-12 relative overflow-hidden">
      {/* Brilho de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[400px] bg-black/60 border border-white/10 rounded-[3rem] p-10 backdrop-blur-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">
            Criar<span className="text-amber-500 font-black italic">Conta</span>
          </h1>
          <div className="h-[1px] w-12 bg-amber-500/50 mx-auto mt-3"></div>
        </div>

        {error && <p className="text-red-500 text-[10px] text-center mb-4 uppercase font-bold">{error}</p>}

        <form onSubmit={handleCadastro} className="space-y-4">
          {[
            { label: 'Nome Completo', key: 'nome', type: 'text' },
            { label: 'E-mail', key: 'email', type: 'email' },
            { label: 'CPF', key: 'cpf', type: 'text' },
            { label: 'Telefone', key: 'telefone', type: 'text' },
            { label: 'Endereço', key: 'endereco', type: 'text' },
            { label: 'Definir Senha', key: 'senha', type: 'password' },
          ].map((f) => (
            <div key={f.key} className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-amber-500/80 ml-4 font-bold">{f.label}</label>
              <input 
                required
                type={f.type}
                className="w-full bg-white/5 border border-amber-500/30 px-5 py-3 rounded-2xl outline-none focus:border-amber-500 text-sm text-white"
                onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
              />
            </div>
          ))}

          <button 
            disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase text-[11px] tracking-widest rounded-2xl transition-all shadow-lg mt-4"
          >
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>

        <button 
          onClick={() => router.push('/auth/login')}
          className="w-full text-[9px] text-gray-500 uppercase font-bold mt-6 hover:text-white transition-colors"
        >
          Já tenho conta. Voltar ao login
        </button>
      </div>
    </main>
  );
}