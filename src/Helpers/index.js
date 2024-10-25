export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function base64ToImage(base64String) {
  const image = new Image();
  image.src = `data:image/png;base64,${base64String}`; // Adjust the MIME type as needed
  return image;
}

export const endpoints = ["products", "orders", "customers", "users"]