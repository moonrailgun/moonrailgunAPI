/**
 * 根据文件获取其base64编码
 * @param file 文件
 */
export async function getFileBase64(file: File | Blob, withMIME = false) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let base64 = String(e.target?.result);

      if (withMIME === false) {
        // 移除mime
        base64 = base64.split(',')[1];
      }
      resolve();
    };

    reader.onerror = (e) => {
      reject(e.target?.error);
    };
  });
}
