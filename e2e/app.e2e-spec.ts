import { ExamGeneratorAngularPage } from './app.po';

describe('exam-generator-angular App', () => {
  let page: ExamGeneratorAngularPage;

  beforeEach(() => {
    page = new ExamGeneratorAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
