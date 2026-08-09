const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME || '';
const DEFAULT_PORT = 8000;

export const API_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${DEFAULT_PORT}`;

export const API_BASE_URL = `${API_HOST}/api`;

export function buildApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
