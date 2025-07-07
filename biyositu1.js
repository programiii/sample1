document.addEventListener('DOMContentLoaded', () => {

    // 1. ハンバーガーメニュー機能
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.querySelector('.header__nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        });

        // メニュー項目クリックでメニューを閉じる（モバイル時）
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) { // 768px未満の時だけ閉じる
                    hamburger.classList.remove('is-active');
                    nav.classList.remove('is-active');
                }
            });
        });
    }

    // 2. スムーススクロール機能
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = (href === '#' || href === '') ? document.documentElement : document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 70; // ヘッダーの高さ
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. スクロール時のフェードインアニメーション
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px' // 画面下10%に入ったら発火
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // スムーススクロール（CSSでscroll-behavior: smooth; を設定済みのためJSは不要）

    // PC表示時にモバイル用メニューが開いていたら閉じる
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            hamburger.classList.remove('is-active');
            nav.classList.remove('is-active');
        }
    });

    // 4. サービスアイテムのスパークルエフェクト
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.style.position = 'relative'; // 粒子を配置するための基準
        item.style.overflow = 'hidden'; // 粒子がアイテム外に出ないように

        item.addEventListener('mousemove', (e) => {
            // マウスの位置を基準に粒子を生成
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const particle = document.createElement('div');
            particle.classList.add('sparkle-particle');
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            item.appendChild(particle);

            // アニメーション終了後に要素を削除
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        });
    });
});
