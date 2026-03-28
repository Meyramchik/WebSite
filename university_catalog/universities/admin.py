from django.contrib import admin
from .models import University


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'passing_score', 'created_at')
    list_filter = ('city', 'passing_score', 'created_at')
    search_fields = ('name', 'city', 'description')
    fields = ('name', 'description', 'city', 'logo', 'passing_score', 'website')
    readonly_fields = ('created_at', 'updated_at')
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object
            return self.readonly_fields + ('created_at', 'updated_at')
        return self.readonly_fields
