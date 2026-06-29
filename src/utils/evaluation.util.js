// utils/evaluation.util.js

/**
 * 根據 Item 模型的設定，判定使用者輸入的值是否合格
 * @param {Object} item - 從資料庫撈出來的 Item 模型實例
 * @param {String|Number|Boolean} inputValue - 使用者在 App 實際輸入的值
 * @returns {String} 'PASS' | 'FAIL'
 */
const evaluateRecordStatus = (item, inputValue) => {
  if (inputValue === null || inputValue === undefined || inputValue === '') {
    return 'FAIL';
  }

  switch (item.dataType) {
    case 'numeric':
    case 'numerical':

      if (item.numerical !== null && item.operator) {
        const val = parseFloat(inputValue);
        const target = parseFloat(item.numerical);

        if (isNaN(val) || isNaN(target)) return 'FAIL';

        switch (item.operator) {
          case '>': return val > target ? 'PASS' : 'FAIL';
          case '>=': return val >= target ? 'PASS' : 'FAIL';
          case '<': return val < target ? 'PASS' : 'FAIL';
          case '<=': return val <= target ? 'PASS' : 'FAIL';
          case '==':
          case '=': return val === target ? 'PASS' : 'FAIL';
          case '!=': return val !== target ? 'PASS' : 'FAIL';
          default: return 'FAIL'; // 未知的運算子，預設給過
        }
      }
      return 'PASS';

    case 'single':
      const boolValue = String(inputValue).toLowerCase();
      return (boolValue === 'true') ? 'PASS' : 'FAIL';

    case 'text':
      // 文字通常是備註性質，有填寫就算 PASS
      return 'PASS';

    case 'multiple':
      // 多選/單選題判定（可依據 options 的設定，例如選項 value 為 'NORMAL' 才是 PASS）
      // 這裡先簡單實作，有選就過，或你可以自訂邏輯
      return 'PASS';

    default:
      return 'PASS';
  }
};

module.exports = { evaluateRecordStatus };