const updateEvents = require('../../../../../../Domains/program_main/hol/Events/entities/UpdateEvents');
const updateCFF = require('../../../../../../Domains/program_main/hol/Events/EventsDetail/CallForFellows/entities/UpdateCFF');

class UpdateCFFUseCase {
  constructor({ HOLEventsRepository, HOLEventsCFFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._HOLEventsRepository.update({ id, payload: updateEvent });
    const updatedCFF = new updateCFF(payload);
    await this._HOLEventsCFFRepository.update({ id, payload: updatedCFF });
  }
}
module.exports = UpdateCFFUseCase;
