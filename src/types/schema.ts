// 게시글내 물고기 타입 정의
type FishingTripFish = 
    {
      species: string,
      size: number,
      nickname: string,
      description: string,
      imageFile?: File,
      imageUrl?: string
    }

// 게시글 타입 정의
type FishingTrip = 
  { 
    id: number, 
    cate: string, 
    title: string, 
    location: string,
    detail: string,
    date: string, 
    viewCount: number,
    images: string[],
    fishes: FishingTripFish[]
  };