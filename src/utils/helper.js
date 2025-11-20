/**
 * 判空helper，用于判断传入的值是否为空
 * @param {*} value 待判断的值，可以是任意类型
 * @returns {boolean} 如果值为空，则返回 true；否则返回 false
 */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};
