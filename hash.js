import * as coder from './coder.js';

 /**
 * 計算雜湊
 * 
 * @param {string} alg 雜湊演算法，可為：SHA-1、SHA-256、SHA-384、SHA-512
 * @param {string} data 要被取雜湊的字串
 * @param {(function|null)} ouputFunc 輸出轉換函式
 * @returns {Promise} 用 ouputFunc 轉換後的結果，如果 ouputFunc 沒指定，則直接回傳 ArrayBuffer
 */
export async function hash(alg, data, ouputFunc) {
    data=coder.fromUtf8(data);
    let buf=await crypto.subtle.digest(alg, data);
    return ouputFunc?ouputFunc(buf):buf;
}

/**
 * 計算 hmac
 * 
 * @param {string} alg 雜湊演算法，可為：SHA-1、SHA-256、SHA-384、SHA-512
 * @param {string} data 要被取雜湊的字串
 * @param {string} key 密鑰
 * @param {(function|null)} ouputFunc 輸出轉換函式
 * @returns {Promise} 用 ouputFunc 轉換後的結果，如果 ouputFunc 沒指定，則直接回傳 ArrayBuffer
 */
export async function hmac(alg, data, key, ouputFunc) {
    data=coder.fromUtf8(data);
    key=coder.fromUtf8(key);
    key=await crypto.subtle.importKey('raw', key, {
        name: 'HMAC',
        hash:{
            name: alg
        }
    }, false, ['sign', 'verify']);
    let buf=await crypto.subtle.sign('HMAC', key, data);
    return ouputFunc?ouputFunc(buf):buf;
}