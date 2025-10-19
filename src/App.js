import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
    const splitResult = this.splitInput(input);
    const numbers = this.changeNumber(splitResult);
    const sum = this.calculator(numbers);
    Console.print(`결과 : ${sum}`);
  }

  //구분자를 기준으로 분리하는 함수
  splitInput(input) {
    let delimiter = /,|:/;
    let customDelimiter;
    const customCheck = input.match(/^\/\/(.+?)\\n/);

    if(customCheck) {
      customDelimiter = customCheck[1];
      input = input.slice(customCheck[0].length);

      const regexCustomDelimiter = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      delimiter = new RegExp(`,|:|${regexCustomDelimiter}`, 'g');
    }

    return input.split(delimiter);
  }

  //숫자로 변환하는 함수
  changeNumber(splitInput) {
    return splitInput.map(str => {
      const trimmed = str.trim();
      const value = trimmed === "" ? 0 : parseInt(trimmed);

      //숫자가 아닌 값 에러
      if(isNaN(value)) {
        throw new Error(`[ERROR] 입력값이 잘못되었습니다.`)
      }

      //양수가 아닌 값 에러
      if(value < 0) {
        throw new Error(`[ERROR] 입력값이 잘못되었습니다.`)
      }

      return value;
    });
  }

  //합계 구하는 함수
  calculator(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }
}

export default App;