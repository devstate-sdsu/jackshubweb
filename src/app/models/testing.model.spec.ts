import { Component } from '@angular/core';
import { of } from 'rxjs';
import { JacksEvent } from './event.model';
import { Hours } from './hours.model';

// use this file to globally mock data, services, components, etc.
// add to stubs as more functionality/data is added to the app

// put mock data below

export const mockJacksEvent: JacksEvent = {
  name: 'test event',
  description: 'test description',
  summary: 'test summary',
  image: 'test.png',
  startTime: new Date(),
  endTime: new Date(),
  bigLocation: 'testLocation',
  tinyLocation: '',
  timeUpdated: null,
  updates: 'testing'
};

export const mockImageFile: File = {
  name: 'test.png',
  lastModified: 0,
  size: 0,
  type: 'image',
  slice: (s?, e?) => null
};

export const mockHours: Hours = {
  name: 'testHours',
  days: [{
    day: 'testDay',
    hours: [{
      start: '9:00AM',
      end: '4:00PM'
    }]
  }]
};

// put component stubs below

@Component({ selector: 'app-home', template: '' })
export class HomeStubComponent {}

// put service stubs below

export const EventServiceStub = {
  getEvents: () => of<JacksEvent[]>(),
  addEvent: async () => Promise.resolve()
};

export const AngularFirestoreJacksEventStub = {
  collection: <T>(path: string) => {
    return {
      valueChanges: () => of([mockJacksEvent]),
      add: () => Promise.resolve()
    };
  }
};

export const AngularFireStorageStub = {
  upload: () => Promise.resolve({
    ref: {
      getDownloadURL: () => Promise.resolve<any>('firebaseLink')
    }
  })
};
