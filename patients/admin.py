from django.contrib import admin

from .models import Patient
from .models import Prescription

admin.site.register(Patient)
admin.site.register(Prescription)
