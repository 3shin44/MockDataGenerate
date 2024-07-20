// CHATGPT寫的身分證字號產生器
export function generateTaiwanID() {
  // 字母到數字的映射
  const letterMap = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    P: 23,
    Q: 24,
    R: 25,
    S: 26,
    T: 27,
    U: 28,
    V: 29,
    W: 30,
    X: 31,
    Y: 32,
    Z: 33,
  };

  // 隨機選擇一個字母
  const letters = Object.keys(letterMap);
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const letterValue = letterMap[randomLetter];

  // 隨機生成前八位數字
  let randomNumbers = "";
  for (let i = 0; i < 8; i++) {
    randomNumbers += Math.floor(Math.random() * 10);
  }

  // 計算校驗碼
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2];
  const letterWeight = Math.floor(letterValue / 10) + (letterValue % 10) * 9;
  let sum = letterWeight;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(randomNumbers.charAt(i)) * weights[i + 1];
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  // 組合字母和數字
  const id = randomLetter + randomNumbers + checkDigit;

  return id;
}

// CHATGPT寫的隨機字串產生器
export function generateRandomString(length, enableSpecialChar = false) {
  let defaultLength = 5;
  length = Number(length);
  length = typeof length === "number" && length > 0 ? length : defaultLength;

  // 定義默認的字符集
  const defaultCharset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specialCharset = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let charset = defaultCharset;
  if (enableSpecialChar) {
    charset = defaultCharset + specialCharset;
  }

  // 生成隨機字串
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

// CHATGPT寫的隨機產生手機號碼
export function generateRandomPhoneNumber() {
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  const formattedDigits = randomDigits.toString().padStart(8, "0");
  return `09${formattedDigits}`;
}
