import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Fish {
  name: string;
  size: number;
}

interface Props {
  fishList: string[];
  onSizeChange: (updatedSizes: Fish[]) => void;
}

export default function FishSizeSlider({ fishList, onSizeChange }: Props) {
  const [fishSizes, setFishSizes] = useState<Fish[]>(
    fishList.map((name) => ({ name, size: 50 })) // 기본 크기 50 설정
  );

  const handleSizeChange = (name: string, newSize: number) => {
    const updatedSizes = fishSizes.map((fish) =>
      fish.name === name ? { ...fish, size: newSize } : fish
    );
    setFishSizes(updatedSizes);
    onSizeChange(updatedSizes); // 부모에 전달
  };

  return (
    <div>
      <h3>어종 크기 조정</h3>
      {fishSizes.map((fish) => (
        <div key={fish.name} style={{ marginBottom: "20px" }}>
          <label>{fish.name}: {fish.size}cm</label>
          <Slider
            min={10}
            max={200}
            step={1}
            value={fish.size}
            onChange={(value) => handleSizeChange(fish.name, value as number)}
          />
        </div>
      ))}
    </div>
  );
}