export interface CreateEventDto {
  title: string;
  description?: string;
  date: Date;
  location: string;
  price: number;
}
