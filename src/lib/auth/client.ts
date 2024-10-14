'use client';

import axios from 'axios';
import type { User } from '@/types/user';

// function generateToken(): string {
//   const arr = new Uint8Array(12);
//   window.crypto.getRandomValues(arr);
//   return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
// }

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar.png',
//   firstName: '',
//   lastName: '',
//   email: 'admin@admin.com',
// } satisfies User;

export interface SignUpParams {
  tipo: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    try {
      const BASE_URL = 'https://dev-service.feicortesp.com';
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem('custom-auth-token', token);

      const userResponse = await this.getUser();
      if (userResponse.error) {
        return { error: userResponse.error };
      }

      return { user: userResponse.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log do erro para depuração
        console.error('Erro na requisição:', error);
        return { error: error.response?.data?.message ?? 'Erro desconhecido.' };
      } else {
        console.error('Erro inesperado:', error);
        return { error: 'Erro inesperado.' };
      }
    }
  }


  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      const response = await axios.get('https://dev-service.feicortesp.com/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data as User }; // Supondo que a resposta da API inclua os dados do usuário
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return { error: 'Erro ao obter o usuário.' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
