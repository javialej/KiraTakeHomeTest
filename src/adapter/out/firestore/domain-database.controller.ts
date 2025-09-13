import {CollectionReference, DocumentData} from '@google-cloud/firestore';
import {firestoreClient} from './client.connection';
import {IFeature} from '../../../../domain/src/model/feature';
import {Feature} from '../../../model/feature.model';

export class DomainDataBaseRepository {
  private readonly collection: CollectionReference<DocumentData>;

  constructor(private readonly utilsDomainDatabase: UtilsDomainDatabase) {
    this.collection = firestoreClient.collection(
      this.utilsDomainDatabase.getCollectionName(),
    );
  }

  async getFeatureByCountry(country: string): Promise<IFeature> {
    const feature = await this.collection.doc(country).get();
    return new Feature(feature.data());
  }
}
