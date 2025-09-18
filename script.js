// Bootstrap 个人主页 JavaScript 功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Bootstrap ScrollSpy
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-nav',
        offset: 100
    });

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.custom-nav-link');
    const sections = document.querySelectorAll('.section');
    
    // 导航栏背景动态变化
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.scrollY;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // 平滑滚动到指定部分
    function smoothScrollTo(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // 更新活动导航项
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150; // 增加偏移量
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // 更新导航链接状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // 处理导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            
            // 如果点击的是RESUME，打开PDF文件
            if (section === 'resume') {
                window.open('resume.pdf', '_blank');
                return;
            }
            
            // 移除所有active类
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // 为当前链接添加active类
            this.classList.add('active');
            
            // 平滑滚动到对应部分
            smoothScrollTo(section);
            
            // 在移动端关闭导航菜单
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // 节流函数，优化性能
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 滚动事件监听
    const throttledScroll = throttle(() => {
        updateNavbarBackground();
        updateActiveNav();
    }, 100);
    
    window.addEventListener('scroll', throttledScroll);
    
    // 页面加载时初始化
    updateNavbarBackground();
    updateActiveNav();
    
    // 内容动画观察器
    function setupContentAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 为卡片添加延迟动画
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // 观察所有section
        sections.forEach(section => {
            const content = section.querySelector('.container') || section;
            content.classList.add('section-content');
            observer.observe(content);
        });
        
        // 为卡片设置初始状态
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // 启用内容动画
    setupContentAnimation();
    
    // 为首页添加滚动指示器
    function addScrollIndicator() {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '<i class="bi bi-chevron-down fs-4"></i>';
            indicator.addEventListener('click', () => {
                smoothScrollTo('about');
            });
            homeSection.appendChild(indicator);
        }
    }
    
    // 添加滚动指示器
    addScrollIndicator();
    
    // 技能标签悬停效果
    function setupSkillBadges() {
        const skillBadges = document.querySelectorAll('#about .badge');
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // 启用技能标签效果
    setupSkillBadges();
    
    // 项目卡片交互效果
    function setupProjectCards() {
        const projectCards = document.querySelectorAll('#projects .card');
        projectCards.forEach(card => {
            const img = card.querySelector('.card-img-top');
            const badges = card.querySelectorAll('.badge');
            
            card.addEventListener('mouseenter', function() {
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.transform = 'translateY(-2px)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                if (img) {
                    img.style.transform = 'scale(1)';
                }
                badges.forEach(badge => {
                    badge.style.transform = 'translateY(0)';
                });
            });
        });
    }
    
    // 启用项目卡片效果
    setupProjectCards();
    
    // 博客文章动画
    function setupBlogPosts() {
        const blogPosts = document.querySelectorAll('#blog .card');
        blogPosts.forEach((post, index) => {
            post.style.animationDelay = `${index * 0.1}s`;
            post.classList.add('animate__animated', 'animate__fadeInUp');
        });
    }
    
    // 启用博客动画
    setTimeout(setupBlogPosts, 500);
    
    // 响应式处理
    function handleResponsive() {
        const isMobile = window.innerWidth <= 768;
        const cards = document.querySelectorAll('.card');
        
        if (isMobile) {
            // 移动端简化动画
            cards.forEach(card => {
                card.style.transition = 'transform 0.2s ease';
            });
        } else {
            // 桌面端完整动画
            cards.forEach(card => {
                card.style.transition = 'all 0.3s ease';
            });
        }
    }
    
    // 窗口大小变化监听
    window.addEventListener('resize', throttle(handleResponsive, 200));
    handleResponsive();
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const currentActive = document.querySelector('.custom-nav-link.active');
            if (currentActive) {
                const currentSection = currentActive.getAttribute('data-section');
                const sectionIds = ['home', 'about', 'research', 'projects', 'blog'];
                const currentIndex = sectionIds.indexOf(currentSection);
                if (currentIndex < sectionIds.length - 1) {
                    smoothScrollTo(sectionIds[currentIndex + 1]);
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentActive = document.querySelector('.custom-nav-link.active');
            if (currentActive) {
                const currentSection = currentActive.getAttribute('data-section');
                const sectionIds = ['home', 'about', 'research', 'projects', 'blog'];
                const currentIndex = sectionIds.indexOf(currentSection);
                if (currentIndex > 0) {
                    smoothScrollTo(sectionIds[currentIndex - 1]);
                }
            }
        }
    });
    
    // 页面可见性API - 当页面重新获得焦点时重新初始化
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateActiveNav();
            updateNavbarBackground();
        }
    });
    
    // 预加载图片
    function preloadImages() {
        const images = document.querySelectorAll('img[src*="placeholder"]');
        images.forEach(img => {
            const newImg = new Image();
            newImg.src = img.src;
        });
    }
    
    // 启用图片预加载
    preloadImages();
    
    console.log('Bootstrap 个人主页已加载完成');
});