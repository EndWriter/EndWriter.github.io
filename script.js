//#========================================
//#effet de scroll sur la navbar qui retrecit quand on descend
//#========================================

//#on recup la navbar et on garde la position du dernier scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

//#a chaque scroll on check si on est en dessous de 50px
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    //#si on a scroll plus de 50px on ajoute la classe scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

//#========================================
//#menu hamburger pour mobile qui ouvre un panneau lateral
//#========================================

//#on recup les elements du menu mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

//#quand on clique sur le hamburger on toggle le menu et on anime les barres
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    //#animation des 3 barres du hamburger qui deviennent une croix
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

//#fermer le menu quand on clique sur un lien pour naviguer
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

//#fermer le menu si on clique ailleurs sur la page
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

//#========================================
//#systeme de tabs pour afficher les differentes experiences
//#========================================

//#on recup tous les boutons et tous les panels
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

//#pour chaque bouton on ecoute le clic
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        //#on enleve la classe active de tous les boutons et panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        //#on ajoute active au bouton clique et au panel correspondant
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

//#========================================
//#animation reveal au scroll pour faire apparaitre les sections
//#========================================

//#on recup toutes les sections a animer
const revealElements = document.querySelectorAll('.section');

//#fonction qui check si une section est visible
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    //#pour chaque section on verifie sa position
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        //#si elle est visible on ajoute les classes pour l'animer
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
};

//#on ecoute le scroll et on fait un check initial au chargement
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

//#========================================
//#scroll smooth quand on clique sur les liens du menu
//#========================================

//#pour chaque lien qui commence par # on ajoute le smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        //#si c'est juste # on fait rien
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        //#si la cible existe on scroll dessus en prenant en compte la hauteur de la nav
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

//#========================================
//#highlight du lien actif dans le menu selon la section visible
//#========================================

//#on recup toutes les sections et les liens du menu
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

//#fonction qui determine quelle section est actuellement visible
const highlightNavOnScroll = () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    //#on parcourt toutes les sections pour trouver celle qui est visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    //#on met a jour le lien actif dans le menu
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === `#${current}`) {
            item.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

//#========================================
//#curseur personnalise qui suit la souris en mode desktop
//#========================================

//#on cree un element div pour le curseur custom
const cursor = document.createElement('div');
cursor.className = 'cursor-dot';
document.body.appendChild(cursor);

//#style du curseur injecte directement en js
const style = document.createElement('style');
style.textContent = `
    .cursor-dot {
        width: 40px;
        height: 40px;
        border: 2px solid #64ffda;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        transform: translate(-50%, -50%);
        opacity: 0;
    }
    
    @media (max-width: 768px) {
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);

//#variables pour suivre la position de la souris et du curseur
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

//#mise a jour de la position de la souris
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '0.5';
});

//#cacher le curseur quand la souris sort de la page
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

//#animation smooth du curseur qui suit la souris avec un leger delay
function animateCursor() {
    const speed = 0.2;
    
    //#lerp pour un mouvement fluide
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

//#agrandir le curseur au hover des liens et boutons
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#64ffda';
        cursor.style.opacity = '0.8';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '0.5';
    });
});

//#========================================
//#optimisation des events scroll avec throttle pour pas cramer le cpu
//#========================================

//#fonction throttle qui limite le nombre d'executions d'une fonction
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

//#on applique le throttle aux fonctions de scroll pour ameliorer les perfs
const throttledReveal = throttle(revealOnScroll, 100);
const throttledHighlight = throttle(highlightNavOnScroll, 100);

//#on remplace les listeners par les versions throttlees
window.removeEventListener('scroll', revealOnScroll);
window.removeEventListener('scroll', highlightNavOnScroll);
window.addEventListener('scroll', throttledReveal);
window.addEventListener('scroll', throttledHighlight);

//#========================================
//#animation au chargement de la page fade in du body
//#========================================

//#au chargement complet on fait apparaitre le body en douceur
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

//#========================================
//#validation d'email au cas ou je veuille ajouter un formulaire plus tard
//#========================================

//#regex simple pour valider un email basique
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//#========================================
//#easter egg dans la console pour les curieux qui inspectent le code
//#========================================

console.log('%c👋 Bonjour!', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cJe vois que vous inspectez le code... Vous êtes curieux, c\'est bien! 🔍', 'color: #8892b0; font-size: 14px;');
console.log('%cSi vous souhaitez discuter de data, de code ou d\'opportunités, contactez-moi! 🚀', 'color: #64ffda; font-size: 14px;');
