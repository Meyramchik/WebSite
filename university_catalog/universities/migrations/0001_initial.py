# Generated migration file
# This file will be auto-generated when you run:
# python manage.py makemigrations

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True, verbose_name='Название')),
                ('description', models.TextField(help_text='Полное описание университета', verbose_name='Описание')),
                ('city', models.CharField(db_index=True, max_length=100, verbose_name='Город')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='logos/%Y/%m/', verbose_name='Логотип')),
                ('passing_score', models.IntegerField(help_text='Минимальный балл для поступления', verbose_name='Проходной балл')),
                ('website', models.URLField(blank=True, verbose_name='Официальный сайт')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
            ],
            options={
                'verbose_name': 'Университет',
                'verbose_name_plural': 'Университеты',
                'ordering': ['name'],
            },
        ),
    ]
