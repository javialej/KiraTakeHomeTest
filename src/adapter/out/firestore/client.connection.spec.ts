import {firestoreClient} from './client.connection';

describe('FirestoreClient', () => {
  it('should create a new Firestore client', () => {
    expect(firestoreClient).toBeDefined();
  });
});
