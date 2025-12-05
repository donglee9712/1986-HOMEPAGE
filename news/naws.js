const NEWS_ITEMS = [
  {
    title: "재미에 가치를 더하는 우리 반려동물 축제",
    desc: "기획자가 이야기하는 반려문화와 댕댕이프로젝트",
    link: "https://1986.imweb.me/185?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/01ecf5caff4b7.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/f6f2db9e6e42f.jpg",
    date: "2023. 11. 12"
  },
  {
    title: "댕댕런…반려견 마라톤을 만든 男子",
    desc: "평범했던 생명공학도 대학생…",
    link: "https://1986.imweb.me/160",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/5fb969474de3e.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/baf608f731d6c.jpg",
    date: "2023. 11. 01"
  },
  {
    title: "빵 좋아하는 사람들의 마라톤 '빵빵런2023'",
    desc: "빵 좋아하는 사람들의 깨알재미 소확행...",
    link: "https://1986.imweb.me/161?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/a05c4ec9f167c.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/e3100e55c36aa.jpg",
    date: "2023. 02. 20"
  },
  {
    title: "롱블랙 인터뷰 : 윤명호 대표",
    desc: "빵 찾아 달리고, 강아지와 산 타고, 요즘 축제 기획법",
    link: "https://1986.imweb.me/223?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/c400f7158192b.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/52d82ca731f8e.jpg",
    date: "2024. 11. 14"
  },
  {
    title: "강형욱과 함께 트레킹 '댕댕트레킹 2023'",
    desc: "'개통령'과 함께 하는 숲속 트레킹...",
    link: "https://1986.imweb.me/162?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/fc7593bd9751f.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/250f0d2357f0f.jpg",
    date: "2023. 03. 15"
  },
  {
    title: "빵둥이들의 마라톤 '빵빵런2022' 개최",
    desc: "살찌는 것은 싫지만 빵은 먹고 싶은 빵둥이들의...",
    link: "https://1986.imweb.me/163?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/fa9f749260808.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/dbe1b84b95c81.jpg",
    date: "2022. 02. 25"
  },
  {
    title: "삶은 재미다, 1986프로덕션",
    desc: "1986프로덕션의 프로젝트에 대해..",
    link: "https://1986.imweb.me/186?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/9ea0347558cbd.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/3eb59d4c484dc.jpg",
    date: "2023. 09. 20"
  },
  {
    title: "빵빵런의 맛있는 나눔, 진행중!",
    desc: "사단법인 프렌즈 소식지에 실린 빵빵런 기부 캠페인",
    link: "https://1986.imweb.me/214",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/fc561b56820b9.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/7ce000f8988cb.jpg",
    date: "2024. 07. 31"
  },
  {
    title: "댕댕런 2021, 댕댕이와 달리고 사료 5톤 기부",
    desc: "버추얼레이스로 진행되어 기부캠페인 함께 진행...",
    link: "https://1986.imweb.me/184?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/ca5af0f752bd9.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/b082860281e0c.jpg",
    date: "2021. 05. 17"
  },
  {
    title: "'빵빵런2024', 이색 복장으로 마라톤 뛰어",
    desc: "올해로 4회를 맞이하는 '빵빵런'이 14일...",
    link: "https://1986.imweb.me/198?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/4b1b17d215a4c.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/9da29b0e3d8b0.jpg",
    date: "2024. 04. 14"
  },
  {
    title: "빵빵런 in 대전, 빵의 도시 대전에서 첫 개최",
    desc: "2024년 9월 8일(일) 대전 엑스포시민광장에서 진행",
    link: "https://1986.imweb.me/213?preview_mode=1",
    bg: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/06c7331a4e994.png",
    icon: "https://cdn.imweb.me/upload/S20200402f6a4097001dd3/dbe1b84b95c81.jpg",
    date: "2024. 06. 27"
  }
];

const buildSlide = (item) => {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide news-item';
  slide.style.setProperty('--slide-bg', `url('${item.bg}')`);
  slide.innerHTML = `
    <a href="${item.link}">
      <div class="item-content">
        <h4>${item.title}</h4>
        <hr class="item-divider" />
        <p>${item.desc}</p>
      </div>
      <div class="item-footer">
        <div class="link-button" style="background-image: url('${item.icon}');"></div>
        <span class="date">${item.date}</span>
      </div>
    </a>`;
  return slide;
};

const initNewsSwiper = (section) => {
  const swiperEl = section.querySelector('.swiper');
  const wrapperEl = section.querySelector('.swiper-wrapper');
  if (!swiperEl || !wrapperEl) return;

  const slides = [...NEWS_ITEMS]
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '-'));
      const dateB = new Date(b.date.replace(/\./g, '-'));
      return dateB - dateA;
    })
    .map(buildSlide);

  slides.forEach((slide) => wrapperEl.appendChild(slide));

  new Swiper(swiperEl, {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: section.querySelector('.nav-button--next'),
      prevEl: section.querySelector('.nav-button--prev'),
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      1024: { slidesPerView: 2 },
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#news-section-wrapper').forEach(initNewsSwiper);
});
