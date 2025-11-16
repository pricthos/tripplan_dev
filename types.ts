

export enum Category {
  Place = '장소',
  Transport = '이동',
  Meal = '식사',
  Lodging = '숙소',
  Shopping = '쇼핑',
}

export interface ItineraryItem {
  id: string;
  time: string;
  category: Category;
  title: string;
  links?: { title: string; url: string }[];
  description?: string;
  images?: string[];
}

export interface ItineraryDay {
  date: string;
  items: ItineraryItem[];
}

export interface User {
    name: string;
    email: string;
    avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  members: User[];
  itinerary: ItineraryDay[];
  isPublic: boolean;
  coverImage: string;
  comments: Comment[];
}

export interface CommunityPost {
    id: string;
    title: string;
    author: User;
    trip: Trip;
    comments: Comment[];
    createdAt: string;
    content?: string;
}

export enum BoardCategory {
  General = '자유',
  Question = '질문',
  Review = '후기',
  Tip = '여행팁',
}

export interface BoardPost {
  id: string;
  category: BoardCategory;
  title: string;
  author: User;
  createdAt: string;
  views: number;
  likes: number;
  commentsCount: number;
  thumbnail?: string;
  content?: string;
  comments?: Comment[];
}


export interface Destination {
  continent: string;
  city: string;
  country: string;
  airportCode: string;
}

export interface UsefulInfoPost {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  date: string;
  comments?: Comment[];
}
