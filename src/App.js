import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
    const splited = this.splitInput(input);
    const numbers = this.changeNumber(splited);
    Console.print(numbers)
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
      return parseInt(str);
    });
  }
}

export default App;
