from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'first_name', 'last_name', 'is_staff']

admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile)
