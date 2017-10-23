import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {ICppQuestion, ICppScore, ICppCurrentQuestion, ICppQuestionsAnswered} from '../contracts';
import {BusyMonitorComponent} from '../busy-monitor/busy-monitor.component';
import {BackendService} from "../backend.service";

@Component({
  selector: 'regor-cpp-quiz',
  templateUrl: './cpp-quiz.component.html',
  styleUrls: ['./cpp-quiz.component.css']
})
export class CppQuizComponent implements AfterContentInit {
  questions: ICppQuestion[];
  scores: ICppScore;
  currentQuestion: ICppCurrentQuestion;
  questionsAnswered: ICppQuestionsAnswered;
  isFinished: boolean;
  @ViewChild('busyMonitor')
  busyMonitor: BusyMonitorComponent;

  constructor(private backendService: BackendService) {
  }

  public next(): void {
    const index = this.currentQuestion.index + 1;
    let isCorrectAnswer = false;

    if (this.currentQuestion.question.solution !== undefined && this.currentQuestion.question.solution !== '#') {
      if (this.currentQuestion.question.solution === this.currentQuestion.question.answerNumber &&
        this.currentQuestion.tryouts === 0) {
        this.questionsAnswered.correct += 1;
        isCorrectAnswer = true;
      } else if (this.currentQuestion.question.solution !== this.currentQuestion.question.answerNumber &&
        this.currentQuestion.tryouts === 0) {
        this.questionsAnswered.wrong += 1;
        this.currentQuestion.tryouts += 1;
        this.questionsAnswered.allTryouts += 1;
      } else if (this.currentQuestion.question.solution === this.currentQuestion.question.answerNumber &&
        this.currentQuestion.tryouts !== 0) {
        isCorrectAnswer = true;
      } else if (this.currentQuestion.question.solution !== this.currentQuestion.question.answerNumber) {
        this.currentQuestion.tryouts += 1;
        this.questionsAnswered.allTryouts += 1;
      }

      this.currentQuestion.showHint = !isCorrectAnswer;
    } else {
      this.questionsAnswered.unknown += 1;
    }

    if (isCorrectAnswer || this.currentQuestion.question.solution === undefined || this.currentQuestion.question.solution === '#') {
      if (index <= this.questions.length - 1) {
        this.currentQuestion.tryouts = 0;
        this.currentQuestion.index = index;
        this.currentQuestion.showHint = false;
        this.currentQuestion.question = this.questions[index];
      } else {
        this.isFinished = true;
        this.backendService.submitCppResults(this.questionsAnswered)
          .subscribeWithMonitor(this.busyMonitor, x => {
          });
      }
    }
  }

  ngAfterContentInit() {
    this.backendService.getCppQuiz()
      .subscribeWithMonitor(this.busyMonitor, cpp => {
        this.questions = cpp.questions;
        this.scores = cpp.averageData;
        this.currentQuestion = {index: 0, question: cpp.questions[0], tryouts: 0};
        this.questionsAnswered = {correct: 0, wrong: 0, unknown: 0, allTryouts: 0};
        this.isFinished = false;
      });
  }

}
