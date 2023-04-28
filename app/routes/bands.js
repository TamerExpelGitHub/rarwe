import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BandsRoute extends Route {
  @service catalog; // name match service file, injected to gain access to catalog store

  model() {
    return this.catalog.fetchAll('bands');
  }
}
