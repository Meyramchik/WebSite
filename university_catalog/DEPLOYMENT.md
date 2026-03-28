# 🎨 CUSTOMIZATION & DEPLOYMENT GUIDE

## Кастомизация дизайна

### 1. Изменение цветов

Отредактируйте в файле `universities/templates/universities/base.html`:

```javascript
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    neon: {
                        blue: '#00d4ff',      // Измените на нужный цвет
                        purple: '#d946ef',    // Измените на нужный цвет
                        dark: '#0f172a',      // Фоновый цвет
                    }
                }
            }
        }
    }
</script>
```

### 2. Изменение шрифтов

Добавьте в `<head>` тега base.html:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&display=swap"
  rel="stylesheet"
/>
```

Затем в Tailwind config:

```javascript
theme: {
    extend: {
        fontFamily: {
            'orbitron': ['Orbitron', 'sans-serif'],
        }
    }
}
```

Использование: `<h1 class="font-orbitron">...</h1>`

### 3. Добавление анимаций

Отредактируйте CSS в base.html:

```css
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Добавление новых страниц

### 1. Создайте представление в views.py

```python
def about(request):
    """Страница о проекте"""
    return render(request, 'universities/about.html')
```

### 2. Добавьте URL в urls.py

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('university/<int:pk>/', views.detail, name='detail'),
    path('about/', views.about, name='about'),  # Новый маршрут
]
```

### 3. Создайте шаблон

Создайте файл `universities/templates/universities/about.html`:

```html
{% extends "universities/base.html" %} {% block title %}О проекте - Universe
Catalog{% endblock %} {% block content %}
<div class="py-12 px-4">
  <!-- Ваш контент -->
</div>
{% endblock %}
```

## Развертывание

### Развертывание на Heroku

1. **Установите Heroku CLI**

```bash
# Windows через scoop
scoop install heroku

# Mac
brew tap heroku/brew && brew install heroku

# Linux
sudo apt-get install software-properties-common
sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"
curl https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install heroku
```

2. **Создайте файл Procfile**

```
web: gunicorn university_project.wsgi
```

3. **Создайте runtime.txt**

```
python-3.11.0
```

4. **Установите gunicorn**

```bash
pip install gunicorn
pip freeze > requirements.txt
```

5. **Создайте приложение на Heroku**

```bash
heroku login
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

6. **Добавьте environment переменные**

```bash
heroku config:set DJANGO_SETTINGS_MODULE=university_project.settings
heroku config:set SECRET_KEY='your-secure-key-here'
```

### Развертывание на PythonAnywhere

1. Войдите на [pythonanywhere.com](https://www.pythonanywhere.com)
2. Загрузите файлы через панель управления
3. Настройте виртуальное окружение
4. Создайте WSGI конфиг
5. Перезагрузите приложение

### Развертывание на DigitalOcean

1. **Создайте Droplet** с Ubuntu 20.04

2. **Установите зависимости**

```bash
sudo apt-get update
sudo apt-get install python3-pip python3-venv nginx postgresql postgresql-contrib
```

3. **Клонируйте репозиторий**

```bash
git clone your-repo.git
cd university_catalog
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

4. **Настройте PostgreSQL**

```bash
sudo -u postgres psql
CREATE DATABASE university_db;
CREATE USER university_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE university_db TO university_user;
\q
```

5. **Обновите settings.py**

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'university_db',
        'USER': 'university_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

6. **Запустите миграции и сборку статики**

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

7. **Настройте Gunicorn**

```bash
pip install gunicorn
gunicorn --workers 3 --bind unix:/tmp/gunicorn.sock university_project.wsgi
```

8. **Настройте Nginx**

Создайте `/etc/nginx/sites-available/university` с конфигом:

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        alias /path/to/university_catalog/staticfiles/;
    }
    location /media/ {
        alias /path/to/university_catalog/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/tmp/gunicorn.sock;
    }
}
```

9. **Активируйте конфиг**

```bash
sudo ln -s /etc/nginx/sites-available/university /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## Оптимизация для production

### 1. Включите кэширование

В settings.py:

```python
if not DEBUG:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': 'redis://127.0.0.1:6379/1',
        }
    }
```

### 2. Включите CDN для статических файлов

```python
STATIC_URL = 'https://cdn.example.com/static/'
```

### 3. Используйте минифицированный CSS

Добавьте в production settings:

```python
if not DEBUG:
    TEMPLATES[0]['OPTIONS']['loaders'] = [
        ('django.template.loaders.cached.Loader', [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        ]),
    ]
```

### 4. Включите безопасность

```python
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_SECURITY_POLICY = {
        "default-src": ("'self'",),
    }
```

## Мониторинг логов

### Локально

```bash
# Смотреть логи Django
tail -f logs/django.log

# Смотреть логи Nginx (если используете)
sudo tail -f /var/log/nginx/error.log
```

### На Heroku

```bash
heroku logs --tail
```

## Backup и восстановление

### Backup БД

```bash
# SQLite
cp db.sqlite3 db.sqlite3.backup

# PostgreSQL
pg_dump -U university_user university_db > backup.sql
```

### Восстановление

```bash
# SQLite
cp db.sqlite3.backup db.sqlite3

# PostgreSQL
psql -U university_user university_db < backup.sql
```

## Решение проблем

### Статические файлы не загружаются

```bash
python manage.py collectstatic --clear --noinput
```

### Логотипы не отображаются на production

Убедитесь, что:

1. `MEDIA_ROOT` указывает на правильную директорию
2. Директория имеет правильные права доступа
3. Используется S3 или другой CDN для медиа-файлов

### Медленное отображение страниц

1. Включите кэширование
2. Используйте CDN
3. Оптимизируйте изображения
4. Добавьте индексы в БД

```python
# В models.py добавьте db_index=True к часто используемым полям
class University(models.Model):
    name = models.CharField(..., db_index=True)
    city = models.CharField(..., db_index=True)
```

---

**Успешного развертывания! 🚀**
