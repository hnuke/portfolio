/*
   Arquivo JavaScript principal para o site de portfólio pessoal
   Funcionalidades: menu responsivo, formulário de contato, animações
*/

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // === MENU RESPONSIVO ===
    initMobileMenu();
    
    // === FORMULÁRIO DE CONTATO ===
    initContactForm();
    
    // === ANIMAÇÕES DE SCROLL ===
    initScrollAnimations();
    
    // === BARRAS DE PROGRESSO ===
    initProgressBars();
    
    // === NAVEGAÇÃO SUAVE ===
    initSmoothScroll();
});

/**
 * Inicializa o menu responsivo para dispositivos móveis
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle do menu ao clicar no hambúrguer
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link (em dispositivos móveis)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa o formulário de contato com validação e feedback
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio real do formulário
            
            // Validação dos campos obrigatórios
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Limpa mensagens anteriores
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            // Validação básica
            if (!nome || !email || !mensagem) {
                showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validação de email
            if (!isValidEmail(email)) {
                showFormMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simula o envio do formulário (apenas visual, conforme especificação)
            showFormMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Limpa o formulário após "envio"
            contactForm.reset();
        });
    }
}

/**
 * Exibe mensagem de feedback do formulário
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Inicializa animações baseadas no scroll
 */
function initScrollAnimations() {
    // Observador de interseção para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplica animação a elementos específicos
    const animatedElements = document.querySelectorAll('.hobby-card, .project-card, .work-card, .cert-card, .language-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Inicializa animação das barras de progresso
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .level-progress');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset e animação
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                // Remove o observador após a primeira animação
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/**
 * Inicializa navegação suave entre seções
 */
function initSmoothScroll() {
    // Adiciona comportamento suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Adiciona efeitos de hover aprimorados
 */
function initHoverEffects() {
    // Efeito de paralaxe sutil no hero
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Efeito de tilt nos cards (opcional)
    const cards = document.querySelectorAll('.project-card, .hobby-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Funcionalidade de tema escuro (opcional - pode ser implementada futuramente)
 */
function initThemeToggle() {
    // Placeholder para funcionalidade de tema escuro
    // Pode ser implementada em versões futuras do site
    console.log('Theme toggle functionality ready for implementation');
}

/**
 * Inicializa contador de visitantes (simulado)
 */
function initVisitorCounter() {
    // Simula um contador de visitantes usando localStorage
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    // Pode ser usado para exibir estatísticas no futuro
    console.log(`Visitor count: ${visitorCount}`);
}

/**
 * Funcionalidade de loading screen (opcional)
 */
function initLoadingScreen() {
    // Remove loading screen quando a página estiver totalmente carregada
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });
}

/**
 * Utilitários gerais
 */
const Utils = {
    // Debounce function para otimizar eventos de scroll/resize
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Função para detectar dispositivo móvel
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Função para scroll suave até elemento
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// Inicializa funcionalidades adicionais quando necessário
document.addEventListener('DOMContentLoaded', function() {
    initHoverEffects();
    initVisitorCounter();
    initLoadingScreen();
});

// Otimiza eventos de scroll e resize
window.addEventListener('scroll', Utils.debounce(function() {
    // Funcionalidades otimizadas de scroll podem ser adicionadas aqui
}, 100));

window.addEventListener('resize', Utils.debounce(function() {
    // Funcionalidades de redimensionamento podem ser adicionadas aqui
}, 250));

