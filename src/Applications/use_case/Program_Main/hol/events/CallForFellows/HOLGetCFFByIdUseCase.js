const NotFoundError = require('../../../../../../Commons/exceptions/NotFoundError');
const GetCFF = require('../../../../../../Domains/program_main/hol/Events/EventsDetail/CallForFellows/entities/GetCFF');

class GetCFFByIdUseCase {
  constructor({ HOLEventsCFFRepository }) {
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute({ id }) {
    const events = await this._HOLEventsCFFRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!events || events.length === 0) {
      throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`);
    }
    const result = new GetCFF({ ...events });

    return result;
  }
}

module.exports = GetCFFByIdUseCase;
