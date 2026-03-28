// Данные университетов Казахстана
const universities = [
    // АЛМАТЫ
    {
        id: 1,
        name: "Казахский национальный университет им. аль-Фараби",
        city: "Алматы",
        cityCode: "almaty",
        scorePassed: 125,
        scoreRequired: 120,
        ranking: "1-й в стране",
        specialties: ["Инженерия", "Компьютерные науки", "Экономика", "Право"]
    },
    {
        id: 2,
        name: "Казахский агротехнический университет им. Сейфуллина",
        city: "Алматы",
        cityCode: "almaty",
        scorePassed: 110,
        scoreRequired: 100,
        ranking: "5-й в стране",
        specialties: ["Сельское хозяйство", "Экология", "Инженерия", "Биология"]
    },
    {
        id: 3,
        name: "Академия 'Болашак'",
        city: "Алматы",
        cityCode: "almaty",
        scorePassed: 115,
        scoreRequired: 105,
        ranking: "10-й в стране",
        specialties: ["Бизнес", "Управление", "Маркетинг", "Финансы"]
    },
    {
        id: 4,
        name: "Казахский медицинский университет науки и технологий",
        city: "Алматы",
        cityCode: "almaty",
        scorePassed: 130,
        scoreRequired: 125,
        ranking: "2-й в стране",
        specialties: ["Медицина", "Фармакология", "Стоматология", "Психология"]
    },
    {
        id: 5,
        name: "Университет Сулеймана Демиреля",
        city: "Алматы",
        cityCode: "almaty",
        scorePassed: 118,
        scoreRequired: 110,
        ranking: "7-й в стране",
        specialties: ["Инженерия", "Экономика", "Менеджмент", "Компьютерные науки"]
    },

    // АСТАНА
    {
        id: 6,
        name: "Назарбаев Университет",
        city: "Астана",
        cityCode: "astana",
        scorePassed: 135,
        scoreRequired: 130,
        ranking: "1-й в Астане",
        specialties: ["Инженерия", "Лидерство", "Наука", "Бизнес"]
    },
    {
        id: 7,
        name: "Казахский национальный политехнический университет",
        city: "Астана",
        cityCode: "astana",
        scorePassed: 120,
        scoreRequired: 115,
        ranking: "3-й в стране",
        specialties: ["Машиностроение", "Электроника", "Информатика", "Строительство"]
    },
    {
        id: 8,
        name: "Казахский гуманитарно-юридический университет",
        city: "Астана",
        cityCode: "astana",
        scorePassed: 112,
        scoreRequired: 105,
        ranking: "8-й в стране",
        specialties: ["Право", "Философия", "История", "Политология"]
    },
    {
        id: 9,
        name: "Евразийский национальный университет им. Гумилёва",
        city: "Астана",
        cityCode: "astana",
        scorePassed: 115,
        scoreRequired: 110,
        ranking: "4-й в стране",
        specialties: ["Филология", "Культурология", "Образование", "Журналистика"]
    },
    {
        id: 10,
        name: "Казахский университет технологии и бизнеса",
        city: "Астана",
        cityCode: "astana",
        scorePassed: 108,
        scoreRequired: 100,
        ranking: "12-й в стране",
        specialties: ["Логистика", "Туризм", "Гостинично-ресторанный бизнес", "Экспорт"]
    },

    // КАРАГАНДА
    {
        id: 11,
        name: "Карагандинский государственный технический университет",
        city: "Караганда",
        cityCode: "karaganda",
        scorePassed: 105,
        scoreRequired: 98,
        ranking: "6-й в стране",
        specialties: ["Горное дело", "Металлургия", "Энергетика", "Машиностроение"]
    },
    {
        id: 12,
        name: "Карагандинский государственный университет им. Арыстанова",
        city: "Караганда",
        cityCode: "karaganda",
        scorePassed: 100,
        scoreRequired: 92,
        ranking: "11-й в стране",
        specialties: ["Педагогика", "Психология", "Социология", "История"]
    },
    {
        id: 13,
        name: "Карагандинский медицинский университет",
        city: "Караганда",
        cityCode: "karaganda",
        scorePassed: 125,
        scoreRequired: 120,
        ranking: "9-й в стране",
        specialties: ["Медицина", "Сестринское дело", "Фармакология", "Реабилитология"]
    },
    {
        id: 14,
        name: "Университет инновационного развития Караганды",
        city: "Караганда",
        cityCode: "karaganda",
        scorePassed: 102,
        scoreRequired: 95,
        ranking: "15-й в стране",
        specialties: ["Стартапы", "Инновационный менеджмент", "IT-технологии", "Дизайн"]
    },
    {
        id: 15,
        name: "Карагандинский технико-экономический колледж-школа",
        city: "Караганда",
        cityCode: "karaganda",
        scorePassed: 95,
        scoreRequired: 85,
        ranking: "18-й в стране",
        specialties: ["Слесарное дело", "Электромонтажные работы", "Секретариат", "Бухучёт"]
    },

    // КЫЗЫЛОРДА
    {
        id: 16,
        name: "Кызылординский государственный университет им. Момышулы",
        city: "Кызылорда",
        cityCode: "kzyl-orda",
        scorePassed: 98,
        scoreRequired: 90,
        ranking: "13-й в стране",
        specialties: ["Филология", "История", "Экология", "Физкультура"]
    },
    {
        id: 17,
        name: "Казахский инженерно-технический университет им. Сатпаева (филиал)",
        city: "Кызылорда",
        cityCode: "kzyl-orda",
        scorePassed: 110,
        scoreRequired: 102,
        ranking: "14-й в стране",
        specialties: ["Нефтегазовое дело", "Геология", "Электроэнергетика", "Горное дело"]
    },
    {
        id: 18,
        name: "Кызылординский педагогический колледж",
        city: "Кызылорда",
        cityCode: "kzyl-orda",
        scorePassed: 93,
        scoreRequired: 85,
        ranking: "17-й в стране",
        specialties: ["Начальное образование", "Физическая культура", "Музыкальное образование", "Изобразительное искусство"]
    },
    {
        id: 19,
        name: "Кызылординский сельскохозяйственный университет",
        city: "Кызылорда",
        cityCode: "kzyl-orda",
        scorePassed: 96,
        scoreRequired: 88,
        ranking: "16-й в стране",
        specialties: ["Животноводство", "Агрономия", "Садоводство", "Механизация"]
    },
    {
        id: 20,
        name: "Университет туризма и культуры Кызылорды",
        city: "Кызылорда",
        cityCode: "kzyl-orda",
        scorePassed: 92,
        scoreRequired: 83,
        ranking: "19-й в стране",
        specialties: ["Туризм", "Гостиничное дело", "Культурный менеджмент", "Живопись"]
    },

    // АТЫРАУ
    {
        id: 21,
        name: "Западно-Казахстанский аграрно-технический университет им. Жангира Хана",
        city: "Атырау",
        cityCode: "atyrau",
        scorePassed: 103,
        scoreRequired: 95,
        ranking: "10-й в стране",
        specialties: ["Сельское хозяйство", "Механизация", "Экономика", "Земельное право"]
    },
    {
        id: 22,
        name: "Атырауский государственный университет им. Халела Досмухамедова",
        city: "Атырау",
        cityCode: "atyrau",
        scorePassed: 100,
        scoreRequired: 92,
        ranking: "11-й в стране",
        specialties: ["Лингвистика", "Экология", "Физика", "Математика"]
    },
    {
        id: 23,
        name: "Каспийский инженерно-технический университет",
        city: "Атырау",
        cityCode: "atyrau",
        scorePassed: 115,
        scoreRequired: 108,
        ranking: "9-й в стране",
        specialties: ["Нефтехимия", "Морские технологии", "Энергетика", "Автоматизация"]
    },
    {
        id: 24,
        name: "Атырауский колледж искусств и ремёсел",
        city: "Атырау",
        cityCode: "atyrau",
        scorePassed: 88,
        scoreRequired: 80,
        ranking: "20-й в стране",
        specialties: ["Деревообработка", "Изделия из металла", "Текстиль", "Керамика"]
    },
    {
        id: 25,
        name: "Атырауский медико-социальный колледж",
        city: "Атырау",
        cityCode: "atyrau",
        scorePassed: 105,
        scoreRequired: 100,
        ranking: "12-й в стране",
        specialties: ["Сестринское дело", "Правильное питание", "Дошкольное образование", "Социальная работа"]
    }
];

// Функция для создания карточки университета
function createUniversityCard(uni) {
    const card = document.createElement('div');
    card.className = 'university-card';
    card.setAttribute('data-city', uni.cityCode);
    
    const specialtiesHTML = uni.specialties
        .map(spec => `<span class="specialty-tag">${spec}</span>`)
        .join('');
    
    card.innerHTML = `
        <div class="university-header">
            <div class="university-name">${uni.name}</div>
            <div class="university-city">📍 ${uni.city}</div>
        </div>
        <div class="university-body">
            <div class="info-row">
                <span class="info-label">Пороговый балл:</span>
                <span class="score-badge">${uni.scoreRequired} баллов</span>
            </div>
            <div class="info-row">
                <span class="info-label">Проходной балл:</span>
                <span class="info-value">${uni.scorePassed} баллов</span>
            </div>
            <div class="info-row">
                <span class="info-label">Рейтинг:</span>
                <span class="ranking-badge">⭐ ${uni.ranking}</span>
            </div>
            <div class="specialties">
                <span class="specialties-label">Специальности:</span>
                ${specialtiesHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Функция для отрисовки университетов
function renderUniversities(filter = 'all') {
    const grid = document.getElementById('universitiesGrid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? universities 
        : universities.filter(uni => uni.cityCode === filter);
    
    filtered.forEach(uni => {
        const card = createUniversityCard(uni);
        grid.appendChild(card);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Первый рендер
    renderUniversities();
    
    // Установка фильтров
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем фильтр и отрисовываем
            const filter = this.getAttribute('data-filter');
            renderUniversities(filter);
        });
    });
});
