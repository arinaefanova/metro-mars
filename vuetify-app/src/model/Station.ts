export interface Station {
  id: number;
  name: string;
  metro_line: string;
  is_working: number;
  next_station: number;
  previous_station: number;
}
