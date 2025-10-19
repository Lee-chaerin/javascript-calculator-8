import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
    const splited = this.splitInput(input);
    const numbers = this.changeNumber(splited);
    const sum = this.calculator(numbers);
    Console.print(sum);
  }

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

  changeNumber(input) {
    return input.map(str => {
      const trimmed = str.trim();
      const value = trimmed === "" ? 0 : parseInt(trimmed);

      if(isNaN(value)) {
        throw new Error(`[ERROR] 입력값이 잘못되었습니다.`)
      }

      if(value < 0) {
        throw new Error(`[ERROR] 입력값이 잘못되었습니다.`)
      }

      return value;
    });
  }

  calculator(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }
}

export default App;
