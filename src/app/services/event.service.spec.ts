import { configureTestSuite } from 'ng-bullet';
import { TestBed, async } from '@angular/core/testing';
import { EventService } from './event.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreJacksEventStub, AngularFireStorageStub, mockJacksEvent, mockImageFile } from '../models/testing.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { JacksEvent } from '../models/event.model';
import { environment } from 'src/environments/environment';

fdescribe('EventService', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {
          provide: AngularFirestore,
          useValue: AngularFirestoreJacksEventStub
        },
        {
          provide: AngularFireStorage,
          useValue: AngularFireStorageStub
        }
      ]
    });
  });

  let service: EventService;
  let firestore: AngularFirestore;
  let fireStorage: AngularFireStorage;

  let collectionSpy: jasmine.Spy;

  beforeEach(() => {
    service = TestBed.get(EventService);
    firestore = TestBed.get(AngularFirestore);
    fireStorage = TestBed.get(AngularFireStorage);

    collectionSpy = spyOn(firestore, 'collection').and.callThrough();
  });

  it('should initialize', () => {
    expect(service).toBeTruthy();
  });

  describe('getEvents', () => {
    let events$: Observable<JacksEvent[]>;

    beforeEach(() => {
      events$ = service.getEvents();
    });

    it('should return JacksEvent array', async(() => {
      events$.subscribe(events => {
        expect(events).toEqual([mockJacksEvent]);
      });
    }));

    it('should get firebase events collection', () => {
      expect(collectionSpy).toHaveBeenCalledWith(environment.eventsCollection);
    });
  });

  describe('addEvent', () => {
    let uploadSpy: jasmine.Spy;

    beforeEach(async(() => {
      uploadSpy = spyOn(fireStorage, 'upload').and.callThrough();
      service.addEvent(mockJacksEvent, mockImageFile);
    }));

    it('should upload', () => {
      expect(uploadSpy).toHaveBeenCalledWith(
        `${environment.eventThumbnailsPath}/${mockImageFile.name}`, mockImageFile);
    });

    it('should set event image path to firebase link', () => {
      expect(mockJacksEvent.image).toBe('firebaseLink');
    });

    it('should get firebase events collection', () => {
      expect(collectionSpy).toHaveBeenCalledWith(environment.eventsCollection);
    });
  });
});
