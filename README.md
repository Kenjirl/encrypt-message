# Encrypt Message – Flow & Versioning

## Idea

This project uses **character shifting** for both encryption and decryption.

The core rules are simple:

* Each **word** has its own shift value
* **Spaces and punctuation are preserved**
* **Uppercase and lowercase letters stay unchanged**
* There are **3 algorithm versions**, each adding more complexity

---

## How it Work

1. The user selects an algorithm version (`V1`, `V2`, or `V3`)
2. The user selects a mode (`Encrypt` or `Decrypt`)
3. The user enters a message
4. The message is processed by the `transform()` function
5. The result is displayed and can be copied

---

## Le Me Break It Down For You

### 1. Splitting the Message

```js
message.split(' ')
```

* The message is split by **words**
* Spaces remain in their original positions

---

### 2. Word Validation

```js
if (!word || !isLetter(word[0])) return word;
```

* Words that **do not start with a letter** (numbers or symbols) are skipped
* This prevents errors and keeps punctuation untouched

---

### 3. Mode Direction

```js
const direction = isEncrypt ? 1 : -1;
```

* Encrypt → shift forward
* Decrypt → shift backward

---

### 4. Character Selection

```js
const chars = isEncrypt ? [...word] : [...word.slice(1)];
```

* During **encryption**, all characters are processed
* During **decryption**, the first character is skipped because it acts as the shift marker

---

### 5. Shift Calculation

The shift value is calculated by `getShift()` and **depends on the selected version**.

---

## Versions

### Version 1 (V1) — Base Version

The shift depends **only on the first letter of the word**.

```js
shift = charToNumber(word)
```

Example:
`Halo` → shift is based on `H`

---

### Version 2 (V2) — Word Index Based

The shift includes the **word index**. The same word can produce different results. 

```js
shift = charToNumber(word) + wordIndex
```

Example:
`Halo world Halo`
→ the first `Halo` is different from the second one

---

### Version 3 (V3) — Word + Character Index Based

The shift includes both **word index** and **character index**. Each character has a different shift. 

```js
shift = charToNumber(word) + wordIndex + charIndex
```

Example:
The first character and the second character of the same word use different shifts

---

## Encryption vs Decryption

### Encryption

```js
newChar = charToNumber(char) + shift
```

### Decryption

```js
newChar = charToNumber(char) - shift
```

Adding `+26` before applying modulo prevents negative values.

---

## Letter Handling

* Only `A–Z` and `a–z` are processed
* Uppercase letters remain uppercase
* Lowercase letters remain lowercase

```js
return char === char.toLowerCase()
    ? newChar
    : newChar.toUpperCase();
```
