import { Router } from 'express';
import { GeoNamesController } from '../controllers/geonamesController.js';

export const createGeoNamesRouter = () => {
  const geoNamesRouter = Router();
  const geoNamesController = new GeoNamesController();

  geoNamesRouter.get('/countries', geoNamesController.getCountries);
  geoNamesRouter.get('/countries/:countryCode/provinces', geoNamesController.getProvinces);
  geoNamesRouter.get('/countries/:countryCode/provinces/:provinceCode/cities', geoNamesController.getCities);

  return geoNamesRouter;
};
