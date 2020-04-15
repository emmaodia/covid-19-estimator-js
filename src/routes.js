import fs from 'fs';
import xml from 'xml';
import covid19ImpactEstimator from './estimator';

const object2arrayconvertr = (o) => (o ? Object.entries(o).map(([k, v]) => ({ [k]: (typeof v === 'object' ? object2arrayconvertr(v) : v) })) : o);

/**
 * Project-wide route-handler
 *
 * @param {import('express').Router} router The router object
 */
const routeHandler = (router) => {
  router.post('/on-covid-19/:format?', (req, res) => {
    const estimation = covid19ImpactEstimator(req.body);
    const isXml = (req.params.format && (req.params.format.toLowerCase() === 'xml'));

    res.type(isXml ? 'xml' : 'json').send(isXml ? xml({ estimations: object2arrayconvertr(estimation) }, { declaration: true }) : estimation);
  });

  router.get('/on-covid-19/logs', (req, res, next) => {
    fs.readFile('logs.txt', (err, data) => { // eslint-disable-line consistent-return
      if (err) return next(err);

      res.type('text').send(data.toString().trim());
    });
  });

  return router;
};

export default routeHandler;
