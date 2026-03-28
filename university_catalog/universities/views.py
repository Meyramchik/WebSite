from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import University


def index(request):
    """Главная страница со списком всех университетов"""
    
    universities = University.objects.all()
    search_query = request.GET.get('search', '')
    city_filter = request.GET.get('city', '')
    
    # Фильтрация по поиску
    if search_query:
        universities = universities.filter(
            Q(name__icontains=search_query) |
            Q(description__icontains=search_query)
        )
    
    # Фильтрация по городу
    if city_filter:
        universities = universities.filter(city=city_filter)
    
    # Получение уникальных городов для фильтра
    cities = University.objects.values_list('city', flat=True).distinct().order_by('city')
    
    context = {
        'universities': universities,
        'search_query': search_query,
        'city_filter': city_filter,
        'cities': cities,
    }
    return render(request, 'universities/index.html', context)


def detail(request, pk):
    """Страница с деталями университета"""
    
    university = get_object_or_404(University, pk=pk)
    related_universities = University.objects.filter(
        city=university.city
    ).exclude(pk=pk)[:3]
    
    context = {
        'university': university,
        'related_universities': related_universities,
    }
    return render(request, 'universities/detail.html', context)
