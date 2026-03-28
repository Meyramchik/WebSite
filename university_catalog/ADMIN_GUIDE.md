# 👨‍💼 ADMIN PANEL USAGE GUIDE

## Доступ к админ-панели

**URL**: http://127.0.0.1:8000/admin/

**Логин**: Ваше имя пользователя (созданное при `createsuperuser`)
**Пароль**: Ваш пароль

## Главное меню админки

При входе вы увидите две основные секции:

### 1. Authentication and Authorization

- **Groups** - Группы пользователей с правами
- **Users** - Управление пользователями

### 2. Universities (наше приложение)

- **Universities** - Управление университетами (CRUD)

## Управление университетами

### 📝 Создание нового университета

1. В администрации нажмите **"Universities"** → **"Add University"**

2. Заполните все обязательные поля:

```
Название *               → "МГУ имени М.В. Ломоносова"
Описание *               → "Один из крупнейших университетов России..."
Город *                  → "Москва"
Логотип                  → [Выбрать файл]
Проходной балл *         → 300
Официальный сайт         → "https://www.msu.ru/"
```

3. Нажмите кнопку **"Save"** или **"Save and add another"**

### 🔍 Просмотр и редактирование

1. Нажмите на "Universities" → увидите список всех вузов

2. В списке отображаются:
   - ✓ Название университета
   - ✓ Город
   - ✓ Проходной балл
   - ✓ Дата создания

3. Нажмите на название, чтобы отредактировать

4. Вносите изменения и сохраняйте

### 🗑️ Удаление

1. Выберите один или несколько университетов (чекбоксы слева)

2. В выпадающем меню "Action" выберите **"Delete selected Universities"**

3. Подтвердите удаление на странице подтверждения

**⚠️ Внимание**: Удаление необратимо!

## Поиск и фильтрация в админке

### 🔎 Поиск

В поле "Search" вверху списка введите:

- Название университета
- Город
- Слово из описания

Нажмите Enter или кнопку поиска

### 🏷️ Фильтры

Справа от списка вы увидите фильтры:

**By city:**

- Москва
- Санкт-Петербург
- Томск
- И другие

**By passing score:**

- Автоматические диапазоны

**By created at:**

- Any time
- Today
- This week
- This month

Нажмите на фильтр чтобы применить

## Загрузка логотипов

### Требования к файлам

- **Форматы**: JPG, PNG, GIF, WebP
- **Максимальный размер**: 5 MB (по умолчанию)
- **Рекомендуемое разрешение**: 200x200px или выше

### Процесс загрузки

1. При создании или редактировании университета найдите поле **"Логотип"**

2. Нажмите кнопку **"Choose File"**

3. Выберите изображение на вашем компьютере

4. Файл будет загружен в папку `media/logos/YYYY/MM/`

### Удаление логотипа

1. При редактировании университета с логотипом

2. Напротив файла нажмите **"Clear"**

3. Сохраните изменения

## Экспорт данных

### Экспорт в CSV (встроенно)

К сожалению, встроенной функции нет, но можно использовать:

```bash
# Через Django shell
python manage.py shell

from universities.models import University
import csv

with open('universities.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Название', 'Город', 'Проходной балл', 'Сайт'])

    for uni in University.objects.all():
        writer.writerow([uni.name, uni.city, uni.passing_score, uni.website])

print("Экспортировано в universities.csv")
exit()
```

### Экспорт в JSON

```bash
python manage.py dumpdata universities.University --format=json > universities.json
```

### Импорт из JSON

```bash
python manage.py loaddata universities.json
```

## Кастомизация админ-интерфейса

### Добавление действ (Actions)

Отредактируйте `universities/admin.py`:

```python
@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    # ... существующий код ...

    def make_public(self, request, queryset):
        """Сделать университеты видимыми"""
        updated = queryset.update(is_visible=True)
        self.message_user(request, f'{updated} университетов обновлено.')

    make_public.short_description = "Сделать выбранные видимыми"

    actions = ['make_public']
```

### Кастомные поля для отображения

```python
@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    def university_info(self, obj):
        """Комбинированное поле"""
        return f"{obj.name} ({obj.city}) - {obj.passing_score} баллов"

    university_info.short_description = "Информация"

    list_display = ('university_info', 'created_at')
```

### Форматирование полей

```python
@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    def high_score(self, obj):
        """Показать балл красным если > 300"""
        if obj.passing_score > 300:
            return f'<span style="color: red;">{obj.passing_score}</span>'
        return obj.passing_score

    high_score.allow_tags = True
    high_score.short_description = "Проходной балл"

    list_display = ('name', 'high_score', 'city')
```

## Быстрые действия через админку

### Действие: Копирование университета

```python
@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    actions = ['duplicate_university']

    def duplicate_university(self, request, queryset):
        for university in queryset:
            university.pk = None
            university.name = f"{university.name} (копия)"
            university.save()
        self.message_user(request, "Университеты скопированы")

    duplicate_university.short_description = "Дублировать выбранные"
```

## Советы и трюки

### ⚡ Быстрый поиск

Используйте точные названия:

- "МГУ" напишется быстро
- "М.В. Ломоносова" найдет полное название

### 🎯 Фильтрация по дате

```
This week    → Университеты добавленные на этой неделе
This month   → Добавленные в этом месяце
This year    → Добавленные в этом году
```

### 📊 Сортировка

Нажимите на заголовок колонки чтобы отсортировать:

- ↑↓ По возрастанию/убыванию

### 🔐 Безопасность

- Никогда не делитесь логином/паролем админки
- Используйте сильные пароли
- Регулярно проверяйте логи активности

## Решение проблем

### Не могу загрузить логотип

1. **Ошибка**: "The submitted file is empty"
   - Проверьте размер файла не превышает 5MB
   - Используйте поддерживаемый формат (JPG, PNG)

2. **Ошибка**: "Permission denied"
   - Проверьте права доступа на папку `media/`
   - Убедитесь что папка существует

### Логотип не отображается после загрузки

1. Проверьте что DEBUG = True в settings.py
2. Проверьте URL медиа-файла:
   - Откройте DevTools (F12)
   - Посмотрите на вкладке Network
   - Проверьте статус загрузки изображения

### Не помню пароль админа

Создайте нового супер-пользователя:

```bash
python manage.py createsuperuser
```

Или измените пароль:

```bash
python manage.py changepassword admin_username
```

### Админка работает медленно

1. Количество университетов > 1000?
   - Добавьте пагинацию:

   ```python
   list_per_page = 50
   ```

2. Много фильтров?
   - Оптимизируйте queryset:
   ```python
   def get_queryset(self, request):
       qs = super().get_queryset(request)
       return qs.select_related('city')
   ```

## Полезные SQL команды для admin

### Просмотреть статистику

```bash
python manage.py shell

from universities.models import University
from django.db.models import Count

# Количество вузов по городам
stats = University.objects.values('city').annotate(count=Count('id'))
for stat in stats:
    print(f"{stat['city']}: {stat['count']}")

# Средний проходной балл
avg_score = University.objects.values('city').annotate(avg=Count('passing_score'))
```

### Массовое обновление

```bash
python manage.py shell

from universities.models import University

# Увеличить все баллы на 10
University.objects.all().update(passing_score=F('passing_score') + 10)

# Обновить по условию
University.objects.filter(city='Москва').update(passing_score=310)
```

## Регулярное обслуживание

### ✅ Еженедельно

- Проверьте новые добавленные университеты
- Убедитесь что все логотипы загружены

### ✅ Ежемесячно

- Резервная копия БД: `cp db.sqlite3 db.sqlite3.backup`
- Проверьте размер папки `media/`

### ✅ Ежеквартально

- Очистка неиспользуемых медиа-файлов
- Проверка структуры данных

---

**Успешного управления университетами! 📚**
