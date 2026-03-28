# 🚀 QUICK START - Быстрый старт проекта

## Шаг 1: Установка зависимостей

```bash
# Переходим в директорию проекта
cd university_catalog

# Создаем и активируем виртуальное окружение
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Устанавливаем зависимости
pip install -r requirements.txt
```

## Шаг 2: Инициализация БД

```bash
# Создаем и применяем миграции
python manage.py migrate
```

## Шаг 3: Создаем супер-пользователя

```bash
python manage.py createsuperuser
```

## Шаг 4: Добавляем тестовые данные

```bash
python manage.py shell
# В интерпретаторе выполняем:
exec(open('universities/data_loader.py').read())
# Выходим:
exit()
```

## Шаг 5: Запускаем сервер

```bash
python manage.py runserver
```

## Шаг 6: Открываем в браузере

- **Главная**: http://127.0.0.1:8000/
- **Админка**: http://127.0.0.1:8000/admin/

---

**Готово! Приложение работает! 🎉**

## Следующие шаги

1. Загрузите логотипы университетов через админку
2. Отредактируйте описания университетов
3. Добавьте новые университеты
4. Персонализируйте цвета и стили

## 📝 Примечания

- Данные хранятся в `db.sqlite3`
- Логотипы сохраняются в `media/logos/`
- Для production используйте PostgreSQL вместо SQLite
- Измените `SECRET_KEY` перед деплойментом
