
import Image from 'next/image'

interface Props {
  onOpen?: () => void;
  type?: string;
  fishDetailOpen?: (fish: { species: string; size: number; nickname: string; description: string }) => void;
  fishes: { species: string; size: number; nickname: string; description: string; imageFile?: File; imageUrl?: string }[];
  onUpdateFish?: (updatedFish: { species: string; size: number; nickname: string; description: string; imageFile?: File; imageUrl?: string }) => void;
}

export default function FishList({ onOpen, type, fishDetailOpen, fishes, onUpdateFish }: Props) {


  // ✅ 물고기 이미지 매핑 객체
  const fishImageMap: Record<string, string> = {
    "배스": "/images/sample/fish_bass.png",
    "붕어": "/images/sample/fish_boong.png",
    "잉어": "/images/sample/fish_ing.png",
    "향어": "/images/sample/fish_hyang.png",
    "가물치": "/images/sample/fish_gamulchi.png",
    "블루길": "/images/sample/fish_blue.png",
    "메기": "/images/sample/fish_megi.png",
    "숭어": "/images/sample/fish_soong.png",
  };

  const getFishImage = (species: string) => fishImageMap[species] || "/images/sample/default_fish.png";

  return (
    <div className="fish_list_wrap">
      <h2>잡은 물고기</h2>
      <ul>
        {fishes.map((fish, index)=>(
          <li key={index}>
            <button type="button" className="fish" onClick={()=>fishDetailOpen?.(fish)}>
              <div className="thumb_wrap">
                <span className="cate">{fish.species}</span>
                <div className="thumb_min">
                  <Image
                    src={getFishImage(fishes[index].species)}
                    alt="fish"
                    width={0}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 70vw"
                    style={{
                      objectFit: "contain",
                      height: "auto",
                      width: `${(fishes[index].size / 70) * 100}%`,
                      transition: "width 0.2s ease",
                    }}
                    priority
                  />
                </div>
              </div>
              <div className="text">
                <span>{fish.size}cm</span>
                <p>{fish.nickname}</p>
              </div>
            </button>
          </li>
        ))}
        {type !== "read" &&
          <li>
            <button type="button" className="add" onClick={onOpen}>추가</button>
          </li>
        }
      </ul>
    </div>
  );
}
