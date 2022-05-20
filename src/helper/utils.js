export function randChar() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * 20)];
}

export function randNum() {
  return Math.floor(Math.random() * 20);
}

export function getRandnum(answer) {
  const numbersArray = [];

  Array.from(answer).forEach(() => {
    let random = randNum();
    while (numbersArray.includes(random)) {
      random = randNum();
    }
    numbersArray.push(random);
  });

  return numbersArray;
}

export function getRandomChar(answerKey, answer) {
  const lettersArray = Array.from(new Array(20)).map((e, index) => {
    if (answerKey.includes(index)) {
      return answer.charAt(answerKey.indexOf(index));
    }
    return randChar();
  });

  return lettersArray;
}

export function fillAnswer(answer) {
  const answerbox = [];

  for (var i = 0; i < answer.length; i++) {
    answerbox.push({ text: "", origIndex: null });
  }
  return answerbox;
}

export function fillIndex(answer) {
  const answerbox = [];

  for (var i = 0; i < answer.length; i++) {
    answerbox.push(i);
  }
  return answerbox;
}

export function getRandomHint(answerIndex) {
  return Math.floor(Math.random() * answerIndex.length);
}
