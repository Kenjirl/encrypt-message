const aCode = 'a'.charCodeAt(0);
const charToNumber = (char) => char.toLowerCase().charCodeAt(0) - aCode + 1;
const numberToChar = (num) => String.fromCharCode(((num - 1) % 26) + aCode);
const isLetter = (char) => /[a-zA-Z]/.test(char);
const encrypt = (message, version = 'v1') => transform(message, 'encrypt', version);
const decrypt = (message, version = 'v1') => transform(message, 'decrypt', version);

const getShift = (word, wordIndex, charIndex, version = 'v1') => {
    const base = charToNumber(word);
    return version === 'v3'
        ? base + wordIndex + charIndex
        : version === 'v2'
            ? base + wordIndex
            : base;
};

const transform = (message, mode = 'encrypt', version = 'v1') =>
    message.split(' ').map((word, wordIndex) => {
        if (!word || !isLetter(word[0])) return word;

        const isEncrypt = mode === 'encrypt';
        const direction = isEncrypt ? 1 : -1;

        const chars = isEncrypt ? [...word] : [...word.slice(1)];

        const transformed = chars.map((char, charIndex) => {
            if (!isLetter(char)) return char;

            const shift = getShift(word, wordIndex, charIndex, version);
            const newChar = numberToChar(
                charToNumber(char) + direction * shift + 26);

            return char === char.toLowerCase() ? newChar : newChar.toUpperCase();
        }).join('');

        return isEncrypt ? word[0].toLowerCase() + transformed : transformed;
    }).join(' ');