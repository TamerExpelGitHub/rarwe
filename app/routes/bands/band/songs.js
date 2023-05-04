import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SongsRoute extends Route {
  @service catalog; // name match service file, injected to gain access to catalog store

  queryParams = {
    sortBy: {
      as: 's',
    },
    searchTerm: {
      as: 'q',
    },
  };

  async model() {
    let band = this.modelFor('bands.band'); // collect data fetched from app/routes/bands/band.js file
    await this.catalog.fetchRelated(band, 'songs');
    return band;
  }

  // Hook used to update controller property (title & showAddSong) when moving between routes
  resetController(controller) {
    controller.title = '';
    controller.showAddSong = true;
  }
}
