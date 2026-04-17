import i18n from '../i18n';

/**
 * Wrapper around fetch that automatically forwards the current i18n language
 * as the Accept-Language header so the API returns localized product content.
 */
export async function apiFetch(url: string, init?: RequestInit): Promise<Response> {
  const lang = i18n.language?.split('-')[0] || 'fr';
  const headers = new Headers(init?.headers);
  headers.set('Accept-Language', lang);
  return fetch(url, { ...init, headers });
}
