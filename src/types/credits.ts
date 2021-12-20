export interface MovieMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Actor extends MovieMember {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends MovieMember {
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCredits {
  id: number;
  cast: Array<Actor>;
  crew: Array<CrewMember>;
}
