# 📋 PROJECT STRUCTURE DOCUMENTATION

## Полная структура проекта

```
university_catalog/                      # Корневая папка проекта
│
├── manage.py                           # Django управление (главная команда)
├── requirements.txt                    # Список зависимостей Python
├── README.md                           # Главная документация
├── QUICKSTART.md                       # Быстрый старт
├── DEPLOYMENT.md                       # Руководство развертывания
├── MEDIA_CONFIG.md                     # Конфигурация медиа-файлов
├── .gitignore                          # Исключения для Git
│
├── university_project/                 # Django проект конфигурация
│   ├── __init__.py
│   ├── settings.py                     # Главные настройки проекта
│   ├── urls.py                         # Главные маршруты URL
│   ├── asgi.py                         # ASGI для production
│   └── wsgi.py                         # WSGI для production
│
├── universities/                       # Django приложение (основное)
│   │
│   ├── migrations/                     # Миграции БД
│   │   ├── __init__.py
│   │   └── 0001_initial.py            # Начальная миграция
│   │
│   ├── templates/                      # HTML шаблоны
│   │   └── universities/
│   │       ├── base.html              # Базовый шаблон (наследуется)
│   │       ├── index.html             # Главная страница
│   │       └── detail.html            # Страница деталей университета
│   │
│   ├── static/                         # Статические файлы (CSS, JS, images)
│   │   └── css/
│   │       └── custom.css             # Кастомные стили
│   │
│   ├── __init__.py
│   ├── models.py                       # ORM модели (University)
│   ├── views.py                        # Представления (views)
│   ├── urls.py                         # URL маршруты приложения
│   ├── admin.py                        # Конфигурация админ-панели
│   ├── apps.py                         # Конфигурация приложения
│   ├── forms.py                        # Формы поиска/фильтрации
│   └── data_loader.py                  # Скрипт для добавления тестовых данных
│
├── media/                              # Загруженные файлы (юзер-контент)
│   ├── logos/                          # Логотипы университетов
│   │   └── YYYY/MM/                   # Организация по году/месяцу
│   │       ├── mgu_logo.jpg
│   │       ├── spbu_logo.png
│   │       └── ...
│   └── README.txt
│
├── staticfiles/                        # Собранные статические файлы (production)
│
├── db.sqlite3                          # БД (создается после migrate)
│
└── logs/                               # Логи приложения (опционально)
    └── django.log
```

## Описание ключевых файлов

### Конфигурационные файлы

#### `university_project/settings.py`

Центральный файл конфигурации Django:

- Установленные приложения (INSTALLED_APPS)
- Конфигурация БД
- Правила безопасности
- Пути к папкам (STATIC_ROOT, MEDIA_ROOT, etc.)
- Настройки шаблонизатора

#### `university_project/urls.py`

Главные URL маршруты:

- Маршрут к админ-панели (`/admin/`)
- Включение маршрутов приложения `universities`
- Обслуживание медиа-файлов в разработке

### Моделные и логические файлы

#### `universities/models.py`

Определение модели **University** с полями:

- `name` - название университета
- `description` - полное описание
- `city` - город расположения
- `logo` - ImageField для загрузки логотипа
- `passing_score` - проходной балл
- `website` - URL официального сайта
- `created_at`, `updated_at` - метаданные

#### `universities/views.py`

Представления (В из MVC):

- `index()` - главная страница со списком университетов, поиск и фильтрация
- `detail()` - страница деталей конкретного университета

#### `universities/urls.py`

URL маршруты приложения:

- `''` → `index` (главная)
- `'university/<id>/'` → `detail` (деталь)

#### `universities/admin.py`

Конфигурация админ-панели Django:

- Список отображаемых полей (`list_display`)
- Фильтры (`list_filter`)
- Поиск (`search_fields`)

### Шаблоны (Templates)

#### `base.html`

Базовый шаблон с:

- Структурой HTML
- Стилями Tailwind CSS & кастомные эффекты
- Шапкой (header) с навигацией
- Подвалом (footer)
- Блоками для наследования (`{% block %}`)

#### `index.html`

Главная страница:

- Hero секция
- Форма поиска и фильтрации
- Сетка карточек университетов
- Адаптивный дизайн

#### `detail.html`

Страница деталей:

- Информация о конкретном университета
- Статистика
- Ссылка на официальный сайт
- Рекомендуемые университеты в том же городе

### Утилиты

#### `universities/forms.py`

Формы Django для:

- Поиска по названию
- Фильтрации по городу

#### `universities/data_loader.py`

Скрипт для:

- Добавления тестовых данных в БД
- Использование через `python manage.py shell`

## Взаимодействие компонентов

```
Browser Request
    ↓
university_project/urls.py (маршрутизация)
    ↓
universities/urls.py (маршруты приложения)
    ↓
universities/views.py (обработка запроса)
    ↓
universities/models.py (запрос к БД)
    ↓
db.sqlite3 (БД)
    ↓
universities/views.py (обработка данных)
    ↓
universities/templates/ (рендеринг шпаблона)
    ↓
Browser Response (HTML)
```

## Поток работы приложения

### 1. Добавление университета через админку

```
Admin Panel → Form → POST Request → views.admin
              ↓
         universities/models.py (save)
              ↓
         db.sqlite3 (insert)
              ↓
         Admin: "Успешно добавлено"
```

### 2. Загрузка логотипа

```
Admin Panel → ImageField → File Upload
              ↓
         Pillow обрабатывает (опционально)
              ↓
         media/logos/YYYY/MM/filename.ext (сохранение)
              ↓
         DB: сохранение пути в поле `logo`
```

### 3. Отображение университета на главной

```
GET / (индекс страница)
    ↓
index() view → Query: University.objects.all()
    ↓
db.sqlite3 (GET)
    ↓
Передача данных в index.html
    ↓
Шаблон рендерит карточки с {{ university.logo.url }}
    ↓
HTML ответ браузеру
```

### 4. Поиск и фильтрация

```
User Input → GET /? search=MIT&city=Москва
    ↓
index() view:
  - Query: filter(name__icontains='MIT')
  - Query: filter(city='Москва')
    ↓
db.sqlite3 (SELECT WHERE)
    ↓
Результаты отображаются in index.html
```

## Расширяемость

### Добавление нового поля в модель

1. Отредактировать `universities/models.py`
2. Создать миграцию: `python manage.py makemigrations`
3. Применить миграцию: `python manage.py migrate`
4. Обновить `universities/admin.py` (если нужно отображать в админке)
5. Обновить шаблоны при необходимости

### Добавление новой страницы

1. Создать функцию в `universities/views.py`
2. Добавить маршрут в `universities/urls.py`
3. Создать шаблон в `universities/templates/universities/`
4. Обновить навигацию в `base.html`

### Интеграция с REST API

1. Установить: `pip install djangorestframework`
2. Добавить в INSTALLED_APPS: `'rest_framework'`
3. Создать `universities/serializers.py`
4. Создать `universities/api_views.py`
5. Зарегистрировать в `universities/urls.py`

## Производительность и кэширование

### Оптимизация запросов

```python
# ❌ N+1 problem
universities = University.objects.all()
for uni in universities:
    print(uni.city)  # Дополнительный запрос для каждого

# ✅ Эффективно
universities = University.objects.all().values_list('city', flat=True)
```

### Добавление индексов

```python
class University(models.Model):
    city = models.CharField(..., db_index=True)
    name = models.CharField(..., db_index=True)
```

## Безопасность

- ✅ CSRF защита включена
- ✅ XSS фильтрация через Django templates
- ⚠️ В production: `DEBUG = False`, `ALLOWED_HOSTS` настроены
- ⚠️ SECRET_KEY должен быть уникальным и секретным

---

**Успешной разработки! 🚀**
