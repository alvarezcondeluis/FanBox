import { GeoNamesService } from '../services/geonamesService.js';

export class GeoNamesController {
  constructor() {
    this.geoNamesService = new GeoNamesService('luis_killer39');
    this.getCountries = this.getCountries.bind(this);
    this.getProvinces = this.getProvinces.bind(this);
    this.getCities = this.getCities.bind(this);
  }

  async getCountries(req, res, next) {
    try {
      const countries = await this.geoNamesService.getCountries();
      res.status(200).json(countries);
    } catch (error) {
      next(error);
    }
  }

  async getProvinces(req, res, next) {
    try {
      const { countryCode } = req.params;
      
      const provinces = await this.geoNamesService.getProvinces(countryCode);
      
      res.status(200).json(provinces);
    } catch (error) {
      next(error);
    }
  }

  async getCities(req, res, next) {
    try {
      const { countryCode, provinceCode } = req.params;
      const cities = await this.geoNamesService.getCities(countryCode, provinceCode);
      res.status(200).json(cities);
    } catch (error) {
      next(error);
    }
  }
}
