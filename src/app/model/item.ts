export class Item {
      id: string;
      category: string;
      subcategory: string;
      price: string;
      title: string;
      description: string;
      condition: string;
      userId: string;
      seller: string;
      photo: string;
      location: string;
      longitude: number;
      latitude: number;
      locality: string;
      allow: boolean;
      adDate: number;
      package: string;
      phoneNumber: string;
      payment: string;
      images: Photos[];
      shopid: string;
      review: Review[];
}

export class Photos {}

export class Review {}