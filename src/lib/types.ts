// AASA 文件类型定义
export interface AASAFile {
  applinks: {
    apps: string[];
    details: AppDetail[];
  };
  webcredentials?: {
    apps: string[];
  };
  activitycontinuation?: {
    apps: string[];
  };
}

export interface AppDetail {
  appID: string;
  paths?: string[];
  components?: Component[];
  exclude?: boolean;
}

export interface Component {
  "/": string;
  comment?: string;
  exclude?: boolean;
  caseSensitive?: boolean;
  percentEncoded?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
} 