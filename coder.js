//utf8編碼器
const utf8enc = new TextEncoder();
const utf8dec = new TextDecoder();

//數值(0~255) => 16進位(00~FF)

const hexMaps=(()=>{
    let h2v={}, v2h={};
    let tmp=Array.from('0123456789abcdef');
    for(let x=0;x<256;++x) {
        let h=tmp[x>>>4]+tmp[x&15];
        h2v[h]=x;
        v2h[x]=h;
    }
    return {
        h2v: h2v,
        v2h: v2h,
    };
})();

/**
 * 將字串轉換為 ArrayBuffer
 * 
 * @param {string} str 字串
 * @returns {ArrayBuffer}
 */
function fromUtf8(str){
    return utf8enc.encode(str).buffer;
}

/**
 * 將 base64 字串轉換為 ArrayBuffer
 * 
 * @param {string} b64 base64 字串
 * @returns {ArrayBuffer} 
 */
function fromBase64(b64){
    return (Uint8Array.from(atob(b64), x=>x.charCodeAt())).buffer;
}

/**
 * 將 16進位字串轉換為 ArrayBuffer
 * @param {string} hex 16進位字串
 * @returns {ArrayBuffer} 
 */
function fromHex(hex){
    let n=hex.length;
    let map=hexMaps.h2v;
    if(n&1) {
        throw '16進位字串必須有偶數個字元';
    }
    let arr=new Uint8Array(n>>>1);
    for(let i=1;i<n;i+=2) {
        arr[i>>>1]=map[hex.slice(i-1, i+1)];
    }
    return arr.buffer;
}

/**
 * 將 ArrayBuffer 的內容轉換為字串
 * 
 * @param {ArrayBuffer} buffer 
 * @returns {string} 字串
 */
function toUtf8(buffer){
    return utf8dec.decode(buffer);
}

/**
 * 將 ArrayBuffer 的內容轉換為 base64 字串
 * 
 * @param {ArrayBuffer} buffer 
 * @returns {string} base64 字串
 */
function toBase64(buffer){
    let u8arr=new Uint8Array(buffer);
    let s=String.fromCharCode.apply(null, u8arr);
    return btoa(s);
}

/**
 * 將 ArrayBuffer 的內容轉換為 hex 字串
 * 
 * @param {ArrayBuffer} buffer 
 * @returns {string} hex 字串
 */
function toHex(buffer){
    let u8arr=new Uint8Array(buffer);
    let map=hexMaps.v2h;
    let s='';
    for(let i=0,n=u8arr.length;i<n;++i) {
        s+=map[u8arr[i]];
    }
    return s;
}

export {fromBase64, fromHex, toBase64, toHex, fromUtf8, toUtf8};