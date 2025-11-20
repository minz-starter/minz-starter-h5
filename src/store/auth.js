import { defineStore } from "pinia";
import { computed, h, ref } from "vue";
import * as api from "@/api/index.js";

/**
 * 获取认证user
 */
export const useAuth = defineStore("auth-space", () => {

    const storageKey = "user-auth";

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
  const getUser = async (k) => {
    // 获取token
    let token = getToken(k);
    const res = await api.user.get({
        headers: { token  }
    })
    return res.data ?? null;
  };

  return { getToken, setToken, clearToken, getUser };
});
