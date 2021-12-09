export interface MotionPictureMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Actor extends MotionPictureMember {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends MotionPictureMember {
  credit_id: string;
  department: string;
  job: string;
}

export interface MotionPictureCredits {
  id: number;
  cast: Array<Actor>;
  crew: Array<CrewMember>;
}
