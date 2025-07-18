const pool = require('../../../../database/mysql/pool');
const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/Recomendations/HOLRecommendationsRepository');
const HOLRecommendationsRepositoryMySQL = require('../../../../repository/program_main/hol/Recomendations/HOLRecommendationsRepositoryMySQL');
const HOLRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/Recomendations/HOLRecommendationsStatusRepository');
const HOLRecommendationsStatusRepositoryMyQL = require('../../../../repository/program_main/hol/Recomendations/HOLRecommendationsStatusRepositoryMySQL');

// Usecase
const HOLCreateRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLCreateRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetRecommendationByUserIdUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLUpdateStatusRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetAllRecommendationByStatusUseCase');
const HOLGetAllUsersRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetAllUsersRecommendationUseCase');
const HOLGetTotalUsersRecomendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetTotalUsersRecomendationUseCase');
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../../../../../Applications/use_case/Program_Main/hol/Recommendation/HOLGetTotalUsersRecomendationByStatusUseCase');

const recommendations = [
  // REPOSITORY
  {
    key: HOLRecommendationsRepository.name,
    Class: HOLRecommendationsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLRecommendationsStatusRepository.name,
    Class: HOLRecommendationsStatusRepositoryMyQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },

  //   USECASE
  {
    key: HOLCreateRecommendationUseCase.name,
    Class: HOLCreateRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllUsersRecommendationUseCase.name,
    Class: HOLGetAllUsersRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllRecommendationByStatusUseCase.name,
    Class: HOLGetAllRecommendationByStatusUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetRecommendationByIdUseCase.name,
    Class: HOLGetRecommendationByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetRecommendationByUserIdUseCase.name,
    Class: HOLGetRecommendationByUserIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateStatusRecommendationUseCase.name,
    Class: HOLUpdateStatusRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  // GET TOTAL ALUMNI
  {
    key: HOLGetTotalUsersRecomendationUseCase.name,
    Class: HOLGetTotalUsersRecomendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersRecomendationByStatusUseCase.name,
    Class: HOLGetTotalUsersRecomendationByStatusUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
];
module.exports = recommendations;
