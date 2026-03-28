# 🖼️ MEDIA_URL CONFIGURATION GUIDE

## Что такое MEDIA_URL и MEDIA_ROOT?

**MEDIA_URL** — это URL путь, по которому браузер будет получать доступ к загруженным файлам (логотипы, изображения и т.д.)

**MEDIA_ROOT** — это физическое расположение файлов на сервере

## Текущая конфигурация

В файле `university_project/settings.py` уже настроено:

```python
# Media files (User uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

Это означает:

- URL: `http://127.0.0.1:8000/media/logos/2024/03/example.jpg`
- Физический путь: `d:\WebSite\university_catalog\media\logos\2024\03\example.jpg`

## Как работает загрузка логотипов

### 1. Модель

В `universities/models.py` определено:

```python
logo = models.ImageField(
    upload_to='logos/%Y/%m/',  # Автоматически создает подпапки по году и месяцу
    verbose_name='Логотип',
    blank=True,
    null=True
)
```

### 2. Маршруты URL

В `university_project/urls.py` для режима разработки добавлены:

```python
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

Это обслуживает медиа-файлы в режиме разработки (DEBUG=True)

### 3. Шаблоны

В шаблонах используется:

```html
{% if university.logo %}
<img src="{{ university.logo.url }}" alt="{{ university.name }}" />
{% else %}
<div class="text-5xl">🏫</div>
{% endif %}
```

Переменная `{{ university.logo.url }}` автоматически генерирует полный URL.

## Загрузка логотипа через админку

1. **Откройте админ-панель**: http://127.0.0.1:8000/admin/

2. **Перейдите в раздел "Университеты"**

3. **Выберите или создайте университет**

4. **В поле "Логотип" нажмите "Выбрать файл"**

5. **Выберите изображение** (JPG, PNG, GIF, WebP)

6. **Сохраните форму**

Логотип будет автоматически:

- Загружен в папку `media/logos/YYYY/MM/`
- Сохранена ссылка на него в БД
- Доступен по URL `/media/logos/YYYY/MM/filename.ext`

## Структура папок медиа

После загрузки нескольких логотипов структура будет выглядеть так:

```
media/
├── logos/
│   ├── 2024/
│   │   ├── 01/
│   │   │   ├── mgu_logo.jpg
│   │   │   └── spbu_logo.png
│   │   ├── 02/
│   │   │   └── tpu_logo.jpg
│   │   └── 03/
│   │       └── nsu_logo.png
│   └── .gitkeep
└── README.txt
```

## Использование разных путей для разных моделей

Если у вас много моделей с изображениями:

```python
class University(models.Model):
    logo = models.ImageField(upload_to='universities/')

class Faculty(models.Model):
    icon = models.ImageField(upload_to='faculties/')

class News(models.Model):
    image = models.ImageField(upload_to='news/%Y/%m/')
```

## Production конфигурация

### Вариант 1: Nginx + Django (рекомендуется)

**settings.py:**

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = '/var/www/university_catalog/media/'  # Абсолютный путь на сервере
```

**nginx.conf:**

```nginx
server {
    location /media/ {
        alias /var/www/university_catalog/media/;
        expires 30d;
    }
}
```

### Вариант 2: AWS S3

**Установите пакет:**

```bash
pip install boto3 django-storages
```

**settings.py:**

```python
if not DEBUG:
    # AWS S3
    AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
    AWS_S3_REGION_NAME = 'us-east-1'
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

### Вариант 3: CDN (CloudFlare, Cloudinary)

**settings.py:**

```python
if not DEBUG:
    MEDIA_URL = 'https://cdn.example.com/media/'
```

Настройте CDN через админ-панель сервиса.

## Оптимизация размера изображений

### Автоматическое сжатие при загрузке

**Установите пакет:**

```bash
pip install django-imagekit
```

**models.py:**

```python
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

class University(models.Model):
    logo = models.ImageField(upload_to='logos/')
    logo_thumbnail = ImageSpecField(
        source='logo',
        processors=[ResizeToFit(200, 200)],
        format='JPEG',
        options={'quality': 90}
    )
```

### Ручная оптимизация

```python
from PIL import Image
from django.core.files.base import ContentFile
import io

def optimize_image(image):
    """Оптимизирует изображение"""
    img = Image.open(image)
    img.thumbnail((400, 400))

    buffer = io.BytesIO()
    img.save(buffer, format='JPEG', quality=90)
    return ContentFile(buffer.getvalue())
```

## Решение проблем

### Логотипы не отображаются

**Проверьте:**

1. Директория `media/` существует и имеет права на запись:

```bash
# Windows
icacls "media" /grant:r "%USERNAME%:F"

# Linux/Mac
chmod -R 755 media
```

2. В БД сохранена ссылка на логотип:

```bash
python manage.py shell
from universities.models import University
u = University.objects.first()
print(u.logo.url)  # Должна вывести URL
exit()
```

3. DEBUG = True в settings.py (для разработки)

4. `django.middleware.common.CommonMiddleware` включен в MIDDLEWARE

### Ошибка "No module named 'PIL'"

```bash
pip install Pillow
```

### Ошибка при загрузке "The submitted file is empty"

1. Проверьте размер файла в админке
2. Убедитесь, что формат поддерживается (JPG, PNG, GIF, WebP)
3. Проверьте права доступа на папку `media/`

### Логотипы не сохраняются

1. Проверьте, что `blank=True` и `null=True` установлены в модели
2. Убедитесь, что форма админки включает поле `logo`
3. Проверьте права доступа на базу данных

## Кодовые примеры

### Вывести в шаблоне

```html
<!-- С проверкой на существование -->
{% if object.logo %}
<img src="{{ object.logo.url }}" alt="{{ object.name }}" class="max-w-xs" />
{% else %}
<p>Логотип не загружен</p>
{% endif %}
```

### В представлении

```python
def get_logo_url(university):
    if university.logo:
        return university.logo.url
    return '/static/images/default_logo.png'

# Или для JSON API
def university_to_dict(university):
    return {
        'name': university.name,
        'logo': university.logo.url if university.logo else None,
    }
```

### В админке (кастомный вывод)

```python
from django.contrib import admin
from .models import University

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    readonly_fields = ['logo_preview']

    def logo_preview(self, obj):
        if obj.logo:
            return f'<img src="{obj.logo.url}" width="100" height="100" />'
        return 'Нет логотипа'

    logo_preview.allow_tags = True
    logo_preview.short_description = 'Предпросмотр'
```

## Полезные команды

```bash
# Просмотр всех загруженных логотипов
find media/logos -type f

# Удаление всех логотипов (осторожно!)
rm -rf media/logos/*

# Архивирование медиа
tar -czf media_backup.tar.gz media/

# Проверка размера медиа
du -sh media/
```

---

**Успешной работы с медиа-файлами! 🎨**
