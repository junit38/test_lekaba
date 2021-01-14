import { TestLekabaPage } from './app.po';

describe('test-lekaba App', () => {
  let page: TestLekabaPage;

  beforeEach(() => {
    page = new TestLekabaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
