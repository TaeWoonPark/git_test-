// DOM読み込み完了後の処理
document.addEventListener('DOMContentLoaded', function () {
  // ナビゲーションのスクロール効果
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // スクロール時のナビゲーション背景変更
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
  });

  // モバイルメニューの開閉
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // ナビゲーションリンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さ分調整
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // モバイルメニューが開いている場合は閉じる
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // スクロールアニメーション
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  document.querySelectorAll('.feature, .product-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // フォーム送信処理
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // フォームデータの取得
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;

      // 簡単なバリデーション
      if (!name || !email || !message) {
        showNotification('すべての項目を入力してください。', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('正しいメールアドレスを入力してください。', 'error');
        return;
      }

      // 送信成功のシミュレーション
      showNotification('お問い合わせありがとうございます。後日担当者よりご連絡いたします。', 'success');
      this.reset();
    });
  }

  // 通知表示関数
  function showNotification(message, type) {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

    // スタイルを追加
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    document.body.appendChild(notification);

    // アニメーション表示
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動非表示
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  // メールアドレスバリデーション
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // パララックス効果（ヒーローセクション）
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // 商品カードのホバー効果強化
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 特徴カードのホバー効果強化
  document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.05)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });

    feature.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
  });

  // ボタンのホバー効果強化
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // スクロール進捗バー
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #8B4513, #D2691E);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ページ読み込み完了時のアニメーション
  window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // ヒーローセクションのテキストアニメーション
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const heroButtons = document.querySelector('.hero-buttons');

  if (heroTitle && heroDescription && heroButtons) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 500);

    setTimeout(() => {
      heroDescription.style.opacity = '1';
      heroDescription.style.transform = 'translateY(0)';
    }, 800);

    setTimeout(() => {
      heroButtons.style.opacity = '1';
      heroButtons.style.transform = 'translateY(0)';
    }, 1100);
  }

  // 初期スタイル設定
  if (heroTitle) heroTitle.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.8s ease;';
  if (heroDescription) heroDescription.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.8s ease;';
  if (heroButtons) heroButtons.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.8s ease;';
});

// ページの可視性変更時の処理
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = 'どぶろく - お待ちしております';
  } else {
    document.title = 'どぶろく - 伝統の味を現代に';
  }
});

// キーボードナビゲーション対応
document.addEventListener('keydown', function (e) {
  // ESCキーでモバイルメニューを閉じる
  if (e.key === 'Escape') {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // Enterキーでフォーカスされた要素をクリック
  if (e.key === 'Enter' && document.activeElement.tagName === 'A') {
    document.activeElement.click();
  }
});

