import * as H from "history";

export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type PostsType = {
  id: number;
  message: string;
  likesCount: number;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: PhotosType;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type RouteComponentProps<P> = {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export type match<P> = {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
