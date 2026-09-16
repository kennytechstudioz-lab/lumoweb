const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getApiUrl = (): string => {
  // 1. If explicit environment variable is set and not localhost, use it
  if (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. Client-side browser execution: check current window location
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If running in production domain or any external hostname, point to live production API
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://api.lumogroupintl.com/api';
    }
  }

  // 3. Server-side in production environment
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.lumogroupintl.com/api';
  }

  // 4. Default for local development
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5012/api';
};

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getApiUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    // If response is not JSON
    data = text;
  }

  if (!response.ok) {
    const errorMsg = (data && typeof data === 'object' && data.message) || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  get: <T = any>(path: string, options?: RequestInit) => 
    apiFetch<T>(path, { method: 'GET', ...options }),
    
  post: <T = any>(path: string, body?: any, options?: RequestInit) => 
    apiFetch<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),
    
  put: <T = any>(path: string, body?: any, options?: RequestInit) => 
    apiFetch<T>(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),
    
  delete: <T = any>(path: string, options?: RequestInit) => 
    apiFetch<T>(path, { method: 'DELETE', ...options }),
};
