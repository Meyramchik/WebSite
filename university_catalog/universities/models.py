from django.db import models


class University(models.Model):
    """Модель университета для каталога"""
    
    name = models.CharField(
        max_length=200,
        unique=True,
        verbose_name='Название'
    )
    description = models.TextField(
        verbose_name='Описание',
        help_text='Полное описание университета'
    )
    city = models.CharField(
        max_length=100,
        verbose_name='Город',
        db_index=True
    )
    logo = models.ImageField(
        upload_to='logos/%Y/%m/',
        verbose_name='Логотип',
        blank=True,
        null=True
    )
    passing_score = models.IntegerField(
        verbose_name='Проходной балл',
        help_text='Минимальный балл для поступления'
    )
    website = models.URLField(
        verbose_name='Официальный сайт',
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )

    class Meta:
        verbose_name = 'Университет'
        verbose_name_plural = 'Университеты'
        ordering = ['name']

    def __str__(self):
        return self.name
