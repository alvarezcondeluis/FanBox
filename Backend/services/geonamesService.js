import axios from 'axios';
import { ServiceError } from '../utils/serviceError.js';

export class GeoNamesService {
  constructor(username) {
    this.baseUrl = 'http://api.geonames.org/';
    this.username = username; // Tu username de GeoNames
  }

  async getCountries() {
    try {
      const response = await axios.get(`${this.baseUrl}countryInfoJSON`, {
        params: {
          username: this.username,
        },
      });
      return response.data.geonames.map((country) => ({
        name: country.countryName,
        code: country.countryCode,
      }));
    } catch (error) {
      throw new ServiceError('Error fetching countries: ' + error.message, 'GEO_API_ERROR');
    }
  }

  async getProvinces(countryCode) {
    try {
      const response = await axios.get(`${this.baseUrl}searchJSON`, {
        params: {
          country: countryCode,
          featureCode: 'ADM1',
          username: this.username,
        },
      });
      return response.data.geonames.map((province) => ({
        name: province.name,
        code: province.adminCode1,
      }));
    } catch (error) {
      throw new ServiceError('Error fetching provinces: ' + error.message, 'GEO_API_ERROR');
    }
  }

  async getCities(countryCode, provinceCode) {
    try {
      const response = await axios.get(`${this.baseUrl}searchJSON`, {
        params: {
          country: countryCode,
          adminCode1: provinceCode,
          featureClass: 'P',
          maxRows: 100,
          username: this.username,
        },
      });
      return response.data.geonames.map((city) => ({
        name: city.name,
        code: city.geonameId, // O el identificador adecuado para la ciudad
      }));
    } catch (error) {
      throw new ServiceError('Error fetching cities: ' + error.message, 'GEO_API_ERROR');
    }
  }
}
