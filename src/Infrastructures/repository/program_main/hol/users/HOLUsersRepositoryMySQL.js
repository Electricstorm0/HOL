const HOLUsersRepository = require('../../../../../Domains/program_main/hol/Users/HOLUsersRepository');
const InvariantError = require('../../../../../Commons/exceptions/InvariantError');

class HOLUsersRepositoryMySQL extends HOLUsersRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountUsers() {
    const query = {
      text: 'SELECT COUNT(*) AS Total_alumni FROM `tx_hol_users`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readCountUsersByProgram() {
    const query = {
      text: 'SELECT  msp.name,COUNT(*) as total_alumni FROM tx_hol_users as hu JOIN tx_offered_program as op on op.id_users = hu.id_users JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program JOIN master_second_tier_program as msp on msp.id = mtp.id_second_tier_program GROUP BY msp.name ',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async create({
    usersId,
    musicalInstrument,
    talent,
    taletDescriptionSelected,
    bcfActivities,
    otherActivities,
    fiveYearAward,
    fiveYearPlan,
    fiveYearPlanDescription,
    ability,
    abilityDescriptionSelected,
    abilityAwardSelected,
    achievementsLastThreeYears,
    activitiesOutside,
    haveABussiness,
    joinedSocialCommunities,
  }) {
    const query = {
      text: 'INSERT INTO `tx_hol_users` (id_users, musical_instrument,talent,talent_description_selected,bcf_activites,other_activites,five_year_award,five_year_plan,five_year_plan_description,ability,ability_description_selected,ability_award_selected,achievement_last_three_years,activities_outside_college_and_internship,have_a_business,joined_social_communities) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      values: [
        usersId,
        musicalInstrument,
        talent,
        taletDescriptionSelected,
        bcfActivities,
        otherActivities,
        fiveYearAward,
        fiveYearPlan,
        fiveYearPlanDescription,
        ability,
        abilityDescriptionSelected,
        abilityAwardSelected,
        achievementsLastThreeYears,
        activitiesOutside,
        haveABussiness,
        joinedSocialCommunities,
      ],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }

  async readJourneyUsers() {
    const query = {
      text: 'SELECT id_users_hol, created_at, "achievements" as recent_journey FROM tx_hol_achievements UNION ALL SELECT id_users_hol, created_at, "involvements" as recent_journey FROM tx_hol_involvements ORDER BY created_at DESC',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async read({ skip, numPerPage }) {
    const query = {
      text: 'SELECT hu.id_users, concat(ud.first_name, " ",ud.last_name) as nama_alumni, stp.name as program, b.batch, mdp.name as domisili FROM tx_hol_users as hu JOIN tx_users_detail as ud on ud.id = hu.id_users JOIN tx_offered_program as op on op.id_users = hu.id_users JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program JOIN master_batch as b on b.id = op.id_batch JOIN tx_users_domicile as udom on udom.id_users = hu.id_users JOIN master_domicile_provincies as mdp on mdp.id = udom.id_provincies',
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_users` WHERE id_users=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users` SET ? WHERE id_users = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users` WHERE id_users = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersRepositoryMySQL;
