import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import wait from '../utils/wait';

export default class BandsRoute extends Route {
  @service catalog; // name match service file, injected to gain access to catalog store

  async model() {
    // await wait(3000);
    return this.catalog.fetchAll('bands');
  }
}
