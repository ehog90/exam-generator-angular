import { Injectable } from '@angular/core';
import {PersistenceService} from './persistence.service';
import {find,remove} from 'lodash';
import {iKnowThisKey, iKnowThisNamespace} from "./preference-keys-namespaces";

@Injectable()
export class IKnowService {
  public knownQuestions: number[] = [];
  constructor(private persistenceService: PersistenceService) {
    this.knownQuestions = <number[]>this.persistenceService.getArray(iKnowThisNamespace, iKnowThisKey);
  }

  public isQuestionKnown(qId: number): boolean {
    return !!find(this.knownQuestions, x => x === qId);
  }

  public setQuestionKnown(qId: number) {
    this.knownQuestions.push(qId);
    this.persistenceService.addToArray(iKnowThisNamespace, iKnowThisKey, qId);
  }

  public setQuestionUnknown(qId: number) {
    this.knownQuestions = this.knownQuestions.filter(x => x !== qId);
    this.persistenceService.removeFromArray(iKnowThisNamespace, iKnowThisKey, qId);
  }

}
