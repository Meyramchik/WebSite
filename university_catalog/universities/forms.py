from django import forms
from .models import University


class UniversityFilterForm(forms.Form):
    """Форма для поиска и фильтрации университетов"""
    
    search = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Поиск по названию...',
            'class': 'w-full'
        })
    )
    city = forms.ModelChoiceField(
        queryset=University.objects.values_list('city', flat=True).distinct(),
        required=False,
        empty_label='Все города',
        widget=forms.Select(attrs={
            'class': 'w-full'
        })
    )
