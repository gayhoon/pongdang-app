
import Image from 'next/image'

interface Props {
  onOpen?: () => void;
  type?: string;
  fishDetailOpen?: ()=>void;
}

export default function FishList({ onOpen, type, fishDetailOpen }: Props) {

  return (
    <div className="fish_list_wrap">
      <h2>잡은 물고기</h2>
      <ul>
        <li>
          <button type="button" className="fish" onClick={fishDetailOpen}>
            <div className="thumb_wrap">
              <span className="cate">배스</span>
              <div className="thumb_min">
                <Image
                  src="/images/sample/fish_bass.png"
                  alt="fish"
                  width={100}
                  height={150}
                  style={{ objectFit: "contain", height: 'auto' }}
                  priority
                />
              </div>
            </div>
            <div className="text">
              <span>34cm</span>
              <p>배식이</p>
            </div>
          </button>
        </li>
        <li>
          <button type="button" className="fish" onClick={fishDetailOpen}>
            <div className="thumb_wrap">
              <span className="cate">배스</span>
              <div className="thumb_min">
                <Image
                  src="/images/sample/fish_bass.png"
                  alt="fish"
                  width={100}
                  height={150}
                  style={{ objectFit: "contain", height: 'auto' }}
                  priority
                />
              </div>
            </div>
            <div className="text">
              <span>34cm</span>
              <p>배식이</p>
            </div>
          </button>
        </li>
        <li>
          <button type="button" className="fish" onClick={fishDetailOpen}>
            <div className="thumb_wrap">
              <span className="cate">배스</span>
              <div className="thumb_min">
                <Image
                  src="/images/sample/fish_bass.png"
                  alt="fish"
                  width={100}
                  height={150}
                  style={{ objectFit: "contain", height: 'auto' }}
                  priority
                />
              </div>
            </div>
            <div className="text">
              <span>34cm</span>
              <p>배식이</p>
            </div>
          </button>
        </li>
        {type !== "read" &&
          <li>
            <button type="button" className="add" onClick={onOpen}>추가</button>
          </li>
        }
      </ul>
    </div>
  );
}
