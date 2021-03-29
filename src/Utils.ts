export function isEmptyObject(object: any): boolean {
  const keys = Object.keys(object);

  for (const key of keys) {
    if (typeof object[key] !== 'object') {
      if (object[key]) {
        return false;
      }
    } else {
      const result: boolean = isEmptyObject(object[key]);
      if (!result) {
        return false;
      }
    }
  }
  return true;
}
