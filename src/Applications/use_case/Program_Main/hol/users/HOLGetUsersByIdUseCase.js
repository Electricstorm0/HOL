const NotFoundError = require('../../../../../Commons/exceptions/NotFoundError');
const GetUsers = require('../../../../../Domains/program_main/hol/Users/entities/HolGetUsers');

class HOLGetUsersByIdUseCase {
  constructor({ HOLUsersRepository }) {
    this._HOLUsersRepository = HOLUsersRepository;
  }

  async execute({ id }) {
    const users = await this._HOLUsersRepository.readById({ id }); // misal typeId: 1 untuk CFF
    if (!users || users.length === 0) {
      throw new NotFoundError(`Data tidak ditemukan`);
    }
    const result = new GetUsers({
      photoProfile: 'profileKu.JPG',
      ...users,
    });

    return result;
  }
}

module.exports = HOLGetUsersByIdUseCase;
