# 📝 CHEAT SHEET - Шпаргалка Django команд

## Django manage.py команды

### Инициализация проекта

```bash
# Создать миграции (после изменения моделей)
python manage.py makemigrations

# Применить миграции к БД
python manage.py migrate

# Применить миграции для конкретного приложения
python manage.py migrate universities

# Показать SQL миграции (без выполнения)
python manage.py sqlmigrate universities 0001

# Откатить до конкретной миграции
python manage.py migrate universities 0001
```

### Работа с пользователями

```bash
# Создать суперпользователя (для админки)
python manage.py createsuperuser

# Создать обычного пользователя
python manage.py createsuperuser --username john --email john@example.com

# Изменить пароль пользователя
python manage.py changepassword admin

# Удалить пользователя
python manage.py shell
# В shell:
User.objects.filter(username='admin').delete()
```

### Запуск сервера

```bash
# Запустить development сервер (по умолчанию :8000)
python manage.py runserver

# Запустить на другом поре
python manage.py runserver 8080

# Запустить на другом IP
python manage.py runserver 0.0.0.0:8000

# Без автоперезагрузки (--nothreading)
python manage.py runserver --nothreading
```

### Работа с БД

```bash
# Очистить все данные и таблицы (⚠️ опасно!)
python manage.py flush

# Показать SQL запросы для создания таблиц
python manage.py sqlall universities

# Проверить целостность БД
python manage.py check

# Экспорт данных в JSON
python manage.py dumpdata universities > universities.json

# Импорт данных из JSON
python manage.py loaddata universities.json

# Сделать резервную копию
python manage.py dumpdata > backup.json
```

### Статические файлы

```bash
# Собрать все статические файлы для production
python manage.py collectstatic

# Собрать без подтверждения
python manage.py collectstatic --noinput

# Очистить и пересобрать
python manage.py collectstatic --clear --noinput

# Показать где находятся статические файлы
python manage.py findstatic css/style.css
```

### Django Shell

```bash
# Запустить интерпретатор Python с контекстом Django
python manage.py shell

# Запустить Python скрипт
python manage.py shell -c "from universities.models import University; print(University.objects.count())"

# Запустить в IPython (если установлен)
pip install ipython
python manage.py shell -i ipython
```

### Создание и тестирование

```bash
# Запустить тесты
python manage.py test

# Запустить тесты конкретного приложения
python manage.py test universities

# Запустить с verbose выводом
python manage.py test --verbosity=2

# Запустить конкретный тест
python manage.py test universities.tests.UniversityModelTest

# Увидеть SQL запросы при тестировании
python manage.py test --debug-sql
```

### Утилиты

```bash
# Проверить конфигурацию проекта
python manage.py check

# Показать все установленные приложения
python manage.py showmigrations

# Создать заготовку для новых тестов
python manage.py test --help

# Посмотреть URL маршруты
python manage.py show_urls 2>/dev/null || python manage.py url_resolver

# Профилирование производительности
python manage.py shell
# В shell:
from django.db import connection
from django.test.utils import CaptureQueriesContext
with CaptureQueriesContext(connection) as queries:
    # ваш код
    pass
print(len(queries), "запросов выполнено")
```

---

## Shell команды для работы с моделями

### Базовые операции

```python
python manage.py shell

# Импорт модели
from universities.models import University

# Создать (C)reate
uni = University.objects.create(
    name="МГУ",
    description="Описание",
    city="Москва",
    passing_score=300,
    website="https://msu.ru"
)

# Прочитать (R)ead
uni = University.objects.get(id=1)
uni = University.objects.filter(city="Москва")
uni = University.objects.all()

# Обновить (U)pdate
uni.passing_score = 310
uni.save()

# Или массовое обновление
University.objects.filter(city="Москва").update(passing_score=310)

# Удалить (D)elete
uni.delete()
University.objects.filter(city="Москва").delete()
University.objects.all().delete()  # ⚠️ опасно

exit()
```

### Фильтрация и поиск

```python
# Точное совпадение
University.objects.filter(city="Москва")

# Содержит (case-insensitive)
University.objects.filter(name__icontains="МГУ")

# Начинается с
University.objects.filter(name__istartswith="М")

# Заканчивается на
University.objects.filter(name__iendswith="У")

# Не равно
University.objects.exclude(city="Москва")

# Или (Q)
from django.db.models import Q
University.objects.filter(Q(city="Москва") | Q(city="СПб"))

# И (Q)
University.objects.filter(Q(city="Москва") & Q(passing_score__gte=300))

# Компиляция вложенных Q
from django.db.models import Q
query = Q(city="Москва") & (Q(passing_score__gte=300) | Q(name__contains="МГУ"))
University.objects.filter(query)
```

### Агрегация

```python
from django.db.models import Count, Avg, Max, Min, Sum

# Количество
University.objects.count()
University.objects.filter(city="Москва").count()

# Среднее значение
University.objects.aggregate(avg_score=Avg('passing_score'))

# Минимум/Максимум
University.objects.aggregate(min_score=Min('passing_score'), max_score=Max('passing_score'))

# Сумма
University.objects.aggregate(total=Sum('passing_score'))

# Группировка
University.objects.values('city').annotate(count=Count('id'))
# Output: <QuerySet [{'city': 'Москва', 'count': 5}, ...]>

# Количество по городам
by_city = University.objects.values('city').annotate(count=Count('id')).order_by('-count')
for item in by_city:
    print(f"{item['city']}: {item['count']}")
```

### Сортировка

```python
# По названию (A - Z)
University.objects.all().order_by('name')

# По названию (Z - A)
University.objects.all().order_by('-name')

# По нескольким полям
University.objects.all().order_by('city', '-passing_score')

# Случайный порядок
import random
from django.db.models import F
University.objects.all().order_by('?')[:5]  # 5 случайных
```

### Срезы и лимиты

```python
# Первые 10
University.objects.all()[:10]

# С 5 по 15
University.objects.all()[5:15]

# Первый
University.objects.first()

# Последний
University.objects.last()

# Одно значение или None
University.objects.filter(name="МГУ").first()

# Существует ли
University.objects.filter(city="Москва").exists()

# Количество
University.objects.filter(city="Москва").count()
```

### Отношения и связи

```python
# Если добавить ForeignKey
class Faculty(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

# Forward relation - найти факультеты университета
uni = University.objects.get(id=1)
uni.faculty_set.all()

# Backward relation - найти университет факультета
fac = Faculty.objects.first()
fac.university

# Фильтрация через relation
University.objects.filter(faculty__name="Физический")

# Exclude через relation
University.objects.exclude(faculty__name__isnull=True)

# Select related (optimize for ForeignKey)
Faculty.objects.select_related('university')

# Prefetch related (optimize for reverse relation)
University.objects.prefetch_related('faculty_set')
```

### Сохранение и удаление

```python
# Создать и сохранить
uni = University(name="МГУ", city="Москва", passing_score=300)
uni.save()

# Или просто создать
University.objects.create(name="МГУ", city="Москва", passing_score=300)

# Обновить и сохранить
uni = University.objects.get(name="МГУ")
uni.passing_score = 310
uni.save()

# Обновить конкретные поля
uni = University.objects.get(name="МГУ")
uni.save(update_fields=['passing_score'])

# Массовое обновление (быстрее)
University.objects.filter(city="Москва").update(passing_score=310)

# Удалить один
uni = University.objects.get(name="МГУ")
uni.delete()

# Удалить несколько
University.objects.filter(city="Москва").delete()

# Удалить все (⚠️ опасно!)
University.objects.all().delete()
```

---

## Git команды

```bash
# Инициализация репозитория
git init
git add .
git commit -m "Initial commit"

# Clone
git clone repository_url

# Status
git status

# Add и Commit
git add -A
git commit -m "Описание изменений"

# Push (после первого)
git push -u origin main

# Последующие push
git push

# Pull
git pull

# Просмотр истории
git log
git log --oneline
git log --graph --oneline --all

# Откатить изменения
git checkout -- файл
git reset --hard  # ⚠️ опасно!
```

---

## Pip команды

```bash
# Установить пакет
pip install package_name

# Установить версию
pip install package_name==1.0.0

# Обновить пакет
pip install --upgrade package_name

# Удалить пакет
pip uninstall package_name

# Список установленных
pip list

# Requirements
pip freeze > requirements.txt
pip install -r requirements.txt

# Узнать версию пакета
pip show package_name
```

---

## Окружение (venv)

```bash
# Создать виртуальное окружение
python -m venv venv

# Активировать (Windows)
venv\Scripts\activate

# Активировать (Mac/Linux)
source venv/bin/activate

# Деактивировать
deactivate

# Проверить что активировано
which python  # Mac/Linux
where python  # Windows

# Удалить окружение
rmdir /s venv  # Windows
rm -rf venv    # Mac/Linux
```

---

## Полезные регулярные выражения для поиска

```bash
# Найти все TODO комментарии
grep -r "TODO" .

# Найти все импорты Django
grep -r "from django" .

# Найти все models
grep -r "class.*models.Model" .

# Найти все views функции
grep -r "def.*request" .

# Найти все URL patterns
grep -r "path.*views" .
```

---

## Быстрые советы

### 💡 Профилирование запросов

```python
from django.db import connection
from django.test.utils import CaptureQueriesContext

with CaptureQueriesContext(connection) as queries:
    list(University.objects.all())

print(f"Выполнено запросов: {len(queries)}")
for query in queries:
    print(query['sql'])
```

### 💡 Оптимизация QuerySet

```python
# ❌ Медленно - N+1 проблема
for uni in University.objects.all():
    print(uni.city)  # Отдельный запрос для каждого

# ✅ Быстро
universities = University.objects.values_list('city', flat=True).distinct()
```

### 💡 Генерировать тестовые данные

```bash
pip install faker
python manage.py shell

from faker import Faker
from universities.models import University

fake = Faker('ru_RU')

for _ in range(100):
    University.objects.create(
        name=fake.company(),
        description=fake.text(),
        city=fake.city(),
        passing_score=fake.random_int(min=200, max=350),
        website=fake.url()
    )
```

---

**Успехов в разработке! 🚀**
