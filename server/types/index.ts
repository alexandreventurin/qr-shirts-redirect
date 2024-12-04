export interface UrlMapping {
  [urlCode: string]: string;
}

export interface DatabaseData {
  urlMappings: UrlMapping;
}

export interface DatabaseInstance {
  data: DatabaseData | null;
  read: () => Promise<void>;
  write: () => Promise<void>;
}