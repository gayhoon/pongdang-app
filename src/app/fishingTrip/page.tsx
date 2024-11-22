// import style from './page.module.scss';
import SvgLogo from '@/images/logo.svg';
import SvgMenuNameCommunity from '@/images/menuname_community.svg';

// 커뮤니티내 메뉴 아이콘
import SvgIcMenuCmtAll from '@/images/icons/ic_menu_cmt_all.svg'
import SvgIcMenuCmtFishingtrip from '@/images/icons/ic_menu_cmt_fishingtrip.svg'
import SvgIcMenuCmtKnowhow from '@/images/icons/ic_menu_cmt_knowhow.svg'
import SvgIcMenuCmtTrans from '@/images/icons/ic_menu_cmt_trans.svg'
import SvgIcMenuCmtDaily from '@/images/icons/ic_menu_cmt_daily.svg'

export default function FishingTrip() {
  return (
    <div className='sub_menu_wrap'>
      <header>
        <div className="title">
          <SvgLogo className="logo" />
          <hr />
          <SvgMenuNameCommunity className="menu_name" />
        </div>
      </header>
      <div className="depth_menu_wrap">
        <ul>
          <li><SvgIcMenuCmtAll className="fishing_trip" /><p>전체</p></li>
          <li><SvgIcMenuCmtFishingtrip className="fishing_trip" /><p>조행기</p></li>
          <li><SvgIcMenuCmtKnowhow className="fishing_trip" /><p>노하우</p></li>
          <li><SvgIcMenuCmtTrans className="fishing_trip" /><p>거래</p></li>
          <li><SvgIcMenuCmtDaily className="fishing_trip" /><p>일상</p></li>
        </ul>
      </div>
    </div>
  );
};