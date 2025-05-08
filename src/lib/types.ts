export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobListProps = {
  jobs: JobItem[];
  isLoading: boolean;
  classNames: string;
};

export type JobItemDetails = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

export type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemDetails;
};

export type JobsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export type ApiResponse = {
  public: boolean;
  jobItem: JobItemDetails;
};

export type SortBy = 'relevant' | 'recent';

export type PageDirection = 'previous' | 'next';

export type SortingButtonProps = {
  onClick: () => void;
  isActive: boolean;
  text: string;
};
