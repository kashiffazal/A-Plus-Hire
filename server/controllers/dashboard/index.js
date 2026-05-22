const sequelize = require('sequelize');
const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SortArrayDateWise } = require('../../services');


module.exports = {
  GetUsersChartDataAndCount: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      attributes: [
        'type',
        [sequelize.literal('COUNT(*)'), 'total'],
        [sequelize.literal('COUNT(CASE WHEN status = "Active" THEN 1 END)'), 'active'],
        [sequelize.literal('COUNT(CASE WHEN status = "In Active" THEN 1 END)'), 'inActive'],
        [sequelize.literal('COUNT(CASE WHEN status = "Not Verified" THEN 1 END)'), 'notVerified'],
      ],
      group: ['type']
    });

    if (response.status) {
      //@ Setting count column as object===//
      let dt = {};
      response.data.forEach(e => { dt[e.type] = e; });
      response.data = dt;
      //@==================================//

      //@ Getting data for user registration chart =======//
      response.data.chartUserRegistration = await DBServices.GetDataList(db.users, {
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%b %Y'), 'month'],
          [sequelize.fn('UPPER', sequelize.col('type')), 'type'], // Convert 'type' to uppercase
          [sequelize.literal('COUNT(*)'), 'value'],
        ],
        where: { type: { [sequelize.Op.not]: 'ua' } },
        group: ['month', 'type'],
      });
      if (response.data.chartUserRegistration.status) {
        let dt = response.data.chartUserRegistration.data;
        // dt.forEach(e => { e.type = dayjs().month(e.dataValues.month - 1).format('MMMM'); });
        response.data.chartUserRegistration = SortArrayDateWise(dt, 'month');
      }//End if condition
      //@=================================================//

      //@ Getting data for connect used chart ============//
      response.data.chartUsesOfConnects = await DBServices.GetDataList(db.users_connects, {
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%b %Y'), 'Date'],
          [sequelize.literal('SUM(connects_out)'), 'scales'],
        ],
        where: { connects_out: { [sequelize.Op.not]: null } },
        group: ['Date'],
      });
      if (response.data.chartUsesOfConnects.status) {
        response.data.chartUsesOfConnects = SortArrayDateWise(response.data.chartUsesOfConnects.data, 'Date');
      }//End if condition
      //@==================================================//
    }//End fi condition
    res.status(200).json(response);
  }//End function
}//End Export