

interface Address {
    addressID: number;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    number: number;
    instructions?: string;
    userID: string;
   
  }

  export interface AddressForm {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    number: string;
    instructions?: string;
  }
  export interface Country {
    name: string;
    code: string;
  }
  
  export interface Province {
    name: string;
    code: string;
  }
  
  export interface City {
    name: string;
    code: string;
  }

  export default Address;