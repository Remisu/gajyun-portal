declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

declare interface NodeRequire {
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => {
    keys: () => string[];
    (id: string): any;
  };
}