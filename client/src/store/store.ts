import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';

import 'react-toastify/dist/ReactToastify.css';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  isFrontLng = true;
  totalWords: number | string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setLanguage(bool: boolean) {
    this.isFrontLng = bool;
  }

  setTotalWords(count: number) {
    this.totalWords = count;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      throw error.response.data?.message;
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      throw error.response.data?.message;
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      console.log(error.response.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
