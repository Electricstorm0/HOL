const CLPMasterClassificationsFinalSSRepository = require('../../../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalSSRepository');

class CLPMasterClassificationsFinalSSRepositoryMySQL extends CLPMasterClassificationsFinalSSRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ classification }) {
    const query = {
      text: 'INSERT INTO `master_clp_classifications_final_ss` (classification) VALUES (?)',
      values: [classification],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `master_clp_classifications_final_ss`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `master_clp_classifications_final_ss` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `master_clp_classifications_final_ss` SET ? WHERE id = ?',
      values: [id, payload],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `master_clp_classifications_final_ss` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPMasterClassificationsFinalSSRepositoryMySQL;
