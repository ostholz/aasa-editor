import type { AASAFile, ValidationError } from './types.js';

export async function loadAASAFromURL(url: string, useProxy: boolean = false): Promise<AASAFile> {
  try {
    // 如果使用代理，添加CORS代理前缀
    const fetchUrl = useProxy ? `https://api.allorigins.win/get?url=${encodeURIComponent(url)}` : url;
    
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    let data;
    if (useProxy) {
      // 使用代理时，响应被包装在contents字段中
      const proxyResponse = await response.json();
      if (!proxyResponse.contents) {
        throw new Error('Proxy response does not contain contents');
      }
      data = JSON.parse(proxyResponse.contents);
    } else {
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json') && !contentType?.includes('text/plain')) {
        console.warn('Content-Type is not application/json, but attempting to parse as JSON');
      }
      data = await response.json();
    }
    
    return validateAASAStructure(data);
  } catch (error) {
    if (error instanceof Error) {
      // 如果是CORS错误且还没有使用代理，建议使用代理
      if (error.message.includes('CORS') || error.message.includes('NetworkError') || error.message.includes('fetch')) {
        if (!useProxy) {
          throw new Error(`CORS error detected. Try enabling proxy mode or ensure the server allows cross-origin requests. Original error: ${error.message}`);
        }
      }
      throw new Error(`Failed to load AASA file: ${error.message}`);
    }
    throw new Error('Failed to load AASA file: Unknown error');
  }
}

export function validateAASAStructure(data: any): AASAFile {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid AASA file: Root must be an object');
  }
  
  if (!data.applinks || typeof data.applinks !== 'object') {
    throw new Error('Invalid AASA file: Missing or invalid applinks section');
  }
  
  if (!Array.isArray(data.applinks.details)) {
    throw new Error('Invalid AASA file: applinks.details must be an array');
  }
  
  return data as AASAFile;
}

export function validateAppDetail(detail: any): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!detail.appID || typeof detail.appID !== 'string') {
    errors.push({ field: 'appID', message: 'App ID is required and must be a string' });
  } else if (!/^[A-Z0-9]+\.[a-zA-Z0-9.-]+$/.test(detail.appID)) {
    errors.push({ field: 'appID', message: 'App ID must be in format TEAMID.BUNDLEID' });
  }
  
  if (detail.paths && !Array.isArray(detail.paths)) {
    errors.push({ field: 'paths', message: 'Paths must be an array' });
  }
  
  if (detail.components && !Array.isArray(detail.components)) {
    errors.push({ field: 'components', message: 'Components must be an array' });
  }
  
  return errors;
}

export function createEmptyAASA(): AASAFile {
  return {
    applinks: {
      apps: [],
      details: []
    }
  };
}

export function createEmptyAppDetail(): any {
  return {
    appID: '',
    paths: ['*']
  };
}

export function createEmptyComponent(): any {
  return {
    '/': '/*',
    comment: ''
  };
} 