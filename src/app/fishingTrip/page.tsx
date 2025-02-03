// import style from './page.module.scss';
import SvgLogo from '@/images/logo.svg';
import SvgMenuNameCommunity from '@/images/menuname_community.svg';

import styles from "./page.module.scss";

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
      <div className={styles.container}>
        <ul className={styles.fishing_trip_list_wrap}>
          <li>
            <a href="">
              <div className="inside_wrap">
                <div className="info_wrap">
                  <div className="top">
                    <div className="cate">일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className="down">
                    <p className="name">배스조사이올시다</p>
                    <p className="time">24.09.03</p>
                    <p className="view">13</p>
                    <p className="like">2</p>
                  </div>
                </div>
                <div className="thumb">
                  <img src="" alt="" />
                </div>
                <div className="reply">
                  <p>32</p>
                  <p className="num"></p>
                  <p>댓글</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};