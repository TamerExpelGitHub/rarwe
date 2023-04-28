import Route from '@ember/routing/route';

export default class BandsNewRoute extends Route {
  // Hook used to update controller property (title & showAddSong) when moving between routes
  resetController(controller) {
    controller.name = '';
    controller.confirmedLeave = false;
  }
}
