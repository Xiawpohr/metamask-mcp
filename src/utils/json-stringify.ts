function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
}

export function JSONStringify(object: object) {
  return JSON.stringify(object, getCircularReplacer());
}
