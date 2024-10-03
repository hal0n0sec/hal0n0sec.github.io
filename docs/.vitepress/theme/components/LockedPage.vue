<template>
    <div v-if="isLocked" class="max-w-lg mx-auto p-6 bg-white rounded-lg border text-center">
        <h1 class="text-3xl font-bold mb-4">🔒 该页面已锁定</h1>
        <p class="mb-4">请输入密码查看内容</p>
        <input v-model="passwordInput" type="password" class="border p-2 rounded w-full mb-4" placeholder="请输入密码" />
        <button @click="unlockPage" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">解锁</button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script setup>
import CryptoJS from 'crypto-js';
import { ref, onMounted } from 'vue';

const correctHash = ref('');
const salt = ref('');
const passwordInput = ref('');
const error = ref('');
const isLocked = ref(true);

const unlockPage = () => {

    if (!salt.value || !correctHash.value) {
        error.value = '密码错误，请联系管理员';
        return;
    }

    try {
        const hash = CryptoJS.HmacSHA256(passwordInput.value, salt.value).toString();

        if (hash === correctHash.value) {
            const unlockData = {
                unlocked: true,
                timestamp: new Date().getTime(),
            };
            localStorage.setItem('pageUnlockData', JSON.stringify(unlockData));
            isLocked.value = false;
            error.value = '';
        } else {
            error.value = '密码错误，请重新输入';
        }
    } catch (e) {
        error.value = '解锁过程出错，请重试';
    }
};

onMounted(() => {
    correctHash.value = import.meta.env.VITE_PAGE_PASSWORD_HASH || '';
    salt.value = import.meta.env.VITE_PAGE_PASSWORD_SALT || '';

    const storedData = localStorage.getItem('pageUnlockData');
    if (storedData) {
        const { unlocked, timestamp } = JSON.parse(storedData);
        const currentTime = new Date().getTime();
        const expirationTime = 24 * 60 * 60 * 1000;
        if (unlocked && currentTime - timestamp < expirationTime) {
            isLocked.value = false;
        }
    }
});
</script>