export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email: string;
  password: string;
  is_pensioner: number;
  is_child: number;
  role_id: number;
}

