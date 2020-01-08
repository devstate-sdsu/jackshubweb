import { configureTestSuite } from 'ng-bullet';
import { TestBed, async } from '@angular/core/testing';
import { ServicesService } from './services.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFireStorageStub,
  AngularFirestoreServiceStub,
  mockService,
  mockServiceWithDocId,
  mockImageFile
} from '../models/testing.model.spec';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Service } from '../models/services.model';
import { environment } from 'src/environments/environment';

describe('ServicesServcie', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicesService,
        {
          provide: AngularFireStorage,
          useValue: AngularFireStorageStub
        },
        {
          provide: AngularFirestore,
          useValue: AngularFirestoreServiceStub
        }
      ]
    });
  });

  let service: ServicesService;
  let firestore: AngularFirestore;
  let firestorage: AngularFireStorage;

  let collectionSpy: jasmine.Spy;

  beforeEach(() => {
    service = TestBed.get(ServicesService);
    firestore = TestBed.get(AngularFirestore);
    firestorage = TestBed.get(AngularFireStorage);

    collectionSpy = spyOn(firestore, 'collection').and.callThrough();
  });

  it('should initialize', () => {
    expect(service).toBeTruthy();
  });

  describe('getServices', () => {
    let services$: Observable<Service[]>;

    beforeEach(() => {
      services$ = service.getServices();
    });

    it('should return Service array with generated doc id', async(() => {
      services$.subscribe(services => {
        expect(services).toEqual([mockServiceWithDocId]);
      });
    }));

    it('should get firebase services collection', () => {
      expect(collectionSpy).toHaveBeenCalledWith(environment.servicesCollection);
    });
  });

  describe('addService', () => {
    let uploadSpy: jasmine.Spy;
    let newService: Service;

    beforeEach(async(() => {
      // don't want to modify actual mock object!
      newService = Object.create(mockService);

      uploadSpy = spyOn(firestorage, 'upload').and.callThrough();
      service.addService(newService, mockImageFile);
    }));

    it('should upload', () => {
      expect(uploadSpy).toHaveBeenCalledWith(
        `${environment.servicesThumbnailsPath}/${mockImageFile.name}`, mockImageFile);
    });

    it('should set service image path to firebase link', () => {
      expect(newService.image).toBe('firebaseLink');
    });

    it('should get firebase services collection', () => {
      expect(collectionSpy).toHaveBeenCalledWith(environment.servicesCollection);
    });
  });
});
