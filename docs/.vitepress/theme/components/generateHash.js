const CryptoJS = require('crypto-js');

// 原始密码
const password = 'Huang@1020.p@ssw0d';

// 生成一个随机盐
const salt = CryptoJS.lib.WordArray.random(128/8).toString();

// 生成哈希值
const hash = CryptoJS.SHA256(password + salt).toString();

console.log(`VITE_PAGW_PASSWORD_HASH=${hash}`);
console.log(`VITE_PAGE_PASSWORD_SALT=${salt}`);