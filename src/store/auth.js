import { defineStore } from "pinia";
import { computed, h, ref } from "vue";
import * as api from "@/api/index.js";

/**
 * 获取认证user
 */
export const useAuth = defineStore("auth-store", () => {

    const storageKey = "token";

    const clearToken = () => {
        localStorage.removeItem(storageKey);
    };

    const setToken = (newToken) => {
        localStorage.setItem(storageKey, newToken);
    };

    const getToken = (k) => {
        return localStorage.getItem(storageKey) ?? "";
    };

  // 获取用户信息
  const getAuthUser = async (k) => {
    // 获取token
    let token = getToken(k);
    const res = await api.user.getInfo()
    return res.data ?? null;
  };

  return { getToken, setToken, clearToken, getAuthUser };
});
