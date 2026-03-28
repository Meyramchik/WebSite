# 🎓 Universe Catalog - Django University Catalog

**Полнофункциональный проект каталога университетов на Django 5.x с современным фьютаристичным дизайном**

![Status](https://img.shields.io/badge/status-active-brightgreen) ![Django](https://img.shields.io/badge/Django-5.x-green) ![Python](https://img.shields.io/badge/Python-3.10%2B-blue) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Начните отсюда!

### Новичок? Читайте в этом порядке:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡ — 5 минут для запуска! Начните здесь!
2. **[README.md](README.md)** 📖 — Полное описание возможностей
3. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** 📁 — Структура проекта
4. **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** 👨‍💼 — Управление через админку
5. **[MEDIA_CONFIG.md](MEDIA_CONFIG.md)** 🖼️ — Загрузка логотипов
6. **[DEPLOYMENT.md](DEPLOYMENT.md)** 🌐 — Развертывание на production

---

## ✨ Основные возможности

### 📊 Архитектура данных

Модель **University** с полями:

```python
- name           (текст, уникальное)         # Название университета
- description    (длинный текст)             # Полное описание
- city           (текст, индексировано)     # Город расположения
- logo           (ImageField)                # Загрузка логотипа
- passing_score  (целое число)               # Проходной балл ЕГЭ
- website        (URL)                       # Официальный сайт
- created_at     (дата/время)                # Автоматически добавляется
- updated_at     (дата/время)                # Автоматически обновляется
```

### 🎨 Front-end функциональность

✅ **Главная страница** (`/`)

- Список всех университетов в красивых карточках
- Glassmorphism дизайн с неоновыми акцентами
- Адаптивная сетка (мобильная → планшет → десктоп)
- Поиск по названию в real-time
- Фильтрация по городам

✅ **Страница деталей** (`/university/<id>/`)

- Полная информация о университета
- Справочная статистика
- Рекомендации по другим вузам в городе
- Прямая ссылка на официальный сайт
- Возможность редактирования через админку

### 👨‍💼 Backend функциональность

✅ **Admin Panel** — Полный CRUD:

- Создание новых университетов
- Редактирование существующих
- Удаление (с подтверждением)
- Загрузка логотипов через админку
- Поиск и фильтрация по множеству параметров
- Сортировка по название, городу, проходному баллу

✅ **Управление мультимедиа**:

- Загрузка логотипов через admin panel
- Автоматическое сохранение в папку `media/logos/YYYY/MM/`
- Поддержка JPG, PNG, GIF, WebP форматов
- Отображение in браузер по URL `/media/logos/...`

✅ **Поиск и фильтрация**:

- Полнотекстовый поиск по названию и описанию
- Фильтрация по городам
- Сортировка по различным критериям

### 🎨 Дизайн

**Тема**: Modern Space/Futuristic (Glassmorphism)

**Цветовая схема**:

```
🔵 Неоновый синий     #00d4ff    (основной акцент)
🟣 Неоновый фиолетовый #d946ef   (вторичный акцент)
⬛ Темный фон          #0f172a    (ночная тема)
⚪ Текст               #e2e8f0    (светлый текст)
```

**Эффекты**:

- Glass morphism (стеклянные карточки)
- Неоновое свечение (glow effects)
- Плавные переходы (smooth animations)
- Адаптивный дизайн (mobile-first)
- Responsive сетка (1 col → 3 cols)

---

## 📥 Быстрая установка (2 минуты)

### Шаг 1: Окружение

```bash
cd university_catalog
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

### Шаг 2: Зависимости

```bash
pip install -r requirements.txt
```

### Шаг 3: БД

```bash
python manage.py migrate
python manage.py createsuperuser
```

### Шаг 4: Запуск

```bash
python manage.py runserver
```

**Готово! 🎉**

- 🌐 Сайт: http://127.0.0.1:8000/
- 👨‍💼 Админка: http://127.0.0.1:8000/admin/

Для подробных инструкций смотрите **[QUICKSTART.md](QUICKSTART.md)**

---

## 📁 Структура проекта

```
university_catalog/
├── manage.py                           # Django CLI
├── requirements.txt                    # Зависимости
├── README.md                           # Главная документация
├── QUICKSTART.md                       # Быстрый старт ⭐
├── PROJECT_STRUCTURE.md                # Структура проекта
├── ADMIN_GUIDE.md                      # Работа с админкой
├── MEDIA_CONFIG.md                     # Конфигурация медиа
├── DEPLOYMENT.md                       # Развертывание
│
├── university_project/                 # Django конфигурация
│   ├── settings.py                     # Основные настройки
│   ├── urls.py                         # Главные маршруты
│   └── ...
│
├── universities/                       # Основное приложение
│   ├── models.py                       # Модель University
│   ├── views.py                        # Представления
│   ├── admin.py                        # Админ-панель
│   ├── urls.py                         # URL маршруты
│   ├── templates/universities/
│   │   ├── base.html                   # Базовый шаблон
│   │   ├── index.html                  # Главная страница
│   │   └── detail.html                 # Страница деталей
│   ├── migrations/                     # Миграции БД
│   └── data_loader.py                  # Тестовые данные
│
├── media/                              # Загруженные файлы
│   └── logos/YYYY/MM/                  # Логотипы университетов
│
└── db.sqlite3                          # База данных (создается)
```

Полное описание: **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**

---

## 🖼️ Загрузка логотипов (MEDIA_URL)

### Как это работает?

1. **Конфигурация** (уже настроена в `settings.py`):

   ```python
   MEDIA_URL = '/media/'                 # Путь доступа в браузер
   MEDIA_ROOT = BASE_DIR / 'media'      # Физическое расположение
   ```

2. **Загрузка через админку**:
   - Откройте `/admin/` → Universities → Выберите/создайте вуз
   - Нажмите "Choose File" → Выберите логотип
   - Файл сохранится в `media/logos/2024/03/example.jpg`

3. **Отображение в шаблонах**:
   ```html
   {% if university.logo %}
   <img src="{{ university.logo.url }}" alt="Logo" />
   {% endif %}
   ```

**URL в браузере**: `http://127.0.0.1:8000/media/logos/2024/03/example.jpg`

Полное руководство: **[MEDIA_CONFIG.md](MEDIA_CONFIG.md)**

---

## 🎛️ Админ-панель

### Доступ

- **URL**: http://127.0.0.1:8000/admin/
- **Логин/Пароль**: Созданные при `createsuperuser`

### Основные операции

| Операция              | Как выполнить                                  |
| --------------------- | ---------------------------------------------- |
| **Создать вуз**       | Admin → Universities → "Add University"        |
| **Отредактировать**   | Admin → Universities → Нажать на название      |
| **Удалить**           | Admin → Выбрать → Action → Delete              |
| **Загрузить логотип** | При редактировании → Поле "Logo" → Choose File |
| **Поиск**             | Admin → Поле Search → Введите название         |
| **Фильтр по городу**  | Admin → Right panel → By city → Выберите       |

Полное руководство: **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)**

---

## 🧪 Тестовые данные

### Добавить примеры университетов

```bash
python manage.py shell
exec(open('universities/data_loader.py').read())
exit()
```

Будут добавлены 10 известных российских университетов:

- МГУ имени М.В. Ломоносова
- Санкт-Петербургский ГУ
- Томский политехнический
- Новосибирский ГУ
- Уральский ФУ
- И другие...

---

## 🔧 Технические требования

```
Python              3.10+
Django              5.x
Pillow              10.2.0+ (для работы с изображениями)
```

### Установка зависимостей

```bash
pip install -r requirements.txt
```

Если Pillow не установился:

```bash
pip install Pillow
```

---

## 🌐 Развертывание

### Локальная разработка ✅

```bash
python manage.py runserver
```

### Production варианты:

**Heroku** — Самый легкий способ
**PythonAnywhere** — Хостинг для Python
**DigitalOcean** — VPS с Nginx + Gunicorn
**AWS / Azure** — Облачные сервисы

[Полное руководство по развертыванию →](DEPLOYMENT.md)

---

## 🎨 Кастомизация

### Изменение цветов

Отредактируйте в `base.html`:

```javascript
colors: {
    neon: {
        blue: '#00d4ff',      // Измените цвет
        purple: '#d946ef',    // Измените цвет
    }
}
```

### Добавление полей модели

1. Отредактируйте `universities/models.py`
2. Создайте миграцию: `python manage.py makemigrations`
3. Примените: `python manage.py migrate`
4. Обновите админ-панель в `admin.py`

### Добавление новых страниц

1. Создайте функцию в `views.py`
2. Добавьте маршрут в `urls.py`
3. Создайте шаблон
4. Обновите навигацию

---

## 📚 Документация

### Включено в проект

| Файл                     | Описание                                       |
| ------------------------ | ---------------------------------------------- |
| **QUICKSTART.md**        | 5-минутный старт (начните отсюда!)             |
| **README.md**            | Полная документация                            |
| **PROJECT_STRUCTURE.md** | Структура проекта и взаимодействие компонентов |
| **ADMIN_GUIDE.md**       | Работа с Django admin panel                    |
| **MEDIA_CONFIG.md**      | Загрузка и работа с логотипами                 |
| **DEPLOYMENT.md**        | Развертывание на production                    |

### Полезные ссылки

- 🔗 [Django Documentation](https://docs.djangoproject.com/)
- 🔗 [Django Admin Docs](https://docs.djangoproject.com/en/5.0/ref/contrib/admin/)
- 🔗 [Tailwind CSS Docs](https://tailwindcss.com/)
- 🔗 [Pillow (PIL) Docs](https://python-pillow.org/)

---

## 🐛 Решение проблем

### Проблема: Логотипы не отображаются

✅ **Решение**:

1. Убедитесь что `DEBUG = True` в settings.py
2. Проверьте что папка `media/` существует
3. Введите полный путь в браузер: http://127.0.0.1:8000/media/logos/...

### Проблема: Ошибка "No module named 'PIL'"

✅ **Решение**:

```bash
pip install Pillow
```

### Проблема: База данных не создалась

✅ **Решение**:

```bash
python manage.py migrate
python manage.py createsuperuser
```

Больше ошибок? Смотрите **[README.md](README.md#-решение-проблем)**

---

## 📊 Стек технологий

**Backend**:

- Django 5.x — Web framework
- SQLite — БД для разработки (PostgreSQL для production)
- Pillow — Обработка изображений
- Python 3.10+ — Язык программирования

**Frontend**:

- HTML5 — Структура
- Tailwind CSS — Styling (через CDN)
- JavaScript (es6+) — Интерактивность
- Glassmorphism — Современный дизайн

**Deployment**:

- Gunicorn — WSGI сервер
- Nginx — Веб-сервер
- PostgreSQL — Production БД

---

## 📝 Лицензия

MIT License — Свободен для использования и модификации

---

## 🤝 Контрибьюция

Проект создан в образовательных целях.

### Что можно улучшить?

- [ ] API (REST/GraphQL)
- [ ] Аутентификация студентов
- [ ] Система рейтингов
- [ ] История изменений
- [ ] Export в PDF
- [ ] Email уведомления
- [ ] Многоязычность

---

## 💡 Советы

✨ **Новички в Django?**

- Начните с [QUICKSTART.md](QUICKSTART.md)
- Затем изучите [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- Экспериментируйте в `python manage.py shell`

🔐 **Готовясь к production?**

- Прочитайте [DEPLOYMENT.md](DEPLOYMENT.md)
- Используйте PostgreSQL вместо SQLite
- Измените SECRET_KEY и DEBUG
- Установите ALLOWED_HOSTS

---

## 📞 Поддержка

Возникли вопросы?

1. ✅ Проверьте документацию
2. ✅ Смотрите раздел "Решение проблем"
3. ✅ Используйте `python manage.py shell` для экспериментов
4. ✅ Посмотрите официальную [Django документацию](https://docs.djangoproject.com/)

---

## 🎓 Обучающие материалы

Этот проект иллюстрирует:

- ✅ Создание моделей (Models)
- ✅ CRUD операции
- ✅ Django Admin Customization
- ✅ Template Inheritance
- ✅ URL Routing
- ✅ File Upload (ImageField)
- ✅ Поиск и фильтрация
- ✅ Responsive веб-дизайн
- ✅ Modern CSS (Tailwind)
- ✅ Production deployment

**Отлично подходит для portfolio!** 🎯

---

<div align="center">

## 🚀 Готово начать?

**[Перейти к QUICKSTART →](QUICKSTART.md)**

Вопросы? **[Читайте README →](README.md)**

Разворачиваете? **[DEPLOYMENT GUIDE →](DEPLOYMENT.md)**

---

**Made with ❤️ for learning Django**

**© 2024 Universe Catalog Project**

</div>
