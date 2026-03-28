# 🚀 Universe Catalog - Каталог Университетов

Современный сайт-каталог университетов для абитуриентов, разработанный на Django 5.x с использованием Tailwind CSS.

## ✨ Особенности

- **Модельные данные**: Полная информация о университетах (название, описание, город, логотип, проходной балл, сайт)
- **Админ-панель Django**: CRUD операции для управления университетами
- **Поиск и фильтрация**: Поиск по названию и фильтрация по городам
- **Современный дизайн**:
  - Темная тема (Dark Mode)
  - Glassmorphism эффекты
  - Неоновые акценты (синий #00d4ff и фиолетовый #d946ef)
  - Адаптивная верстка (мобильная, планшет, десктоп)
- **Загрузка логотипов**: Поддержка ImageField для логотипов университетов

## 📋 Требования

- Python 3.10+
- Django 5.x
- Pillow (для работы с изображениями)

## 🚀 Быстрый Старт

### 1. Установка

```bash
# Переходим в директорию проекта
cd university_catalog

# Создаем виртуальное окружение (рекомендуется)
python -m venv venv

# Активируем виртуальное окружение
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Устанавливаем зависимости
pip install -r requirements.txt
```

### 2. Инициализация БД

```bash
# Создаем миграции для модели University
python manage.py makemigrations

# Применяем миграции
python manage.py migrate
```

### 3. Создание супер-пользователя (для админки)

```bash
python manage.py createsuperuser
# Введите имя пользователя, email и пароль
```

### 4. Добавление тестовых данных (опционально)

```bash
python manage.py shell

# Выполните код в shell:
from universities.models import University

University.objects.create(
    name="МГУ имени М.В. Ломоносова",
    description="Один из крупнейших и ведущих университетов России. МГУ - это научный и образовательный центр мирового значения.",
    city="Москва",
    passing_score=300,
    website="https://www.msu.ru/"
)

University.objects.create(
    name="Санкт-Петербургский государственный университет",
    description="Второй по величине университет России с более чем 300-летней историей. Лидирует в области фундаментальных исследований.",
    city="Санкт-Петербург",
    passing_score=295,
    website="https://spbu.ru/"
)

# Выход
exit()
```

### 5. Запуск сервера разработки

```bash
python manage.py runserver

# Сервер будет доступен по адресу http://127.0.0.1:8000/
```

### 6. Доступ к приложению

- **Главная страница**: http://127.0.0.1:8000/
- **Админ-панель**: http://127.0.0.1:8000/admin/
  - Логин: ваше имя пользователя
  - Пароль: ваш пароль

## 📁 Структура Проекта

```
university_catalog/
├── manage.py                          # Django управление
├── requirements.txt                   # Зависимости
├── README.md                          # Этот файл
├── db.sqlite3                         # База данных (создается при migrate)
├── media/                             # Загруженные файлы (логотипы)
│   └── logos/
├── staticfiles/                       # Статические файлы
├── university_project/                # Основная конфигурация
│   ├── settings.py                    # Настройки Django
│   ├── urls.py                        # Главные URL маршруты
│   ├── wsgi.py
│   └── asgi.py
└── universities/                      # Основное приложение
    ├── migrations/                    # Миграции БД
    ├── templates/universities/
    │   ├── base.html                  # Базовый шаблон
    │   ├── index.html                 # Главная страница
    │   └── detail.html                # Страница деталей
    ├── static/css/
    ├── models.py                      # Модель University
    ├── views.py                       # Представления
    ├── urls.py                        # URL маршруты приложения
    ├── admin.py                       # Конфигурация админ-панели
    ├── apps.py
    └── forms.py                       # Формы (поиск/фильтрация)
```

## 🎨 Дизайн и Стили

### Используемые технологии

- **Tailwind CSS**: Подключено через CDN (https://cdn.tailwindcss.com)
- **Тема**: Modern Space/Futuristic (Glassmorphism)
- **Цветовая схема**:
  - Темный фон: `#0f172a`
  - Неоновый синий: `#00d4ff`
  - Неоновый фиолетовый: `#d946ef`

### CSS Классы

```html
<!-- Стеклянный эффект (Glassmorphism) -->
<div class="glass-effect">...</div>

<!-- Неоновое свечение синее -->
<div class="glow-neon-blue">...</div>

<!-- Неоновое свечение фиолетовое -->
<div class="glow-neon-purple">...</div>

<!-- Кнопка неоновая синяя -->
<button class="btn-neon-blue">...</button>

<!-- Кнопка неоновая фиолетовая -->
<button class="btn-neon-purple">...</button>

<!-- Текст с неоновым свечением -->
<span class="text-glow-blue">...</span>
<span class="text-glow-purple">...</span>
```

## 🖼️ Загрузка Логотипов Университетов

### Конфигурация MEDIA_URL

В файле `university_project/settings.py` уже настроено:

```python
# Media files (User uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### Как это работает

1. **MEDIA_URL** — это URL путь для доступа к загруженным файлам (`/media/`)
2. **MEDIA_ROOT** — это физическая директория на сервере где хранятся файлы
3. В `university_project/urls.py` добавлена обработка медиа-файлов в режиме разработки (DEBUG=True)

### Загрузка логотипа

1. Откройте админ-панель: http://127.0.0.1:8000/admin/
2. Перейдите в раздел "Университеты"
3. Создайте или отредактируйте университет
4. Загрузите логотип в поле "Логотип"
5. Сохраните

Логотип будет сохранен в: `media/logos/YYYY/MM/filename.ext`

### Отображение логотипов

В шаблонах логотип выводится через:

```html
{% if university.logo %}
<img src="{{ university.logo.url }}" alt="{{ university.name }}" />
{% else %}
<div class="text-5xl">🏫</div>
{% endif %}
```

Переменная `{{ university.logo.url }}` автоматически генерирует полный путь с `MEDIA_URL`.

## 🔍 Функциональность Хмейк

### Главная страница (/)

- ✅ Список всех университетов в виде красивых карточек
- ✅ Поиск по названию
- ✅ Фильтрация по городу
- ✅ Адаптивная сетка (1 колонка на мобильной, 3 колонки на десктопе)

### Страница деталей (/university/<id>/)

- ✅ Полная информация о университете
- ✅ Статистика (проходной балл, город)
- ✅ Ссылка на официальный сайт
- ✅ Рекомендации (другие университеты в том же городе)
- ✅ Возможность редактиро
  вания через админку

### Админ-панель (/admin/)

- ✅ CRUD операции (Create, Read, Update, Delete)
- ✅ Фильтрация по городу и году
- ✅ Поиск по названию, городу и описанию
- ✅ Сортировка по названию, городу, проходному баллу
- ✅ Загрузка логотипов с автоматизацией пути

## 🛠️ Расширение и кастомизация

### Добавление нового поля в модель

1. Отредактируйте `universities/models.py`:

```python
class University(models.Model):
    # ... существующие поля
    new_field = models.CharField(max_length=100)
```

2. Создайте и примените миграцию:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Изменение цветовой схемы

Отредактируйте CSS в `base.html`:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          neon: {
            blue: "#00d4ff", // Измените цвет
            purple: "#d946ef", // Измените цвет
            dark: "#0f172a",
          },
        },
      },
    },
  };
</script>
```

## 📦 Развертывание

### Подготовка к продакшену

1. Измените `DEBUG = False` в `settings.py`
2. Установите `SECRET_KEY` на безопасное значение
3. Обновите `ALLOWED_HOSTS` на ваши домены
4. Используйте встроенную БД на продакшене (рекомендуется PostgreSQL)
5. Настройте статические файлы и медиа на CDN

### Примеры развертывания

- **Heroku**: Добавьте `Procfile` и `runtime.txt`
- **PythonAnywhere**: Загрузите файлы и настройте веб-app
- **DigitalOcean/AWS**: Используйте Gunicorn + Nginx

## 🐛 Решение проблем

### Логотипы не отображаются

1. Проверьте, что `DEBUG = True` в `settings.py`
2. Убедитесь, что директория `media/` существует
3. Проверьте права доступа на директорию

```bash
# Windows (PowerShell)
icacls "media" /grant:r "%USERNAME%:F"

# Mac/Linux
chmod -R 755 media
```

### Ошибка "ModuleNotFoundError: No module named 'PIL'"

```bash
pip install Pillow
```

### Ошибка при миграции

```bash
# Удалите старую БД и заново
rm db.sqlite3
python manage.py migrate
```

## 📚 Полезные ресурсы

- [Django документация](https://docs.djangoproject.com/)
- [Django Admin документация](https://docs.djangoproject.com/en/5.0/ref/contrib/admin/)
- [Tailwind CSS документация](https://tailwindcss.com/)
- [Pillow документация](https://python-pillow.org/)

## 📄 Лицензия

Проект создан в образовательных целях. Свободен для модификации и использования.

## 💡 Подсказки

- Используйте `python manage.py shell` для быстрого прототипирования
- Включите `DEBUG = True` для красивых страниц ошибок при разработке
- Используйте `logs/` директорию для версионирования логотипов
- Регулярно делайте резервные копии `db.sqlite3`

---

**Автор**: Django University Catalog  
**Версия**: 1.0  
**Дата**: 2024
