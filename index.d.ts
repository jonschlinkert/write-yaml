declare function writeYaml(filepath: string, data: any, callback: (err: any) => void): void;
declare function writeYaml(filepath: string, data: any, options: any, callback: (err: any) => void): void;
declare namespace writeYaml {
  function sync(filepath: string, data: any, options?: any): object;
}

export = writeYaml;
