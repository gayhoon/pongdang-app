import Image from 'next/image'

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
import SvgIcFooterHome from '@/images/icons/ic_footer_home.svg'
import Link from 'next/link';

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
          <li className='yet'><SvgIcMenuCmtAll className="home" /><p>전체</p></li>
          <li><SvgIcMenuCmtFishingtrip className="fishing_trip" /><p>조행기</p></li>
          <li className='yet'><SvgIcMenuCmtKnowhow className="fishing_trip" /><p>노하우</p></li>
          <li className='yet'><SvgIcMenuCmtTrans className="fishing_trip" /><p>거래</p></li>
          <li className='yet'><SvgIcMenuCmtDaily className="fishing_trip" /><p>일상</p></li>
        </ul>
      </div>
      <div className={styles.container}>
        <ul className={styles.fishing_trip_list_wrap}>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <div className={styles.inside_wrap}>
                <div className={styles.info_wrap}>
                  <div className={styles.top}>
                    <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                    <p>드디어 잡았습니다.</p>
                  </div>
                  <div className={styles.down}>
                    <p className={styles.name}>배스조사이올시다</p>
                    <p className={styles.time}>24.09.03</p>
                    <p className={styles.view}>13</p>
                    <p className={styles.like}>2</p>
                  </div>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src="/images/sample/thumb_sample.jpg"
                    alt="썸네일"
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
                <div className={styles.reply}>
                  <p className={styles.num}>32</p>
                  <p className={styles.static}>댓글</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <footer>
        <ul>
          <li>
            <Link href={''}>
              <SvgIcFooterHome/>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};